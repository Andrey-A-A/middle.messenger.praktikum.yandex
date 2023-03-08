import { PathRouter } from '../core/Router/PathRouter';

export class MockedPathRouter extends PathRouter {
  go(hash: string) {
    window.location.hash = hash;
    this.onRouteChange();
  }
}
