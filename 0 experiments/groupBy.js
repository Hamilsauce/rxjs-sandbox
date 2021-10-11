const { of , interval, from, subscribe } = rxjs;
const { groupBy, toArray, concatMap, switchMap, mergeMap, map, tap } = rxjs.operators;

const data = [
  { groupId: "QA", value: 1 },
  { groupId: "Development", value: 3 },
  { groupId: "QA", value: 5 },
  { groupId: "Development", value: 6 },
  { groupId: "QA", value: 2 },
];

from(data).pipe(
    groupBy(item => item.groupId),
    mergeMap(x => x.pipe(
      map(x => x),
      // toArray(),
      tap(x => console.log('in inner pipe', x))

    )),
  )
  .subscribe(x => console.log('result in subscr', x));