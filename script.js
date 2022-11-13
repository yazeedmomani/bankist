'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(cur => cur.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Tabbed Component

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  //Gaurd
  if (!clicked) return;

  tabs.forEach(cur =>
    cur === clicked
      ? cur.classList.add('operations__tab--active')
      : cur.classList.remove('operations__tab--active')
  );

  const btnNum = clicked.getAttribute('data-tab');
  const targetContent = clicked.closest('.operations').querySelector(`.operations__content--${btnNum}`);
  const allContent = clicked.closest('.operations').querySelectorAll(`.operations__content`);

  allContent.forEach((cur) => cur === targetContent ? cur.classList.add('operations__content--active') : cur.classList.remove('operations__content--active'));

});

///////////////////////////////////////
// Menu Fade Animation