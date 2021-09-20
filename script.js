const app = document.querySelector('.app');
const appBody = document.querySelector('.app-body');
const BASE_URL = `https://production.api.coindesk.com/v2/tb/price/ticker?assets=`;
const ALL_ASSETS_URL = `https://production.api.coindesk.com/v2/tb/price/ticker?assets=all`;

let coinData;
let coinSymbols = [];

const emitNotesLoaded = (target, data) => { target.dispatchEvent(new CustomEvent('dataloaded', { bubbles: false, detail: { data: data } })) };


const fetchCoin = async (url, symbol = '', fileType = 'json') => {
  let data;
  const type = fileType.trim().toLowerCase();
  const res = await fetch(url);

  if (type === 'json') data = await res.json();
  else if (type === 'xml') {
    data = await res.text();
    data = await new window.DOMParser().parseFromString(data, "text/xml") //.replace('\n','');
    data = [...data.children[0].children].map(ch => ch.innerHTML.replaceAll('\n', ''))
  } else if (type === 'csv') { console.log('type csv'); }
  
  coinData = data;
  emitNotesLoaded(app, coinData)
 
  return coinData;
}

// fetchCoin(BASE_URL);
fetchCoin(ALL_ASSETS_URL);

app.addEventListener('dataloaded', e => {
  
// console.log('e datalosd', extractCoinSymbols(e.detail.data.message, 'array'))
  // const responseMsg =  extractCoinSymbols(e.detail.data.message, 'array')
  console.log('e.detail.data.data', e.detail.data)
  const responseMsg =  JSON.stringify(e.detail.data.data, false, 2)
  appBody.innerHTML =  responseMsg

  
});  

const extractCoinSymbols = (msg = '', dataType = 'array') => {
  const brackets = dataType === 'array' ? ['[', ']'] : ['{', '}']
  const stringsToRemove = [`"[0]" `]
  let trimmed;
  let extracted;

  if (msg.startsWith(stringsToRemove[0])) {
    trimmed = msg.replace(stringsToRemove[0], '')
  }

  extracted = trimmed.substring(trimmed.indexOf(brackets[0]) + 1, trimmed.indexOf(brackets[1]));
  coinSymbols = extracted.split(', ');
  return extracted.split(', ');
}

const fetchCoin2 = async (symbol) => {
  const resp = await fetch(`${BASE_URL}${symbol}`)
  const result = await resp.json();
  return result
};