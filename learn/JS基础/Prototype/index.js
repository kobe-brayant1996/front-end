// function Person () {
//   this.hand = 2;
//   this.leg = 2;
//   this.eat = () => {
//     console.log(this)
//     console.log('I can eat')
//   }
// }

// function XiaoMing () {
//   Person.call(this)
// }

// const xm = new XiaoMing ()

// console.log(xm)

// console.log(xm.hand)
// xm.eat()

// const p = new Person ();
// console.log(p)
// p.eat()

// p.hand = 3
// console.log(xm)
// console.log(p)
// console.log(new Person())

/**
 * 当你使用 new 关键字和构造函数 创建一个新的实例的时候， js会执行以下步骤
 * 1）创建新对象
 *    JavaScript 首先会创建一个新的空对象
 * 2）设置原型
 *    新对象内部的 [[Prototype]] 也就是 __proto__ 指针会被设置为构造函数的 prototype 属性, 这意味着新对象将继承函数原型上的方法和属性
 * 3）执行构造函数
 *    构造函数被调用，并且 this 关键字会被指向新创建的对象，如果构造函数中有属性或方法定义，他们会被添加到 this 上，也就是新对象上
 * 4）返回对象
 *    在构造函数执行完毕之后，如果没有其他对象被返回，那么新创建的对象 p 会被返回
 */
