function* test () {
  let num1 = 0;
  let num2 = 1;

  while (true) {
    const  current = num1;
    num1 = num2;
    num2 = current + num1;

    console.log('current', current);

    const reset = yield current;

    console.log('reset', reset)
    
    if (reset) {
      num1 = 0;
      num2 = 1;
    }
  }
}

let gen = test();

console.log(gen.next())
console.log(gen.next())
console.log(gen.next())
console.log(gen.next(true))

const strings = ["10", "10", "100000"];
const numbers = strings.map(parseInt);

console.log(numbers);
