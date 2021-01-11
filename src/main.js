import image from './templates/images.hbs';
import './css/spin.css';
import { Spinner } from 'spin.js';
import opts from './js/spinner.js';
import fetchImg from './js/fetch.js';
import refs from './js/refs.js';

let spinner = new Spinner(opts).spin(refs.spinnerRef);

refs.formRef.addEventListener('submit', findImages);
refs.btnRef.addEventListener('click', onLoadMore);
refs.searchBtnRef.addEventListener('click', findImagesBtn);

function findImages(e) {
  e.preventDefault();
  refs.galleryItemRef.innerHTML = '';

  fetchImg.resetPage();

  fetchImg.searchQuery = e.currentTarget.elements.query.value;

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

function findImagesBtn(e) {
  e.preventDefault();
  refs.galleryItemRef.innerHTML = '';

  fetchImg.resetPage();

  fetchImg.searchQuery = refs.inputRef.value;

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
  refs.spinnerRef.classList.remove('is-hidden');
  refs.btnRef.classList.add('is-hidden');
  fetchImg
    .fetchImages()
    .then(images => {
      fetchImg.page += 1;
      const img = images.hits;
      if (img.length < 12) {
        refs.btnRef.classList.add('is-hidden');
      }
      renderImage(img);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    })
    .catch(error => error)
    .finally(function () {
      refs.spinnerRef.classList.add('is-hidden');
      refs.btnRef.classList.remove('is-hidden');
    });
}
