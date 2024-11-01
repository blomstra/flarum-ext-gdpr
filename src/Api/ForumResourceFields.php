<?php

/*
 * This file is part of Flarum
 *
 * Copyright (c) 2021 Blomstra Ltd
 * Copyright (c) 2024 Flarum Foundation
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Flarum\Gdpr\Api;

use Flarum\Api\Context;
use Flarum\Api\Schema;
use Flarum\Gdpr\Models\ErasureRequest;

class ForumResourceFields
{
    public function __invoke(): array
    {
        return [
            Schema\Boolean::make('canProcessErasureRequests')
                ->get(fn (object $model, Context $context) => $context->getActor()->can('processErasure')),
            Schema\Number::make('erasureRequestCount')
                ->visible(fn (object $model, Context $context) => $context->getActor()->can('processErasure'))
                ->get(fn () => ErasureRequest::query()->where('status', ErasureRequest::STATUS_USER_CONFIRMED)->count()),
        ];
    }
}
