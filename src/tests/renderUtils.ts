import { renderDOM, registerComponent } from '../core';
import { Store } from '../core/Store'
import { BlockClass} from '../core/Block'
import { defaultState } from '../store';
import * as components from '../components';
import { initRouter } from '../router';
import { MockedPathRouter } from './MockedPathRouter';
import { sleep } from '../utils';

type RenderBlockParams<T> = {
  Block: BlockClass<T>;
  props: T;
  state?: Partial<AppState>;
};

export async function renderBlock<T extends Record<string, unknown>>({
  Block,
  props,
  state = defaultState,
}: RenderBlockParams<T>) {

  Object.values(components).forEach((Component: any) => {
    console.log('Component=', Component);
    registerComponent(Component);
  });

  const store = new Store<AppState>({ ...defaultState, ...state });
  const router = new MockedPathRouter();

  window.router = router;
  window.store = store;

  document.body.innerHTML = '<div id="app"></div>';
    
  renderDOM(new Block(props as T));

  initRouter(router, store);

  /**
   * Ждем вызова componentDidMount,
   * медота жизненного цикла компонента,
   * который вызывается через 100мс в Block.getContent
   */
  await sleep();
}

export async function step(name: string, callback: () => void) {
  await callback();
}
