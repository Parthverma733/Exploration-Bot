<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class ChatController extends Controller
{
    // create session for current logged in user

    public function createSession(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
            ], 422); // Unprocessable content (client side error) request recived but invalid data
        }

        $session = new ChatSession;
        $session->user_id = Auth::id();  // auth automatic extract user id from bearer token
        $session->title = $request->title;
        $session->save();

        return response()->json([
            'status' => 201,
            'message' => 'session created',
            'data' => $session,
        ], 201); // request was successfully fulfilled and resulted in the creation of a new resource.
    }

    // fetch session for current logged in user
    public function getSessions(Request $request)
    {
        $sessions = ChatSession::where('user_id', Auth::id())
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $sessions,
        ], 200);
    }

    public function getMessages(Request $request, $id)
    {
        // verify chat session exist and belongs to logged in user
        $session = ChatSession::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (! $session) {
            return response()->json([
                'success' => false,
                'message' => 'Chat session not found.',
            ], 404);
        }
        // return all message of the session
        $messages = $session->messages()
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'session' => $session,
            'messages' => $messages,
        ], 200);
    }

    public function sendMessage(Request $request, $id)
    {

        // validate request
        $validator = Validator::make($request->all(), [
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // verify chat session exist and belongs to logged in user
        $session = ChatSession::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (! $session) {
            return response()->json([
                'success' => false,
                'message' => 'Chat session not found.',
            ], 404);
        }

        // fetch ai response
        try {

            $res = Http::timeout(30)
                ->asForm()
                ->post('http://127.0.0.1:8001/ask/', [
                    'question' => $request->message,
                ]);

            if (! $res->successful()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Python server returned an error.',
                ], 500);
            }

            $aiResponse = $res->json('response');

        } catch (ConnectionException $e) {

            return response()->json([
                'success' => false,
                'message' => 'AI service is currently unavailable. Please try again later.',
            ], 503);

        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong while communicating with the AI service.',
            ], 500);
        }

        // $res = Http::post('http://127.0.0.1:8001/ask/', [
        //     'question' => 'what is rag',
        // ]);
        // dd($res->json());

        // save user message to db
        $msg = new ChatMessage;
        $msg->chat_session_id = $session->id;
        $msg->sender = 'user';
        $msg->message = $request->message;
        $msg->save();

        // save ai message to db
        $aiMsg = new ChatMessage;
        $aiMsg->chat_session_id = $session->id;
        $aiMsg->sender = 'assistant';
        $aiMsg->message = $aiResponse;
        $aiMsg->save();

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully.',
            'response' => $aiResponse,
        ]);

    }
}
