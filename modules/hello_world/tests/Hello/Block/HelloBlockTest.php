<?php 

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Hello\Plugin\Block\MyHelloBlock;

/**
 * Tests decoupled Hello Block
 */
final class HelloBlockTest extends TestCase
{

  /**
   * Assert build function
   */
  public function testBuild(): void
  {
    $hello = new MyHelloBlock();
    $expected = [
      '#markup' => '<div id="hello-world-react"></div>',
    ];
    $result = $hello->build();
    $this->assertEquals($result, $expected);
  }
}