// TickerItem

export default class {
 constructor(data) {
   this.element = document.createElement('div');
   this.element.classList.add('ticker__item');
   this.data = data;
   this._isActive = false
 }

 get isActive() {
   return this._isActive
 }
 set isActive(newValue) {
   this._isActive = newValue
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
    <div class="marquee__item">
      <a class="marquee__item__currency-name--link" href="/price/${this.data.name}/">
       <span class="marquee__item__currency-name--text">Bitcoin</span>
      </a>
      <div class="price-wrapper">
       <span class="marquee__item__text-container--price">${this.data.ohlc.c.toFixed(2)}</span>
       <span class="marquee__item__text-container--percent">${this.data.change.percent.toFixed(2)}</span>
      </div>
    </div>
  `;
  }
}