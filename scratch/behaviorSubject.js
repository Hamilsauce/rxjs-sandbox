console.clear();
const { BehaviorSubject, fromEvent, interval, merge } = rxjs;
const { map, concatMap, switchMap, tap, mergeMap } = rxjs.operators;

const setElementText = (elemId, text) => {
  const el = document.getElementById(elemId)
  el.innerText = text.toString();
  el.style.backgroundColor = `rgb(${(Math.random() * 100) + 100},${(Math.random() * 100) + 100},${(Math.random() * 100) + 100})`;
};

const addHtmlElement = coords => {
  const size = (Math.random() * 100) + 30;
  document.body.innerHTML += `
  <div 
    id=${coords.id}
    style="
      position: absolute;
      display:flex;
      flex-direction:row;
      justify-content:center;
      align-items:center;
      gap:0px;
      
      height:${size}px;
      width: ${size}px;
      text-align: center;
      top: ${coords.y}px;
      left: ${coords.x}px;
      color: #fff;
      transition: 1s;
      background: rgb(${(Math.random() * 100) + 100},${(Math.random() * 100) + 100},${(Math.random() * 100) + 100});
      border-radius: 80%;"
    >
  </div>`;

}

const bhSubject = new BehaviorSubject(0);

const click$ = fromEvent(document, 'click')
  .pipe(
    map((e) => ({
      x: e.clientX,
      y: e.clientY,
      id: Math.random()
    })),
    tap(addHtmlElement),
    mergeMap(coords =>
      bhSubject.pipe(
        tap(v => setElementText(coords.id, v))
      )
    )
  );

const interval$ = interval((Math.random() * 100) + 500).pipe(
  tap(v => bhSubject.next(v)),
  concatMap(q => {
    return click$.pipe(
      mergeMap(c => interval((Math.random() * 100) + 20)
      .pipe(
        tap(x => setElementText('intervalValue', c))
      )),
    )
  })

).subscribe()

// merge(click$, interval$).subscribe();