import './modal.css';

// <div class="modal">
//   <form class="modal__form">
//     <h2 class="modal__title">Выберите псевдоним</h2>
//     <label class="modal__label visually-hidden" for="name">Введите псевдоним</label>
//     <input class="modal__input" id="name" type="text" placeholder="Введите псевдоним" required>
//     <button class="modal__btn" type="submit">Продолжить</button>
//   </form>
// </div>

export default class Modal {
  constructor() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');

    this.form = document.createElement('form');
    this.form.classList.add('modal__form');

    this.title = document.createElement('h2');
    this.title.classList.add('modal__title');
    this.title.textContent = 'Выберите псевдоним';

    this.label = document.createElement('label');
    this.label.classList.add('modal__label', 'visually-hidden');
    this.label.for = 'name';
    this.label.textContent = 'Выберите псевдоним';

    this.input = document.createElement('input');
    this.input.classList.add('modal__input');
    this.input.id = 'name';
    this.input.type = 'text';
    this.input.placeholder = 'Выберите псевдоним';
    this.input.required = true;

    this.button = document.createElement('button');
    this.button.classList.add('modal__btn');
    this.button.type = 'submit';
    this.button.textContent = 'Продолжить';

    this.form.append(this.title, this.label, this.input, this.button);

    this.modal.append(this.form);

    document.body.append(this.modal);
  }

  hide() {
    this.modal.classList.add('hidden');
  }

  getInputValue() {
    // FIXME: нужно ли сохранять содержимое инпута или можно сразу вернуть его без пробелов ???
    this.input.value = this.input.value.trim();
    return this.input.value;
  }

  submitEvent(handler) {
    this.form.addEventListener('submit', handler);
  }

  removeForm() {
    // TODO: добавить логику удаления формы из DOM !!!
    this.input.value = ''; // очистка поля ввода - надо ли вообще ???
  }
}
