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
  const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const numberFormatter = new Intl.NumberFormat('en-US');
  const dateFormatter = new Intl.DateTimeFormat('en-US')
    return fromFetch(url).pipe(
      mergeMap((response) => response.text()),
      mergeMap(x => {
        return of(ham.csvToJson(x))
          .pipe(
            map(x => {
              console.log('Object.entries(x[0][0]).includes', Object.entries(x[0])[2][0].includes('USD'));
              console.log('Object.entries(x[0][0])', Object.entries(x[0])[2][0]);
              return x.map(record => {
                for (let field in record) {
                  // field.includes('USD') ? record[field] = currencyFormatter.format(+record[field]) : record[field] = record[field];
                  field.includes('USD') ? record[field] = +numberFormatter.format((+record[field]).toFixed(2)) : record[field] = record[field];
                  field.includes('Date') ? record[field] = dateFormatter.format(new Date(Date.parse(record[field]))) : record[field] = record[field];
                }
                return record
              })
            }),
          )
      })
    )
  }

  getCoinUrl(sym) { return `https://production.api.coindesk.com/v2/tb/price/ticker?assets=${sym}` }
}