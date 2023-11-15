const array1 = [1, 2, 3, 4, 5]
const iterator1 = array1[Symbol.iterator]()
console.log(...iterator1)
console.log(...array1.entries())

for (const [index, element] of array1.entries()) {
  console.log(index, element)
}


const desc = `Array 实例的 [@@iterator]() 方法实现了迭代协议，允许数组被大多数期望可迭代对象的语法所使用，例如展开语法和 for...of 循环。它返回一个数组迭代器对象 (en-US)，该对象会产生数组中每个索引的值。`
