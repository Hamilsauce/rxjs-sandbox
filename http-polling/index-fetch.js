const { Observable, merge, finalize, timer, from, of , range, interval, fromEvent, subscribe } = rxjs;
const { bufferWhen, takeUntil, switchMap, mapTo, mergeMap, filter, map, tap, take } = rxjs.operators;

const BASE_URL = `https://production.api.coindesk.com/v2/tb/price/ticker?assets=`;
const CATS_URL = "https://placekitten.com/g/{w}/{h}";
const MEATS_URL = "https://baconipsum.com/api/?type=meat-and-filler";
const CRYPTO_URL = `${BASE_URL}BTC`;

const fetchCoin = async (symbol) => {
  const resp = await fetch(`${BASE_URL}${symbol}`)
  const result = await resp.json();
  console.log('result', result);
  return result
};

// Constants for Cat Requests

function mapCats(response) {
  return from(new Promise((resolve, reject) => {
    var blob = new Blob([response], { type: "image/png" });
    let reader = new FileReader();
    reader.onload = (data) => {
      resolve(data.target.result);
    };
    reader.readAsDataURL(blob);
  }));
}

function mapMeats(response) {
  const parsedData = JSON.parse(response);
  return of(parsedData ? parsedData[0] : '');
}

function mapCrypto(response) {
  console.log('mapCrypto(response)', JSON.parse(response).data)
  const numberFormatter = Intl.NumberFormat('en-US');
  // const parsedData = numberFormatter.format(JSON.parse(response).data.BTC.ohlc.h.toFixed(2));
  const parsedData = numberFormatter.format(JSON.parse(response).data.BTC.circulatingSupply.toFixed(2));
  return of(parsedData ? parsedData : '');
}

/*************************
 * Our Operating State
 *************************/
// Which type of data we are requesting
let requestCategory = 'cats';
let pollingSub$;

/**
 * This function will make an AJAX request to the given Url, map the 
 * JSON parsed repsonse with the provided mapper function, and emit
 * the result onto the returned observable.
 */
const categoryMap = new Map(
  [
    ['cats', { url: CATS_URL, mapper: mapCats }],
    ['meats', { url: MEATS_URL, mapper: mapMeats }],
    ['crypto', { url: CRYPTO_URL, mapper: mapCrypto }]
  ])

function requestData(url, mapFunc) {
  console.log(url)
  const xhr = new XMLHttpRequest();
  return from(new Promise((resolve, reject) => {

      // This is generating a random size for a placekitten image
      // so that we get new cats each request.
      const w = Math.round(Math.random() * 400);
      const h = Math.round(Math.random() * 400);
      const targetUrl = url.replace('{w}', w.toString()).replace('{h}', h.toString());

      xhr.addEventListener("load", () => resolve(xhr.response));
      xhr.open("GET", targetUrl);
      if (requestCategory === 'cats') {
        // Our cats urls return binary payloads
        //  so we need to respond as such.
        xhr.responseType = "arraybuffer";
      }
      xhr.send();
    }))
    .pipe(
      switchMap((data) => mapFunc(xhr.response)),
      tap((data) => console.log('Request result: ', data))
    );
}


/**
 * This function will begin our 
 * polling for the given state, and
 * on the provided interval (d: RequestCategoryefaulting : numberto 5 seconds)
 */
function startPolling(category, interval = 2000) {
  // const url = category === 'cats' ? CATS_URL : MEATS_URL;
  // const mapper = category === 'cats' ? mapCats : mapMeats;
  console.log('category', category)
  const mapData = categoryMap.get(category);

  return timer(0, interval)
    .pipe(
      switchMap(_ => requestData(mapData.url, mapData.mapper))
    );
}

// Gather our DOM Elements to wire up events
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const text = document.getElementById('text');
const pollingStatus = document.getElementById('polling-status');
const catsRadio = document.getElementById('catsCheckbox');
const meatsRadio = document.getElementById('meatsCheckbox');
const cryptoRadio = document.getElementById('cryptoCheckbox');
const catsClick$ = fromEvent(catsRadio, 'click').pipe(mapTo('cats'));
const meatsClick$ = fromEvent(meatsRadio, 'click').pipe(mapTo('meats'));
const cryptoClick$ = fromEvent(cryptoRadio, 'click').pipe(mapTo('crypto'));
const catImage = document.getElementById('cat');

// Stop polling
let stopPolling$ = fromEvent(stopButton, 'click');

function updateDom(result) {
  if (requestCategory === 'cats') {
    catImage.src = result;
    console.log(catImage);
  } else if (requestCategory === 'meats') {
    text.innerHTML = result;

  } else if (requestCategory === 'crypto') {
    console.log('crypto in updateDom', result);
    // text.innerHTML = `BTC High: $${result}`;
    text.innerHTML = `BTC Circulation: ${result}`;
  }
}

function watchForData(category) {
  // Start  new Poll
  return startPolling(category, 2000).pipe(
    tap(updateDom),
    takeUntil(
      // stop polling on either button click or change of categories
      merge(
        stopPolling$,
        merge(catsClick$, meatsClick$, cryptoClick$)
        .pipe(filter(c => c !== category))
      )
    ),
    // for demo purposes only
    finalize(() => pollingStatus.innerHTML = 'Stopped')
  )
}

// Handle Form Updates
catsClick$
  .subscribe((category) => {
    requestCategory = category;
    catImage.style.display = 'block';
    text.style.display = 'none';
  });

meatsClick$
  .subscribe((category) => {
    requestCategory = category;
    catImage.style.display = 'none';
    text.style.display = 'block';
  });

cryptoClick$
  .subscribe((category) => {
    requestCategory = category;
    catImage.style.display = 'none';
    text.style.display = 'block';
  });

// Start Polling
fromEvent(startButton, 'click')
  .pipe(
    // for demo purposes only
    tap(_ => pollingStatus.innerHTML = 'Started'),
    mergeMap(_ => watchForData(requestCategory))
  )
  .subscribe();