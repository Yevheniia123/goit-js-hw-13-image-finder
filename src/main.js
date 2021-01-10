import image from './templates/images.hbs';
import './css/spin.css';
import { Spinner } from 'spin.js';
import opts from './js/spinner.js';
import fetchImg from './js/fetch.js';
import refs from './js/refs.js';

const debounce = require('lodash.debounce');

let spinner = new Spinner(opts).spin(refs.spinnerRef);

refs.formRef.addEventListener('input', debounce(findImages, 2000));
refs.btnRef.addEventListener('click', onLoadMore);

function findImages(e) {
  refs.galleryItemRef.innerHTML = '';

  fetchImg.resetPage();

  fetchImg.searchQuery = e.target.value;

  fetchImg
    .fetchImages()
    .then(images => {
      fetchImg.page += 1;
      const img = images.hits;
      renderImage(img);
      refs.btnRef.classList.remove('is-hidden');
    })
    .catch(error => error);
}

function renderImage(images) {
  const picture = image(images);
  refs.galleryItemRef.insertAdjacentHTML('beforeend', picture);
}

function onLoadMore() {
  fetchImg.searchQuery = refs.inputRef.value;

  fetchImg
    .fetchImages()
    .then(images => {
      refs.spinnerRef.classList.remove('is-hidden');
      refs.btnRef.classList.add('is-hidden');
      fetchImg.page += 1;
      const img = images.hits;
      renderImage(img);
      window.scrollTo({
        top: 1000000000000,
        behavior: 'smooth',
      });
    })
    .catch(error => error)
    .finally(function () {
      refs.spinnerRef.classList.add('is-hidden');
      refs.btnRef.classList.remove('is-hidden');
    });
}
