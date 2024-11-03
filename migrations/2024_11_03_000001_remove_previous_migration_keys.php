<?php

/*
 * This file is part of blomstra/flarum-gdpr
 *
 * Copyright (c) 2021 Blomstra Ltd
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $db = $schema->getConnection();

        $db->table('migrations')
            ->where('extension', 'blomstra-gdpr')
            ->delete();
    },
    'down' => function (Builder $schema) {
        // This migration is not reversible
    },
];
