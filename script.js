'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav__links');

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
  const targetContent = clicked
    .closest('.operations')
    .querySelector(`.operations__content--${btnNum}`);
  const allContent = clicked
    .closest('.operations')
    .querySelectorAll(`.operations__content`);

  allContent.forEach(cur =>
    cur === targetContent
      ? cur.classList.add('operations__content--active')
      : cur.classList.remove('operations__content--active')
  );
});

///////////////////////////////////////
// Menu Fade Animation

const fadeAnimation = function (e, opacity) {
  const hovered = e.target;
  if (hovered.classList.contains('nav__link')) {
    nav.querySelectorAll('.nav__link').forEach(function (cur) {
      if (cur !== hovered) cur.style.opacity = opacity;
    });
    nav.parentElement.querySelector('.nav__logo').style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', function (e) {
  fadeAnimation(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  fadeAnimation(e, 1);
});

///////////////////////////////////////
// Sticky Navigation

const header = document.querySelector('.header');
const navSection = document.querySelector('.nav');
const navHeight = navSection.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navSection.classList.add('sticky');
  else navSection.classList.remove('sticky');
};

const headerObs = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObs.observe(header);

///////////////////////////////////////
// Reveal Elements on Scroll

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(cur => {
  sectionObserver.observe(cur);
  cur.classList.add('section--hidden');
});

///////////////////////////////////////
// Lazy Loading Images

const featuresImgs = document.querySelectorAll('.features__img');

const revealImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  const src = entry.target.getAttribute('data-src');
  entry.target.setAttribute('src', src);

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(revealImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

featuresImgs.forEach(cur => {
  imgObserver.observe(cur);
});

///////////////////////////////////////
// Slider Component

const slider = function () {
  const sliders = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const maxSlide = sliders.length - 1;
  let curSlide = 0;

  const dotContainer = document.querySelector('.dots');

  const insertDot = function () {
    let html = ``;

    sliders.forEach((_, i) => {
      if (i === curSlide)
        html += `<div class="dots__dot dots__dot--active" data-dot="${i}"></div>`;
      else html += `<div class="dots__dot" data-dot="${i}"></div>`;
    });

    dotContainer.insertAdjacentHTML('afterbegin', html);
  };

  insertDot();

  const dots = document.querySelectorAll('.dots__dot');

  const goToSlide = slide => {
    sliders.forEach(
      (cur, i) => (cur.style.transform = `translateX(${100 * (i - slide)}%)`)
    );

    dots.forEach((cur, i) =>
      i === Number(slide)
        ? cur.classList.add('dots__dot--active')
        : cur.classList.remove('dots__dot--active')
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide;
    else curSlide--;

    goToSlide(curSlide);
  };

  goToSlide(0);

  // Event Listeners

  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', prevSlide);

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      goToSlide(e.target.dataset.dot);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.code === 'ArrowLeft') prevSlide();
    if (e.code === 'ArrowRight') nextSlide();
  });
};

slider();