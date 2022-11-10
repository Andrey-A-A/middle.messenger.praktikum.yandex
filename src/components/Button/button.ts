import Block from '../../core/Block';

type SvgInHtml = HTMLElement & SVGElement;

interface ButtonProps {
  textContent?: string|SvgInHtml;
  className?: string;
  onClick: () => void;
}

export class Button extends Block {

  static componentName = 'Button';

  constructor({ textContent, className, onClick }: ButtonProps) {
    super({ textContent, className, events: { click: onClick } });    
  }

  protected render(): string {
    return `
    <button type="button" class="{{className}}" data-testid="button-test"  value=""><div data-slot="1">{{textContent}}</div></button>
    `;
  }
}
