<?php

namespace Hello\Plugin\Block;

/**
 * Provides a decouple 'Hello' Block from Drupal runtime for easy testing
 */
class MyHelloBlock {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#markup' => '<div id="hello-world-react"></div>',
    ];
  }

}