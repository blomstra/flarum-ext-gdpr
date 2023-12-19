<?php

/*
 * This file is part of blomstra/flarum-gdpr
 *
 * Copyright (c) 2021 Blomstra Ltd
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Blomstra\Gdpr\tests\integration\api;

use Blomstra\Gdpr\Models\ErasureRequest;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;

class DeleteUserTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->prepareDatabase([
            'users' => [
                $this->normalUser(),
            ],
        ]);

        $this->extension('blomstra-gdpr');
    }

    /**
     * @test
     */
    public function delete_user_endpoint_is_processed_by_this_extension()
    {
        $response = $this->send(
            $this->request(
                'DELETE',
                '/api/users/2',
                [
                    'authenticatedAs' => 1,
                ]
            )
        );

        $this->assertEquals(204, $response->getStatusCode());

        $user = User::query()->where('id', 2)->with('erasureRequest')->first();
        $this->assertNotNull($user);
        $this->assertEquals("Anonymous{$user->erasureRequest->id}", $user->username);
        $this->assertEquals(ErasureRequest::STATUS_MANUAL, $user->erasureRequest->status);
    }

    /**
     * @test
     */
    public function delete_user_endpoint_can_be_called_with_anonymization_mode()
    {
        $response = $this->send(
            $this->request(
                'DELETE',
                '/api/users/2/gdpr/'.ErasureRequest::MODE_ANONYMIZATION,
                [
                    'authenticatedAs' => 1,
                ]
            )
        );

        $this->assertEquals(204, $response->getStatusCode());

        $user = User::query()->where('id', 2)->with('erasureRequest')->first();
        $this->assertNotNull($user);
        $this->assertEquals("Anonymous{$user->erasureRequest->id}", $user->username);
        $this->assertEquals(ErasureRequest::STATUS_MANUAL, $user->erasureRequest->status);
    }

    /**
     * @test
     */
    public function delete_user_endpoint_with_deletion_mode_not_enabled_by_default()
    {
        $response = $this->send(
            $this->request(
                'DELETE',
                '/api/users/2/gdpr/'.ErasureRequest::MODE_DELETION,
                [
                    'authenticatedAs' => 1,
                ]
            )
        );

        $this->assertEquals(422, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals('validation_error', $data['errors'][0]['code']);
        $this->assertEquals('/data/attributes/mode', $data['errors'][0]['source']['pointer']);
    }

    /**
     * @test
     */
    public function delete_user_endpoint_can_be_called_with_deletion_mode_enabled()
    {
        $this->setting('blomstra-gdpr.allow-deletion', true);

        $response = $this->send(
            $this->request(
                'DELETE',
                '/api/users/2/gdpr/'.ErasureRequest::MODE_DELETION,
                [
                    'authenticatedAs' => 1,
                ]
            )
        );

        $this->assertEquals(204, $response->getStatusCode());

        $user = User::query()->where('id', 2)->first();
        $this->assertNull($user);
    }

    /**
     * @test
     */
    public function invalid_erasure_mode_throws_validation_error()
    {
        $response = $this->send(
            $this->request(
                'DELETE',
                '/api/users/2/gdpr/invalid-mode',
                [
                    'authenticatedAs' => 1,
                ]
            )
        );

        $this->assertEquals(422, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals('validation_error', $data['errors'][0]['code']);
        $this->assertEquals('/data/attributes/mode', $data['errors'][0]['source']['pointer']);
        $this->assertStringContainsString('invalid-mode', $data['errors'][0]['detail']);
    }
}
