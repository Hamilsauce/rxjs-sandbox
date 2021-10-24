console.clear();
const { BehaviorSubject, fromEvent, interval, merge } = rxjs;
const { map, filter, concatMap, switchMap, tap, mergeMap } = rxjs.operators;
const app = document.querySelector('.app')
const items = [...document.querySelectorAll('.app')]

const clickBhs = new BehaviorSubject(0);

const click$ = fromEvent(app, 'click')
  .pipe(
    tap(x => console.log('click', x.target.className)),
    filter(e => ['item'].includes(e.target.className)),

    // e.target.classList.contains('calendar-month')),
    map((e) => {
      console.log(e.target.dataset.item);

    }),
    // tap(addHtmlElement),
    // mergeMap(coords =>
    // clickBhs.pipe(
    // tap(v => setElementText(coords.id, v))
    // )
  ).subscribe(clickBhs)

const itemComps = items
  .map(item => {
    return {
      el: item,
      subscription() { clickBhs.subscribe(x => console.log('x', x)) }
    }
  })
  
  itemComps.forEach(item => {
    item.subscription()
  })