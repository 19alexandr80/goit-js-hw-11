import axios from 'axios';
// import SimpleLightbox from 'simplelightbox';
export class NewApi {
  constructor() {
    this.input = '';
    this.page = 1;
  }
  async getUser() {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=34606979-50f381d93fa3ea4666c32e671&q=${this.input}&page=${this.page}&per_page=3&image_type=photo&orientation=horizontal&safesearch=true`
      );

      // if (response.data.totalHits < this.page * 40) {
      //   return alert('xana');
      // }
      this.setPage();

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  setInput(data) {
    this.input = data;
  }
  setPage() {
    this.page += 1;
  }
  resetPege() {
    this.page = 1;
  }
  // lightbox = new SimpleLightbox('.gallery a', {
  // captionsData: 'alt',
  // captionDelay: 250,
  // });
}
export class LoadMore {
  constructor(nnn) {
    console.log(nnn);
  }
}
