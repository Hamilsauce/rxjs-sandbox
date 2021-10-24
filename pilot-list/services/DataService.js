const { merge, of } = rxjs;
const { fromFetch } = rxjs.fetch;
const { map, mergeMap } = rxjs.operators;

export default class {
  constructor() {

    this.BASE_URL = `../data/list-data.json`
    this.ALL_ASSETS_URL = `https://production.api.coindesk.com/v2/tb/price/ticker?assets=all`;
  }

  fetch(val) {
    return fetch(val)
    return fromFetch(this.getCoinUrl(val ? val : 'all')).pipe(
      mergeMap((response) => response.json()),
      map(x => x.data)
    )
  }

  async sendFetch(val, url) {
    console.log(val);

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(val),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return response
  }



  getCoinUrl(sym) { return `https://production.api.coindesk.com/v2/tb/price/ticker?assets=${sym}` }
}