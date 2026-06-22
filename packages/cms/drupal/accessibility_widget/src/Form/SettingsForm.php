<?php

declare(strict_types=1);

namespace Drupal\accessibility_widget\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Configure Accessibility Widget settings.
 *
 * The form is generated from the shared schema (accessibility_widget.fields.php):
 * one collapsible group per section, one element per option, rendered in the
 * active interface language (German or English).
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
    $schema = accessibility_widget_fields();
    $lang = accessibility_widget_lang();

    foreach ($schema['groups'] as $group) {
      $form[$group['id']] = [
        '#type' => 'details',
        '#title' => $group['label'][$lang] ?? $group['label']['en'],
        '#open' => $group['id'] === 'appearance',
      ];
    }

    foreach ($schema['fields'] as $field) {
      $form[$field['group']][$field['key']] = $this->element($field, $config->get($field['key']), $lang);
    }

    return parent::buildForm($form, $form_state);
  }

  /**
   * Build the render element for a single field.
   */
  private function element(array $field, mixed $stored, string $lang): array {
    $default = $stored ?? ($field['default'] ?? '');
    $element = ['#title' => $field['label'][$lang] ?? $field['label']['en']];

    if (!empty($field['help'])) {
      $element['#description'] = $field['help'][$lang] ?? $field['help']['en'];
    }

    switch ($field['type']) {
      case 'enum':
      case 'feature_state':
        $options = [];
        foreach ($field['options'] as $opt) {
          $label = $opt['label'];
          $options[$opt['value']] = is_array($label) ? ($label[$lang] ?? $label['en']) : $label;
        }
        $element['#type'] = 'select';
        $element['#options'] = $options;
        $element['#default_value'] = (string) $default;
        break;

      case 'bool':
        $element['#type'] = 'checkbox';
        $element['#default_value'] = (bool) $default;
        break;

      case 'int':
        $element['#type'] = 'number';
        $element['#default_value'] = (int) $default;
        if (isset($field['min'])) {
          $element['#min'] = $field['min'];
        }
        break;

      case 'url':
        $element['#type'] = 'url';
        $element['#default_value'] = (string) $default;
        break;

      default:
        $element['#type'] = 'textfield';
        $element['#default_value'] = (string) $default;
        if ($field['type'] === 'color') {
          $element['#size'] = 12;
        }
    }

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state): void {
    $de = accessibility_widget_lang() === 'de';
    foreach (accessibility_widget_fields()['fields'] as $field) {
      $value = trim((string) $form_state->getValue($field['key']));
      if ($value === '') {
        continue;
      }
      if ($field['type'] === 'color' && !preg_match('/^#[0-9A-Fa-f]{3,8}$/', $value)) {
        $form_state->setErrorByName(
          $field['key'],
          $de ? 'Bitte eine gültige Hex-Farbe eingeben, z. B. #0058a3.' : 'Enter a valid hex color, for example #0058a3.'
        );
      }
      if (($field['validate'] ?? '') === 'url-safe' && !accessibility_widget_is_safe_url($value)) {
        $form_state->setErrorByName(
          $field['key'],
          $de ? 'Bitte eine gültige http(s)-URL eingeben.' : 'Enter a valid http(s) URL.'
        );
      }
    }
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $config = $this->config(self::SETTINGS);
    foreach (accessibility_widget_fields()['fields'] as $field) {
      $value = $form_state->getValue($field['key']);
      $config->set($field['key'], match ($field['type']) {
        'bool' => (bool) $value,
        'int' => (int) $value,
        default => (string) $value,
      });
    }
    $config->save();

    parent::submitForm($form, $form_state);
  }

}
