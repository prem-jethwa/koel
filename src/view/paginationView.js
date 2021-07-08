import {PER_PAGE} from '../config.js';
import View from './View.js';

class PaginationView extends View {
  constructor() {
    super();
    this._parentEl = document.querySelector('.song-shotlist_container');
    this._paginationCon = document.querySelector('.pagination-container');
    this._currPage = 1;
    this._totalPage = 0;
  }

  setSongs(songs) {
    this._data = songs;
  }

  setCurrPage(pageNum) {
    this._currPage = pageNum;
  }

  _generateMarkup() {
    let prev = '',
      next = '',
      pages = '';

    this._totalPage = Math.ceil(this._data.length / PER_PAGE);

    for (let page = 1; page <= this._totalPage; page++) {
      pages += `<div class="page" data-page="${page}"><span>${page}</span></div>`;
    }

    if (this._currPage !== 1 && this._currPage > 0) {
      prev = `<div class="prev" data-page="${this._currPage}"><span>${
        this._currPage - 1
      }</span>  PREV</div>`;
    }

    if (this._currPage !== this._totalPage && this._currPage < this._totalPage) {
      next = `<div class="next" data-page="${this._currPage}">NEXT <span> ${
        this._currPage + 1
      }</span></div>`;
    }

    return `
    ${prev}
    ${pages}
    ${next}
    `;
    //   ${next}   ${prev}
  }

  get getTotalPage() {
    return this._totalPage;
  }

  renderPages() {
    this._clear();
    const markup = `
      <div class="pagination">
        ${this._generateMarkup()}  
      </div>
      `;

    if (!this.getTotalPage) return;
    this._paginationCon.insertAdjacentHTML('beforeend', markup);
  }

  addHandlerPagination(handler) {
    this._parentEl.addEventListener('click', e => {
      if (!e.target.closest('.pagination')) return;
      const clickedPage = e.target.closest(`.page`);
      const nextBtn = e.target.closest('.next');
      const prevBtn = e.target.closest('.prev');

      if (nextBtn || prevBtn) {
        if (nextBtn) this._currPage++;
        if (prevBtn) this._currPage--;

        return handler(this._currPage);
      }

      if (!clickedPage) return;

      const currPage = +clickedPage.dataset.page;
      this._currPage = currPage;
      handler(currPage);
    });
  }

  updatePageBackground(pageNum) {
    const allPage = [...this._parentEl.querySelectorAll(`.page`)];

    if (!allPage[0]) return;

    allPage.forEach(page => (page.style.backgroundColor = 'rgba(151, 151, 151, 0)'));
    allPage[pageNum - 1].style.backgroundColor = 'rgba(151, 151, 151, 0.486)';
    allPage[pageNum - 1].style.border = '1px solid rgba(151, 151, 151, 1)';
  }

  _clear() {
    this._paginationCon.innerHTML = '';
  }
}

export default new PaginationView();

// deprecated
// if (nextBtn.dataset.page <= 0) return;
// if (this._totalPage < nextBtn.dataset.page) return;
