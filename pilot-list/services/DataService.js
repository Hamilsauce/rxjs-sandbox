const { ReplaySubject,merge, of } = rxjs;
const { fromFetch } = rxjs.fetch;
const { map, mergeMap } = rxjs.operators;

export default class {
  constructor() {
    this.pilotListSubject$ = new ReplaySubject();
this.pilotListSubject$.next()
    this.BASE_URL = `../data/list-data.json`
    this.ALL_ASSETS_URL = `https://production.api.coindesk.com/v2/tb/price/ticker?assets=all`;
  }

  fetch(url, options) {
    // return fetch(val)
    const fetchSub = fromFetch(url).pipe(
      mergeMap((response) => response.json()),
      // map(x => x.data)
    ).subscribe(this.pilotListSubject$);
    
    return this.pilotListSubject$
  }

  async sendFetch(val, url) {
    console.log('val',val);

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