<?php

/*
 * This file is part of blomstra/flarum-gdpr
 *
 * Copyright (c) 2021 Blomstra Ltd
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Blomstra\Gdpr\Console;

use Blomstra\Gdpr\Jobs\ErasureJob;
use Blomstra\Gdpr\Jobs\GdprJob;
use Blomstra\Gdpr\Models\ErasureRequest;
use Carbon\Carbon;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Console\Command;
use Illuminate\Contracts\Queue\Queue;

class ProcessEraseRequests extends Command
{
    const days = 30;
    protected $signature = 'gdpr:process-erase-requests';
    protected $description = 'Process open erase requests with community default erase mode.';

    public function handle(Queue $queue, SettingsRepositoryInterface $settings): void
    {
        ErasureRequest::query()
            ->whereNotNull('user_confirmed_at')
            ->whereNull('processed_at')
            ->where('user_confirmed_at', '<=', Carbon::now()->subDays(static::days))
            ->each(function (ErasureRequest $request) use ($queue, $settings) {
                $request->status = 'processed';
                $request->processed_at = Carbon::now();
                $request->processed_mode = $request->processed_mode ?? $settings->get('blomstra-gdpr.default-erasure');
                $request->processor_comment = 'Automatically processed after '.static::days.' through scheduled task.';
                $request->save();

                $queue->push(
                    job: new ErasureJob($request),
                    queue: GdprJob::$onQueue
                );
            });
    }
}
