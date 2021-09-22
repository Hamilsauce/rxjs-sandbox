// Ticker

export default class {
  constructor(selector = '#ticker-wrap', coinData) {
    this.element = document.querySelector(selector).firstElementChild;
    this._tickerItems = coinData.coins || ''; // or - or +
    this._activeItem;
  }

  get tickerItems() {
    return this._tickerItems
  }
  set tickerItems() {
    this._tickerItems = newValue
  }

  get activeItem() {
    return this._activeItem
  }
  set activeItem() {
    this._activeItem = newValue
  }

  render() {
    this.element.innerHTML = this.template()
    this.element.addEventListener('dataloaded', e => {
      this.tickerItems = e.detail.data.data;
      e.stopImmediatePropagation()
    });

    this.element.addEventListener('click', e => {
      this.activeItem = e.detail.target
      e.stopImmediatePropagation()
    });
    return this.element
  }

  template() {
    return `
      <div class="ticker-wrap">
        <div class="ticker">
        ${tickerItems}
        </div>
      </div>
    `;
  }
}