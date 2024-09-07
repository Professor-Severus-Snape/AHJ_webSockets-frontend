import Controller from './Controller';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const controller = new Controller(root);
  controller.init();
});
