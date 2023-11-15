const array1 = ['a', 'b', 'c'];
const iterator = array1.values();

console.log(...iterator)
console.log(iterator)

for (const value of iterator) {
  console.log(1)
  console.log(value);
}
