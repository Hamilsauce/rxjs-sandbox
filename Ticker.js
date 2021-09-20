// Ticker

export default class {
  constructor(coinData) {
    this.tickerItems = coinData.coins || ''; // or - or +
    this.currencyName = coinData.currencyName || '';; //btc
    this.priceMovementPercent = coinData.priceMovementPercent || '';; // % change
  }

  render() {
    return this.template();
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