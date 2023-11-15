const array1 = ['a', 'b', 'c'];

const iterator1 = array1.entries();

console.log(iterator1.next().value);
// Expected output: Array [0, "a"]

console.log(iterator1.next().value);
// Expected output: Array [1, "b"]


// for (const [index, element] of array1.entries()) {
//   console.log(index, element);
// }

let i = 0;
for (let item of array1) {
  console.log(item)
  if (i < 2) {
    array1[++i] = '1'
  }
}

console.log(array1)

const desc = `entries() 方法返回一个新的数组迭代器 (en-US)对象，该对象包含数组中每个索引的键/值对。`
