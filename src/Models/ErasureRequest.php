<?php

/*
 * This file is part of blomstra/flarum-gdpr
 *
 * Copyright (c) 2021 Blomstra Ltd
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Blomstra\Gdpr\Models;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\User\User;
use Illuminate\Support\Carbon;

/**
 * @property int         $id
 * @property int         $user_id
 * @property User        $user
 * @property string      $verification_token
 * @property string      $status
 * @property string|null $reason
 * @property Carbon      $created_at
 * @property Carbon|null $user_confirmed_at
 * @property int|null    $processed_by
 * @property User|null   $processedBy
 * @property string|null $processor_comment
 * @property Carbon|null $processed_at
 * @property string|null $processed_mode
 */
class ErasureRequest extends AbstractModel
{
    use ScopeVisibilityTrait;

    protected $table = 'gdpr_erasure';

    protected $casts = [
        'created_at' => 'datetime',
        'user_confirmed_at' => 'datetime',
        'processed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function processedBy()
    {
        return $this->belongsTo(User::class, 'processed_by');
    }
}
