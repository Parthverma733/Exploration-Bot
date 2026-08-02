<?php

namespace App\Jobs;

use App\Models\Document;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class IngestionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable,SerializesModels;

    /**
     * Create a new job instance.
     */
    public Document $document;

    public int $tries = 3;

    public int $timeout = 1800; // 30 minutes

    public function __construct(Document $document)
    {
        //
        $this->document = $document;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //
        Log::info('IngestionJob started', [
            'document_id' => $this->document->id,
        ]);

        try {

            $res = Http::timeout(1800)
            ->post('http://127.0.0.1:8001/ingest/', [
                'file_url' => $this->document->file_path,
                'user_id' => $this->document->user_id,
                'document_id' => $this->document->id,
            ]);

            if (! $res->successful()) {
                $res->throw();
            } else {

                $this->document->status = 'completed';
                $this->document->save();

            }

        } catch (\Exception $e) {
            Log::error('Document ingestion failed', [
                'document_id' => $this->document->id,
                'error' => $e->getMessage(),
            ]);

            $this->document->status = 'failed';
            $this->document->save();

            throw $e;
        }
    }
}
