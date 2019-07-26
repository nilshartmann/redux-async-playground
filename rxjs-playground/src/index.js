console.log("huhuhuhuuh");
const { of, interval } = require("rxjs");
const { map, mergeMap, merge } = require("rxjs/operators");

const letters = of("a", "b", "c");
// const result = letters.pipe(mergeMap(x => interval(1000).pipe(map(i => x + i))));
// const result = letters.pipe(map(x => x + "fck-yu"));

const result = interval(1000).pipe(
  merge(
    mergeMap(zzzz =>
      letters.pipe(
        map(y => {
          console.log("y", y, zzzz);
          return y + "XXXX";
        }),
        map(x => x + "___")
      )
    )
  )
);
console.log(result);
// const result = letters.pipe(x => interval(1000)).map(i => x + i);
result.subscribe(x => console.log(JSON.stringify(x)));
