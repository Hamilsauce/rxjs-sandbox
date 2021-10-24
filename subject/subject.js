console.clear();
const { BehaviorSubject, fromEvent, interval, merge } = rxjs;
const { map, filter, concatMap, switchMap, tap, mergeMap } = rxjs.operators;
const month = document.querySelector('.calendar-body')

const setElementText = (elemId, text) => {
  const els = [...document.querySelectorAll('.calendar-day')]
  els.forEach(el => {
    el.querySelector('.day-body').innerText = text.toString();
    el.style.backgroundColor = `rgb(${(Math.random() * 255) - (Math.random())},${(Math.random() * 100) + 100},${(Math.random() * 100) + 100})`;
  })

};
const colorModifier = {
  modifier: 100,
  direction: 'desc'
};

const calculateColorModifier = () => {
  // let { modifier, direction } = colorModifier;
  if (colorModifier.direction === 'desc') --colorModifier.modifier
  else if (colorModifier.direction === 'asc') ++colorModifier.modifier

  if (colorModifier.modifier === 0) colorModifier.direction = 'asc'
  else if (colorModifier.modifier === 100) colorModifier.direction = 'desc'
  // colorModifier = { modifier, direction };
  // return { modifier, direction };
};

const addHtmlElement = coords => {
  const size = (Math.random() * 1) + 30;
  const rgb = `${(+Math.random() * 100).toFixed(0)},${(Math.round((Math.random() * 2)) * 2.5) + (colorModifier.modifier)},${(+Math.random().toFixed(0) * 1) + colorModifier.modifier})`
// const colorModifier = calculateColorModifier()
document.querySelector('.app-header').innerHTML =rgb
 console.log('rgb', rgb);
// `rgb(Math.random() * 100).toFixed(0) + colorModifier.modifier},${(Math.random() * 10).toFixed(0) + (colorModifier.modifier)},${(Math.random() * 10).toFixed(0) + colorModifier.modifier})`;
  month.innerHTML += `
  <div y
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
      background: ${rgb};
      border-radius: 80%;"
    >
  </div>`;

}

const clickBhs = new BehaviorSubject(0);

const click$ = fromEvent(document, 'click')
  .pipe(
    tap(x => console.log('click', x.target.className)),
    filter(e => ['calendar-day', 'day-body', 'day-header'].includes(e.target.className)),

    // e.target.classList.contains('calendar-month')),
    map((e) => ({
      x: e.clientX,
      y: e.clientY,
      id: Math.random()
    })),
    tap(addHtmlElement),
    mergeMap(coords =>
      clickBhs.pipe(
        tap(v => setElementText(coords.id, v))
      )
    )
  );

const interval$ = interval((Math.random() * 1000)).pipe(
  tap(v => clickBhs.next(v)),
  switchMap(q => {
    return click$.pipe(
      switchMap(c => interval((Math.random()))
        .pipe(
          tap(x => setElementText('calendar-month-display', c))
        )),
    )
  })

).subscribe()

// merge(click$, interval$).subscribe();