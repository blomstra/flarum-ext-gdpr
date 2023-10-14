<?php

/*
 * This file is part of blomstra/flarum-gdpr
 *
 * Copyright (c) 2021 Blomstra Ltd
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Blomstra\Gdpr\Jobs;

use Blomstra\Gdpr\DataProcessor;
use Blomstra\Gdpr\Events\Erased;
use Blomstra\Gdpr\Events\Erasing;
use Blomstra\Gdpr\Models\ErasureRequest;
use Blomstra\Gdpr\Notifications\ErasureCompletedBlueprint;
use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Filesystem\Factory;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Database\Schema\Builder;
use Illuminate\Mail\Message;
use RuntimeException;
use Symfony\Contracts\Translation\TranslatorInterface;

class ErasureJob extends GdprJob
{
    protected Builder $schema;
    protected TranslatorInterface $translator;
    protected Factory $filesystemFactory;
    protected SettingsRepositoryInterface $settings;
    protected UrlGenerator $url;

    public function __construct(private ErasureRequest $erasureRequest)
    {
    }

    public function handle(
        ConnectionInterface $connection,
        DataProcessor $processor,
        Dispatcher $events,
        Mailer $mailer,
        TranslatorInterface $translator,
        Factory $filesystemFactory,
        SettingsRepositoryInterface $settings,
        UrlGenerator $url,
    ): void {
        $this->translator = $translator;
        $this->filesystemFactory = $filesystemFactory;
        $this->settings = $settings;
        $this->url = $url;

        $this->schema = $connection->getSchemaBuilder();

        /** @var User */
        $user = User::find($this->erasureRequest->user_id);

        if (!$user) {
            return;
        }

        // Store these props here, as they'll be erased/anonymized in a moment
        $username = $user->getDisplayNameAttribute();
        $email = $user->email;

        $mode = $this->erasureRequest->processed_mode;

        if (!$mode) {
            throw new RuntimeException('Erasure request has no mode set.');
        }

        $events->dispatch(new Erasing(
            $this->erasureRequest
        ));

        $this->{$mode}($user, $processor);

        $this->sendUserConfirmation($username, $email, $mailer, $translator);

        $events->dispatch(new Erased(
            $username,
            $email,
            $mode
        ));
    }

    private function deletion(User $user, DataProcessor $processor): void
    {
        foreach ($processor->types() as $type) {
            (new $type($user, $this->filesystemFactory, $this->settings, $this->url, $this->translator))->delete();
        }
    }

    private function anonymization(User $user, DataProcessor $processor): void
    {
        foreach ($processor->types() as $type) {
            (new $type($user, $this->filesystemFactory, $this->settings, $this->url, $this->translator))->anonymize();
        }
    }

    private function sendUserConfirmation(string $username, string $email, Mailer $mailer, TranslatorInterface $translator): void
    {
        $blueprint = new ErasureCompletedBlueprint($this->erasureRequest, $username);

        $mailer->send(
            $blueprint->getEmailView(),
            $blueprint->getData(),
            function (Message $message) use ($username, $email, $blueprint, $translator) {
                $message->to($email, $username)
                    ->subject($blueprint->getEmailSubject($translator));
            }
        );
    }
}
