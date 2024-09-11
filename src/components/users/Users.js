import './users.css';

// <div class="users">
//   <div class="user">
//     <div class="user__photo"></div>
//     <div class="user__name">Alexandra</div>
//   </div>
// </div>

export default class Users {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }

    this.container = container;

    this.users = document.createElement('div');
    this.users.classList.add('users');

    this.container.append(this.users);
  }

  addUser(nickName) {
    const user = document.createElement('div');
    user.classList.add('user');

    const photo = document.createElement('div');
    photo.classList.add('user__photo');

    const name = document.createElement('div');
    name.classList.add('user__name');
    name.textContent = nickName;

    user.append(photo, name);

    this.users.append(user);
  }
}
