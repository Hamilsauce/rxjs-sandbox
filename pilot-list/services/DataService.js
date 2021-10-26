const { ReplaySubject, merge, of } = rxjs;
const { fromFetch } = rxjs.fetch;
const { map, filter, mergeMap } = rxjs.operators;
const { ajax } = rxjs.ajax
export default class {
  constructor() {
    this.pilotListSubject$ = new ReplaySubject();
    this.pilotListSubject$.next()
    this.BASE_URL = `../data/list-data.json`
    this.ALL_ASSETS_URL = `https://production.api.coindesk.com/v2/tb/price/ticker?assets=all`;
    this.fetchSub;

  }

  fetch(url, options) {
    // return fetch(val)
    this.fetchSub = fromFetch(url).pipe(
      filter(_ => _ !== undefined),
      mergeMap((response) => response.json()),
      // map(x => x.data)
    ).subscribe(this.pilotListSubject$);

    // return this.pilotListSubject$
  }

  async sendFetch(val, url) {
    console.log('val', val);
    console.log('url', url);

    const response = await fetch(url, {
      body: JSON.stringify(val),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // const response = ajax.post(url, { val }, { 'Content-Type': 'application/json' })
    // const response = ajax.post(url, JSON.stringify(val), { 'Content-Type': 'application/json' })
    //   .pipe(
    //     mergeMap((response) => response.json()),
    //   )
    // this.fetch(url)
    this.pilotListSubject$.next()
    return await response.json()
  }



  getCoinUrl(sym) { return `https://production.api.coindesk.com/v2/tb/price/ticker?assets=${sym}` }
}