<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Jobs\IngestionJob;
use App\Models\Document;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use ImageKit\ImageKit;

class DocumentController extends Controller
{
    public function upload(Request $request)
    {
        // Validate Request
        $validator = Validator::make($request->all(), [
            'document' => 'required|file|mimes:pdf|max:10240',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
            ], 422);
        }

        try {

            // Uploaded file
            $file = $request->file('document');

            // ImageKit instance
            $imageKit = new ImageKit(
                config('services.imagekit.public_key'),
                config('services.imagekit.private_key'),
                config('services.imagekit.url_endpoint')
            );

            // Upload PDF to ImageKit
            $upload = $imageKit->upload([
                'file' => fopen($file->getRealPath(), 'r'),
                'fileName' => $file->getClientOriginalName(),
            ]);
            // Save document metadata
            $document = new Document;

            $document->user_id = Auth::id();
            $document->original_name = $file->getClientOriginalName();
            $document->file_name = $upload->result->name;
            $document->file_path = $upload->result->url;
            $document->imagekit_file_id = $upload->result->fileId;
            $document->mime_type = $file->getMimeType();
            $document->file_size = $file->getSize();
            $document->status = 'processing';
            $document->save();

            //start document ingestion job
            IngestionJob::dispatch($document);

            return response()->json([
                'status' => 201,
                'message' => 'Document uploaded successfully.',
                'data' => $document,
            ], 201);

        } catch (\Exception $e) {

            return response()->json([
                'status' => 500,
                'message' => 'Upload failed.',
                'error' => $e->getMessage(),
            ], 500);

        }

    }

    public function index()
    {
        $documents = Document::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $documents,
        ], 200);
    }

    public function show($id)
    {
        $document = Document::where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (! $document) {
            return response()->json([
                'status' => 404,
                'message' => 'Document not found.',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $document,
        ], 200);
    }

    public function destroy($id)
    {
        $document = Document::where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (! $document) {
            return response()->json([
                'status' => 404,
                'message' => 'Document not found.',
            ], 404);
        }

        // -----------------------------
        // Delete from ImageKit
        // -----------------------------
        try {

            $imageKit = new ImageKit(
                config('services.imagekit.public_key'),
                config('services.imagekit.private_key'),
                config('services.imagekit.url_endpoint')
            );

            $imageKit->deleteFile($document->imagekit_file_id);

        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete document from ImageKit.',
            ], 500);

        }

        // -----------------------------
        // Delete from Chroma (FastAPI)
        // -----------------------------
        try {

            $res = Http::withBody(
                json_encode([
                    'document_id' => $document->id,
                ]),
                'application/json'
            )->delete('http://127.0.0.1:8001/delete-document/');

            if (! $res->successful()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to delete document embeddings.',
                ], 500);
            }

        } catch (ConnectionException $e) {

            return response()->json([
                'success' => false,
                'message' => 'AI service is currently unavailable.',
            ], 503);

        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Failed to communicate with AI service.',
            ], 500);

        }

        // -----------------------------
        // Delete MySQL record
        // -----------------------------
        $document->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Document deleted successfully.',
        ], 200);
    }
}
