
const randInt = (max) => Math.floor(Math.random() * max);

const add5 = (callback, x) => {
  setTimeout(callback, randInt(1000), x + 5);
};
const mult3 = (callback, x) => {
  setTimeout(callback, randInt(1000), x * 3);
};
const sub2 = (callback, x) => {
  setTimeout(callback, randInt(1000), x - 2);
};

[add5, mult3, sub2].reduceRight((computation, fn) => {
  return (result) => {
    console.log('result', result)
    return fn(computation, result)
  }
}, console.log)(5)

