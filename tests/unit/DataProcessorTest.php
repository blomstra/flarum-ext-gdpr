<?php

/*
 * This file is part of blomstra/flarum-gdpr
 *
 * Copyright (c) 2021 Blomstra Ltd
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Blomstra\Gdpr\tests\unit;

use Blomstra\Gdpr\Data;
use Blomstra\Gdpr\DataProcessor;
use Flarum\Testing\unit\TestCase;

class DataProcessorTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Resetting the types and removeUserColumns properties before each test
        DataProcessor::setTypes([
            ['class' => Data\Forum::class, 'extension' => null],
            ['class' => Data\Assets::class, 'extension' => null],
            ['class' => Data\Posts::class, 'extension' => null],
            ['class' => Data\Tokens::class, 'extension' => null],
            ['class' => Data\Discussions::class, 'extension' => null],
            ['class' => Data\User::class, 'extension' => null],
        ]);
        DataProcessor::removeUserColumns([]);
    }

    /**
     * @test
     */
    public function it_can_add_a_new_type()
    {
        // Given
        $newType = 'TestData\TypeExample';
        $processor = new DataProcessor();

        // When
        DataProcessor::addType($newType);

        // Then
        $this->assertArrayHasKey($newType, $processor->types());
    }

    /**
     * @test
     */
    public function it_can_remove_a_type()
    {
        // Given
        $typeToRemove = Data\Tokens::class;
        $processor = new DataProcessor();

        // When
        DataProcessor::removeType($typeToRemove);

        // Then
        $this->assertNotContains($typeToRemove, $processor->types());
    }

    /**
     * @test
     */
    public function it_can_set_types()
    {
        // Given
        $newTypes = ['TestData\TypeA', 'TestData\TypeB'];
        $processor = new DataProcessor();

        // When
        DataProcessor::setTypes($newTypes);

        // Then
        $this->assertEquals($newTypes, $processor->types());
    }

    /**
     * @test
     */
    public function it_can_add_removable_user_columns()
    {
        // Given
        $newColumns = ['columnA', 'columnB'];
        $processor = new DataProcessor();

        // When
        DataProcessor::removeUserColumns($newColumns);

        // Then
        $this->assertEquals($newColumns, $processor->removableUserColumns());
    }
}
