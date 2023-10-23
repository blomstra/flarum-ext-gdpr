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

use Blomstra\Gdpr\Models\Export;
use Flarum\Database\Eloquent\Collection;
use Flarum\Foundation\Paths;
use Flarum\Notification\Notification;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use Illuminate\Contracts\Filesystem\Factory;
use Illuminate\Contracts\Filesystem\Filesystem;
use PhpZip\ZipFile;
use Psr\Http\Message\ResponseInterface;

class ExportTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();
        $this->extension('blomstra-gdpr');

        $this->setting('mail_driver', 'log');
        $this->setting('forum_title', 'Flarum Test');

        $this->prepareDatabase([
            'users' => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'moderator', 'password' => '$2y$10$LO59tiT7uggl6Oe23o/O6.utnF6ipngYjvMvaxo1TciKqBttDNKim', 'email' => 'moderator@machine.local', 'is_email_confirmed' => 1],
            ],
            'group_user' => [
                ['user_id' => 3, 'group_id' => 4],
            ],
            'group_permission' => [
                ['permission' => 'moderateExport', 'group_id' => 4],
            ],
            'gdpr_exports'  => [],
            'notifications' => [],
        ]);
    }

    public function tearDown(): void
    {
        parent::tearDown();

        $this->getStorageFilesystem()->delete($this->getStorageFilesystem()->allFiles());
    }

    protected function makeExportRequest(int $actorId = 2, int $userId = 2): ResponseInterface
    {
        return $this->send(
            $this->request(
                'POST',
                '/api/gdpr/export',
                [
                    'authenticatedAs' => $actorId,
                    'json'            => [
                        'data' => [
                            'attributes' => [
                                'userId' => $userId,
                            ],
                        ],
                    ],
                ]
            )->withAttribute('bypassCsrfToken', true)
        );
    }

    protected function getNotificationsForExport(Export $export): Collection
    {
        return Notification::query()
            ->where('type', 'gdprExportAvailable')
            ->where('subject_id', $export->id)
            ->get();
    }

    protected function getExportRecordFor(int $userId): ?Export
    {
        return Export::query()
            ->where('user_id', $userId)
            ->first();
    }

    protected function getStorageFilesystem(): Filesystem
    {
        return $this->app()->getContainer()->make(Factory::class)->disk('gdpr-export');
    }

    /**
     * @test
     */
    public function guests_cannot_request_export_data()
    {
        $response = $this->send(
            $this->request(
                'POST',
                '/api/gdpr/export',
                [
                    'json' => [
                        'data' => [],
                    ],
                ]
            )->withAttribute('bypassCsrfToken', true)
        );

        $this->assertEquals(401, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function users_can_request_export_own_data()
    {
        $response = $this->makeExportRequest();

        $this->assertEquals(201, $response->getStatusCode());

        $export = $this->getExportRecordFor(2);

        $this->assertEquals(2, $export->user_id);
        $this->assertEquals(2, $export->actor_id);
    }

    /**
     * @test
     */
    public function users_cannot_request_export_other_users_data()
    {
        $response = $this->makeExportRequest(2, 3);

        $this->assertEquals(403, $response->getStatusCode());

        $export = $this->getExportRecordFor(3);
        $this->assertNull($export);

        $export = $this->getExportRecordFor(2);
        $this->assertNull($export);
    }

    /**
     * @test
     */
    public function moderators_can_request_export_other_users_data()
    {
        // Perform an activity as the user, so that an access token is generated for them

        $response = $this->send(
            $this->request(
                'get',
                '/api/users/2',
                [
                    'authenticatedAs' => 2,

                ]
            )
        );

        $response = $this->makeExportRequest(3, 2);

        $this->assertEquals(201, $response->getStatusCode());

        $export = $this->getExportRecordFor(2);

        $this->assertEquals(2, $export->user_id);
        $this->assertEquals(3, $export->actor_id);

        $this->notification_is_created_after_requesting_export_data(3, 2);

        $this->zip_file_contains_expected_files(3, 2);
    }

    /**
     * @test
     */
    public function notification_is_created_after_requesting_export_data(int $actorId = 2, int $userId = 2)
    {
        $response = $this->makeExportRequest(2);
        $this->assertEquals(201, $response->getStatusCode());

        $export = $this->getExportRecordFor(2);

        $notifications = $this->getNotificationsForExport($export);
        $this->assertCount(1, $notifications);

        $this->assertEquals($userId, $notifications[0]->from_user_id);

        if ($actorId === $userId) {
            $this->assertEquals(2, $notifications[0]->user_id);
        } else {
            $this->assertEquals(3, $notifications[0]->user_id);
        }
    }

    /**
     * @test
     */
    public function export_is_created_after_requesting_export_data()
    {
        $response = $this->makeExportRequest(2);
        $this->assertEquals(201, $response->getStatusCode());

        $user = User::query()->where('id', 2)->first();
        $export = $this->getExportRecordFor(2);

        $this->assertEquals(2, $export->user_id);

        $fileName = $export->file;

        $this->assertEquals(2, $export->user_id);
        $this->assertStringStartsWith("gdpr-export-{$user->username}", $fileName);
    }

    /**
     * @test
     */
    public function export_file_exists_in_storage()
    {
        $response = $this->makeExportRequest(2);
        $this->assertEquals(201, $response->getStatusCode());

        $export = $this->getExportRecordFor(2);

        $this->assertTrue($this->getStorageFilesystem()->exists("export-{$export->id}.zip"), 'Export file does not exist in storage.');
    }

    /**
     * @test
     */
    public function authenticated_user_can_retrieve_export_file_via_controller()
    {
        $response = $this->makeExportRequest(2);
        $this->assertEquals(201, $response->getStatusCode());

        $export = $this->getExportRecordFor(2);

        $fileName = $export->file;
        $response = $this->send(
            $this->request(
                'GET',
                '/gdpr/export/'.$fileName,
                ['authenticatedAs' => 2]
            )->withAttribute('bypassCsrfToken', true)
        );

        $this->assertEquals(200, $response->getStatusCode());
        $data = $response->getBody()->getContents();
        $this->assertNotEmpty($data);
    }

    /**
     * @test
     */
    public function unauthenticated_user_can_retrieve_export_file_via_controller()
    {
        $response = $this->makeExportRequest(2);
        $this->assertEquals(201, $response->getStatusCode());

        $export = $this->getExportRecordFor(2);

        $fileName = $export->file;
        $response = $this->send(
            $this->request(
                'GET',
                '/gdpr/export/'.$fileName,
            )->withAttribute('bypassCsrfToken', true)
        );

        $this->assertEquals(200, $response->getStatusCode());
        $data = $response->getBody()->getContents();
        $this->assertNotEmpty($data);
    }

    /**
     * @test
     */
    public function zip_file_contains_expected_files(int $actorId = 2, int $userId = 2)
    {
        $response = $this->makeExportRequest($actorId, $userId);
        $this->assertEquals(201, $response->getStatusCode());

        $user = User::find($userId);

        $export = $this->getExportRecordFor(2);

        $zip = new ZipFile();
        $zip->openFromString($this->getStorageFilesystem()->get("export-{$export->id}.zip"));

        $actualFiles = $zip->getListFiles();

        // Expected files without dynamic keys
        $expectedFilesStatic = ['user.json', "Flarum Test-{$user->username}.txt"];

        // Check static expected files are present
        foreach ($expectedFilesStatic as $expectedFile) {
            $this->assertTrue(in_array($expectedFile, $actualFiles), "Expected file {$expectedFile} not found in zip.");
        }

        // Check for dynamic expected files
        $accessTokenFiles = array_filter($actualFiles, function ($fileName) {
            return strpos($fileName, 'tokens/token-AccessToken-') === 0 && preg_match('/tokens\/token-AccessToken-\d+\.json/', $fileName);
        });

        $this->assertNotEmpty($accessTokenFiles, 'No tokens/token-AccessToken-#.json file found in zip.');

        // Create a combined list of all expected files (static + dynamic)
        $allExpectedFiles = array_merge($expectedFilesStatic, $accessTokenFiles);

        // Ensure no additional unexpected files
        foreach ($actualFiles as $actualFile) {
            $this->assertTrue(in_array($actualFile, $allExpectedFiles), "Unexpected file {$actualFile} found in zip.");
        }

        $zip->close();
    }
}
