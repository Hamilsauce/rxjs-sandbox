import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js'

const { merge, of } = rxjs;
const { fromFetch } = rxjs.fetch;
const { map, tap, mergeMap } = rxjs.operators;


export default class {
  constructor() {
    this.BASE_URL = `./data/btc-coindesk-data.csv`;
    this.ALL_ASSETS_URL = `https://production.api.coindesk.com/v2/tb/price/ticker?assets=all`;
  }

  fetch(url = this.BASE_URL) {
    return fromFetch(url).pipe(
      mergeMap((response) => response.text()),
      map(x => ham.csvToJson(x)),
    )
  }

  getCoinUrl(sym) { return `https://production.api.coindesk.com/v2/tb/price/ticker?assets=${sym}` }
}