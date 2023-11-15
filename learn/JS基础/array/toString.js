const array1 = [1, 2, 'a', '1a'];

console.log(array1.toString());
// Expected output: "1,2,a,1a"

`Array 对象覆盖了 Object 的 toString 方法。数组的 toString 方法实际上在内部调用了 join() 方法来拼接数组并返回一个包含所有数组元素的字符串，元素之间用逗号分隔。如果 join 方法不可用或者不是函数，则会使用 Object.prototype.toString 来代替，并返回 [object Array]。`