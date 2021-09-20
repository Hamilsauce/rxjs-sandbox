const { Observable, from, of , range, interval, fromEvent, subscribe } = rxjs;
const { bufferWhen, filter, map, tap, take } = rxjs.operators;

const button = document.querySelector('.button');

const button$ = from(fromEvent(button, "click"))

button$.pipe(
  // bufferWhen((x) => {
  //   console.log('bufferWhen', x)
  //   return x
  // }),
  map(x => {
    console.log('in pipe map', x);
  })
  // tap(() => console.log('suck my vutt'))
).subscribe(_ => console.log('subscribe', _))



const obs = interval(1000)
  .pipe(
    take(6),
    tap(i => console.log("obs value " + i))
  );




// button$.subscribe(value => {
//   console.log('in subscribe', value)
// })


// obs.subscribe(value => console.log("observer 1 received " + value));

// obs.subscribe(value => console.log("observer 2 received " + value));