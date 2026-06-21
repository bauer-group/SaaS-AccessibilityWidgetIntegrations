<?php

declare(strict_types=1);

namespace Drupal\accessibility_widget\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Configure Accessibility Widget settings.
 */
final class SettingsForm extends ConfigFormBase {

  private const SETTINGS = 'accessibility_widget.settings';

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'accessibility_widget_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames(): array {
    return [self::SETTINGS];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state): array {
    $config = $this->config(self::SETTINGS);

    $form['position'] = [
      '#type' => 'select',
      '#title' => $this->t('Position'),
      '#options' => [
        'bottom-right' => $this->t('Bottom right'),
        'bottom-left' => $this->t('Bottom left'),
        'top-right' => $this->t('Top right'),
        'top-left' => $this->t('Top left'),
      ],
      '#default_value' => $config->get('position') ?: 'bottom-right',
    ];

    $form['locale'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Locale'),
      '#description' => $this->t('Use "auto" to detect the browser/HTML language, or an ISO code (de, en, fr, …). 28 locales supported.'),
      '#default_value' => $config->get('locale') ?: 'auto',
    ];

    $form['primary_color'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Primary color'),
      '#description' => $this->t('Hex color of the FAB button, e.g. #0058a3.'),
      '#default_value' => $config->get('primary_color') ?: '#0058a3',
    ];

    $form['asset_base'] = [
      '#type' => 'url',
      '#title' => $this->t('Custom asset base URL (optional)'),
      '#description' => $this->t('Leave empty to load from the BAUER GROUP CDN (recommended; always current). Set to a custom origin only to self-host/mirror.'),
      '#default_value' => $config->get('asset_base') ?: '',
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $this->config(self::SETTINGS)
      ->set('position', $form_state->getValue('position'))
      ->set('locale', $form_state->getValue('locale'))
      ->set('primary_color', $form_state->getValue('primary_color'))
      ->set('asset_base', $form_state->getValue('asset_base'))
      ->save();

    parent::submitForm($form, $form_state);
  }

}
