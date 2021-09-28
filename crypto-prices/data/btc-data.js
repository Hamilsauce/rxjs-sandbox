const { merge, of } = rxjs;
const { fromFetch } = rxjs.fetch;
const { map, mergeMap } = rxjs.operators;


export default class {
  constructor() {
    this.BASE_URL = `https://production.api.coindesk.com/v2/tb/price/ticker?assets=`;
    this.ALL_ASSETS_URL = `https://production.api.coindesk.com/v2/tb/price/ticker?assets=all`;
  }

  fetch(url) {
    return fromFetch(url).pipe(
      mergeMap((response) => response.json()),
      map(x => x.data)
    )
  }

  getCoinUrl(sym) { return `https://production.api.coindesk.com/v2/tb/price/ticker?assets=${sym}` }
}