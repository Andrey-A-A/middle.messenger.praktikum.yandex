import { Store } from './Store';

describe('score/Store', () => {
  it('следует установить состояние', () => {
    const store = new Store({});

    store.set({ userId: 123 });

    expect(store.getState()).toEqual({ userId: 123 });
  });
  
  it('должно выдавать событие после обновления хранилища', () => {
    const store = new Store({ userId: -1 });
    const mock = jest.fn();

    store.on('changed', mock);

    store.set({ userId: 123 });

    expect(mock).toHaveBeenCalled();
    expect(mock).toBeCalledTimes(1);
    expect(mock).toHaveBeenCalledWith({ userId: -1 }, { userId: 123 });
  });
});