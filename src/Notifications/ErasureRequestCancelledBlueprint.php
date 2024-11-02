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

namespace Flarum\Gdpr\Notifications;

use Flarum\Database\AbstractModel;
use Flarum\Notification\AlertableInterface;
use Flarum\Gdpr\Models\ErasureRequest;
use Carbon\Carbon;
use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\Notification\MailableInterface;
use Flarum\User\User;
use Flarum\Locale\TranslatorInterface;

class ErasureRequestCancelledBlueprint implements BlueprintInterface, MailableInterface, AlertableInterface
{
    public function __construct(private ErasureRequest $request)
    {
    }

    public function getFromUser(): ?User
    {
        return $this->request->user;
    }

    public function getSubject(): ?AbstractModel
    {
        return $this->request;
    }

    public function getData(): mixed
    {
        return [
            'erasure-request' => $this->request->id,
            'timestamp'       => Carbon::now(),
        ];
    }

    public static function getType(): string
    {
        return 'gdpr_erasure_cancelled';
    }

    public static function getSubjectModel(): string
    {
        return ErasureRequest::class;
    }

    public function getEmailViews(): array
    {
        return ['text' => 'flarum-gdpr::email.plain.erasure-cancelled', 'html' => 'flarum-gdpr::email.html.erasure-cancelled'];
    }

    public function getEmailSubject(TranslatorInterface $translator): string
    {
        return $translator->trans('flarum-gdpr.email.erasure_cancelled.subject');
    }
}
