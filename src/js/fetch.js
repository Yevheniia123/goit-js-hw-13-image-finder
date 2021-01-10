export default {
  searchQuery: '',
  page: 1,

  fetchImages() {
    return fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=19789336-cedf960e9ca7c5db403100932`,
    ).then(response => {
      return response.json();
    });
  },
  resetPage() {
    this.page = 1;
  },
};
