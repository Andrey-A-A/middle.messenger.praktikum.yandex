import Block from '../../core/Block';

interface ErrorProps {
  text?: string;
}

export class Error extends Block<ErrorProps> {

  static componentName = 'Error';

  protected render(): string {
    return `
      <div class="error">
        {{#if text}}{{text}}{{/if}}
      </div>
    `;
  }
}
