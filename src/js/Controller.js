export default class Controller {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }

    this.container = container;
  }

  init() {
    console.warn('запуск контроллера'); // TODO: проверка работоспособности сборки
  }
}
