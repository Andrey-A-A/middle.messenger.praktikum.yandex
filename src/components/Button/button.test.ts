import { getByTestId } from '@testing-library/dom';
import { renderBlock } from '../../tests/renderUtils';
import { Button } from './button';
import '@testing-library/jest-dom';

describe('component/Button', () => {
  it('должна работать кнопка', () => {
    const mockCallBack = jest.fn();
    renderBlock({
      Block: Button,
      props: { text: 'нажми меня', className: 'testButton', onclick: mockCallBack },
    });
    const button = getByTestId(document.body, 'button-test');
    button.dispatchEvent(new Event('click'));
    expect(button).toBeInTheDocument();
  });
});
