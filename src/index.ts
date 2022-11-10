import { PathRouter } from './core';
import {Store} from './core/Store';
import { defaultState } from './store';
import { initRouter } from './router';
import { initApp } from './services/initApp';

import './styles/main.scss';

export const urlAPI = 'https://ya-praktikum.tech/api/v2';
export const urlWS = 'wss://ya-praktikum.tech/ws';

document.addEventListener('DOMContentLoaded', () => {
  
  const store = new Store<AppState>(defaultState);
  const router = new PathRouter();

  window.router = router;
  window.store = store;
  
  /**
   * Инициализируем роутер
   */
  initRouter(router, store);

  /**
    * Загружаем данные для приложения
    */
  store.dispatch(initApp);
  
});
