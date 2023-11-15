


const derc = `toSpliced() 方法与 splice() 类似，可以同时完成多个操作：在数组中给定的索引开始移除指定数量的元素，然后在相同的索引处插入给定的元素。但是，它返回一个新数组，而不是修改原始数组。因此，此方法不会返回已删除的元素。`


const months = ["Jan", "Mar", "Apr", "May"];

// 在索引 1 处添加一个元素
const months2 = months.toSpliced(1, 0, "Feb");
console.log(months2); // ["Jan", "Feb", "Mar", "Apr", "May"]

// 从第 2 个索引开始删除两个元素
const months3 = months2.toSpliced(2, 2);
console.log(months3); // ["Jan", "Feb", "May"]

// 在索引 1 处用两个新元素替换一个元素
const months4 = months3.toSpliced(1, 1, "Feb", "Mar");
console.log(months4); // ["Jan", "Feb", "Mar", "May"]

// 原数组不会被修改
console.log(months); // ["Jan", "Mar", "Apr", "May"]

const arrayLike = {
length: 3,
unrelated: "foo",
0: 5,
2: 4,
};
console.log(Array.prototype.toSpliced.call(arrayLike, 0, 1, 2, 3));
// [2, 3, undefined, 4]

 
