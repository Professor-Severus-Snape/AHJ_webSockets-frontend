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
    this.renderPage();
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
}
