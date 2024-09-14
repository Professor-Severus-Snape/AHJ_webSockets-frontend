import createRequest from '../libs/createRequest';

import Chat from '../components/chat/Chat';
import Modal from '../components/modal/Modal';
import Users from '../components/users/Users';

export default class Controller {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }

    this.container = container;
  }

  init() {
    this.renderModal();
    // this.renderPage();

    this.modal.submitEvent(this.addSubmitEvent.bind(this));
  }

  renderModal() {
    this.modal = new Modal(); // отрисовка модального окна для запроса никнейма юзера
  }

  renderPage() {
    this.modal.hide(); // сокрытие модального окна

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

  async addSubmitEvent(e) {
    e.preventDefault();

    const name = this.modal.getInputValue();

    if (!name) {
      // TODO: вывести подсказку, что поле не должно быть пустым!!!
      return;
    }

    const options = {
      method: 'POST',
      url: '/new-user',
      body: {
        name,
      },
    };

    // или data: { status: "ok", user { id: "...", name: "..." } }
    // или data: { status: "error", message: "This name is already taken!" }
    const data = await createRequest(options);
    console.log('data: ', data); // NOTE: отладка

    if (data.error) {
      // TODO: добавить логику обработки ошибки сервера!!!
      console.log('Ошибка сервера');
      return;
    }

    if (data.status === 'error') {
      // TODO: добавить логику для занятого никнейма!!!
      console.log('data.message: ', data.message);
      return;
    }

    if (data.status === 'ok') {
      // TODO: работаем с юзером!!!
      console.log('data.user: ', data.user);
    }
  }
}
