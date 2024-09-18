import Chat from '../components/chat/Chat';
import Modal from '../components/modal/Modal';
import ServerError from '../components/serverError/ServerError';
import Service from '../libs/Service';
import Spinner from '../components/spinner/Spinner';
import Users from '../components/users/Users';

export default class Controller {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }

    this.container = container;
  }

  async init() {
    this.spinner = new Spinner(); // запускаем спиннер ожидания
    const server = await Service.pingServer(); // ждём ответа от сервера
    this.spinner.removeSpinner(); // убираем спиннер после получения ответа от сервера

    // обработка ошибки подключения к серверу:
    if (server.status === 520) {
      this.serverError = new ServerError(server.status); // отрисовать ошибку сервера
      return;
    }

    this.renderModal();
    this.modal.submitEvent(this.addSubmitEvent.bind(this));
  }

  renderModal() {
    this.modal = new Modal(); // отрисовка модального окна для запроса никнейма юзера
  }

  async addSubmitEvent(e) {
    e.preventDefault();

    const name = this.modal.getInputValue();

    if (!name) {
      this.modal.showTooltip('Поле не должно быть пустым!'); // показать подсказку на 2 сек
      setTimeout(() => this.modal.hideTooltip(), 1000 * 2); // убрать подсказку
      return;
    }

    const data = await Service.registerUser(name); // попытка регистрации юзера на сервере

    // ---------- ошибка сервера при отправке данных: ----------
    // data: { error: true, status: 520 };
    if (data.error) {
      this.modal.removeForm(); // удалить модалку из DOM
      this.serverError = new ServerError(data.status); // отрисовать ошибку сервера
      return;
    }

    // ---------- занятый никнейм: ----------
    // data: { status: "error", message: "This name is already taken!" }
    if (data.status === 'error') {
      this.modal.showTooltip('Это имя уже занято! Выберите другое!'); // показать на 2 сек, что имя занято
      setTimeout(() => this.modal.hideTooltip(), 1000 * 2); // убрать подсказку
      return;
    }

    // TODO:
    // ---------- работа с юзером!!! ----------
    // data: { status: "ok", user { id: "...", name: "..." } }
    if (data.status === 'ok') {
      this.modal.removeForm(); // удалить модалку из DOM
      this.renderPage();
    }
  }

  // TODO: временная заготовка:
  renderPage() {
    this.container.classList.remove('hidden'); // отрисовка контейнера для контента
    this.users = new Users(this.container); // отрисовка контейнера с юзерами

    this.users.addUser('Alexandra'); // добавление юзера
    this.users.addUser('Petr'); // добавление юзера
    this.users.addUser('Ivan'); // добавление юзера
    this.users.addUser('You'); // добавление юзера

    this.chat = new Chat(this.container); // отрисовка контейнера с сообщениями

    this.chat.addMessage('Alexandra, 23:04 20.03.2019', 'I can\'t sleep...'); // добавление сообщения
    this.chat.addMessage('You, 23:10 20.03.2019', 'Listen this: https://youtu.be.xxxxxx'); // добавление сообщения
    this.chat.addMessage('Alexandra, 01:15 21.03.2019', 'Thxx!! You help me! I listen this music 1 hour and I sleep. Now is my favorite music!'); // добавление сообщения
    this.chat.addMessage('Petr, 01:25 21.03.2019', 'I subscribed just for that 😁😁😁'); // добавление сообщения
  }
}
