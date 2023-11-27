## 对象属性的类型

### 数据属性

+ 包含一个保存数据值的位置
+ 值会从这个位置读取，也会写入到这个位置



#### 数据属性的四个特性

**用于描述它们的行为**

+ `[[Configurable]]`
  + 属性是否可以通过 `delete` 删除并能重新定义
  + 属性是否可以修改它的特性
  + 属性是否可以把它改为访问器属性
  + 默认情况下，所有直接定义在对象上的属性这个特性都是 `true`
+ `[[Enumerable]]`
  + 属性是否可以通过 `for...in` 循环返回
  + 默认情况下，所有直接定义在对象的属性的这个特性都是 `true`
+ `[[Writable]]`
  + 属性的值是否可以被修改
  + 默认情况下，所有直接定义在对象的属性的这个特性都是 `true`
+ `[[Value]]`
  + 包含属性的实际值
  + 读取和写入属性值的位置
  + 这个特性的默认值是 `undefined`

**要修改属性的默认特性，就必须使用`Object.defineProperty()`方法**

```js
let person = {};
Object.defineProperty(person, "name", {
  // configurable、enumerable、writable和value
  writable: false,
  value: "Nicholas"
});
console.log(person.name); // "Nicholas"
person.name = "Greg";
console.log(person.name); // "Nicholas"
```

**一个属性被定义为不可配置之后，就不能再变回可配置的了。再次调用`Object.defineProperty()`并修改任何`非writable`属性会导致错误**

```js
let person = {};
Object.defineProperty(person, "name", {
  configurable: false,
  value: "Nicholas"
});
// 抛出错误
Object.defineProperty(person, "name", {
  configurable: true,
  value: "Nicholas"
});
```

**在调用`Object.defineProperty()`时，`configurable`、`enumerable`和`writable`的值如果不指定，则都默认为`false`**



### 访问器属性

**访问器属性不包含数据值**

+ `[[Get]]`：获取函数，在读取属性时调用，默认值为 `undefined`
+ `[[Set]]`：设置函数 ，在写入属性时调用，默认值为 `undefined`

```js
// 定义一个对象，包含伪私有成员year_和公共成员edition
let book = {
  year_: 2017,
  edition: 1
};
Object.defineProperty(book, "year", {
  get() {
    return this.year_;
  },
  set(newValue) {
    if (newValue > 2017) {
      this.year_ = newValue;
      this.edition += newValue -2017;
    }
  }
});
book.year = 2018;
console.log(book.edition); // 2
```

### 定义多个属性

使用`Object.defineProperties`定义属性时， 所有属性都是同时定义的，并且数据属性的`configurable`、`enumerable`和`writable`特性值都是false

```js
let book = {};
Object.defineProperties(book, {
  year_: {
    value: 2017
  },
  edition: {
    value: 1
  },
  year: {
    get() {
      return this.year_;
    },
    set(newValue) {
      if (newValue > 2017) {
        this.year_ = newValue;
        this.edition += newValue -2017;
      }
    }
  }
});
```



### 读取属性的特性

使用 `Object.getOwnPropertyDescriptor()` 可以获取指定属性的属性描述符

```js
let book = {};
Object.defineProperties(book, {
  year_: {
    value: 2017
  },
  edition: {
    value: 1
  },
  year: {
    get: function() {
      return this.year_;
    },
    set: function(newValue){
      if (newValue > 2017) {
        this.year_ = newValue;
        this.edition += newValue -2017;
      }
    }
  }
});
let descriptor = Object.getOwnPropertyDescriptor(book, "year_");
console.log(descriptor.value);             // 2017
console.log(descriptor.configurable);    // false
console.log(typeof descriptor.get);      // "undefined"
let descriptor = Object.getOwnPropertyDescriptor(book, "year");
console.log(descriptor.value);             // undefined
console.log(descriptor.enumerable);      // false
console.log(typeof descriptor.get);      // "function"
```

使用 `Object.getOwnPropertyDescriptors()` 会在每个自有属性上调用 `Object.getOwnPropertyDescriptors()` 并在一个新对象中返回它们

```js
let book = {};
Object.defineProperties(book, {
  year_: {
    value: 2017
  },
  edition: {
    value: 1
  },
  year: {
    get: function() {
      return this.year_;
    },
    set: function(newValue){
      if (newValue > 2017) {
        this.year_ = newValue;
        this.edition += newValue -2017;
      }
    }
  }
});
console.log(Object.getOwnPropertyDescriptors(book));
// {
//    edition: {
//      configurable: false,
//      enumerable: false,
//      value: 1,
//      writable: false
//    },
//    year: {
//      configurable: false,
//      enumerable: false,
//      get: f(),
//      set: f(newValue),
//    },
//    year_: {
//      configurable: false,
//      enumerable: false,
//      value: 2017,
//      writable: false
//    }
// }
```

### 合并对象

#### **使用 `Object.assign()`** 

+ 接收一个目标对象和一个或多个源对象作为参数

+ 然后将每个源对象中可枚举（Object.propertyIsEnumerable() 返回 `true`）以及自有（Object.hasOwnProperty() 返回 `true`）属性复制到目标对象
+ 这个方法会使用源对象上的`[[Get]]`取得属性的值，然后使用目标对象上的`[[Set]]`设置属性的值

```js
let dest, src, result;
/＊＊
  ＊ 简单复制
  ＊/
dest = {};
src = { id: 'src' };
result = Object.assign(dest, src);
// Object.assign修改目标对象
// 也会返回修改后的目标对象
console.log(dest === result); // true
console.log(dest ! == src);     // true
console.log(result);             // { id: src }
console.log(dest);               // { id: src }
/＊＊
  ＊ 多个源对象
  ＊/
dest = {};
result = Object.assign(dest, { a: 'foo' }, { b: 'bar' });
console.log(result); // { a: foo, b: bar }
/＊＊
  ＊ 获取函数与设置函数
  ＊/
dest = {
  set a(val) {
    console.log(`Invoked dest setter with param ${val}`);
  }
};
src = {
  get a() {
    console.log('Invoked src getter');
    return 'foo';
  }
};
Object.assign(dest, src);
// 调用src的获取方法
// 调用dest的设置方法并传入参数"foo"
// 因为这里的设置函数不执行赋值操作
// 所以实际上并没有把值转移过来
console.log(dest); // { set a(val) {...} }
```

`Object.assign()`实际上对每个源对象执行的是**浅复制**

如果多个源对象都有相同的属性，则使用最后一个复制的值

从源对象访问器属性取得的值，比如获取函数，会作为一个静态值赋给目标对象

```js
let dest, src, result;
/＊＊
  ＊ 覆盖属性
  ＊/
dest = { id: 'dest' };
result = Object.assign(dest, { id: 'src1', a: 'foo' }, { id: 'src2', b: 'bar' });
// Object.assign会覆盖重复的属性
console.log(result); // { id: src2, a: foo, b: bar }
// 可以通过目标对象上的设置函数观察到覆盖的过程：
dest = {
  set id(x) {
    console.log(x);
  }
};
Object.assign(dest, { id: 'first' }, { id: 'second' }, { id: 'third' });
// first
// second
// third
/＊＊
  ＊ 对象引用
  ＊/
dest = {};
src = { a: {} };
Object.assign(dest, src);
// 浅复制意味着只会复制对象的引用
console.log(dest);                  // { a :{} }
console.log(dest.a === src.a);   // true
```



如果赋值期间出错，则操作会中止并退出，同时抛出错误。`Object.assign()`没有“回滚”之前赋值的概念，因此它是一个**尽力而为、可能只会完成部分复制**的方法

```js
let dest, src, result;
/＊＊
  ＊ 错误处理
  ＊/
dest = {};
src = {
  a: 'foo',
  get b() {
    // Object.assign()在调用这个获取函数时会抛出错误
    throw new Error();
  },
  c: 'bar'
};
try {
  Object.assign(dest, src);
} catch(e) {}
// Object.assign()没办法回滚已经完成的修改
// 因此在抛出错误之前，目标对象上已经完成的修改会继续存在：
console.log(dest); // { a: foo }
```



### 对象标识及相等判定

在**ECMAScript 6**之前，有些特殊情况即使是`===`操作符也无能为力：

```js
// 这些是===符合预期的情况
console.log(true === 1);   // false
console.log({} === {});    // false
console.log("2" === 2);    // false
// 这些情况在不同JavaScript引擎中表现不同，但仍被认为相等
console.log(+0 === -0);    // true
console.log(+0 === 0);     // true
console.log(-0 === 0);     // true
// 要确定NaN的相等性，必须使用极为讨厌的isNaN()
console.log(NaN === NaN); // false
console.log(isNaN(NaN));   // true
```

**ECMAScript 6**规范新增了`Object.is()`，这个方法与`===`很像，但同时也考虑到了上述边界情形

```js
console.log(Object.is(true, 1));   // false
console.log(Object.is({}, {}));    // false
console.log(Object.is("2", 2));    // false
// 正确的0、-0、+0 相等/不等判定
console.log(Object.is(+0, -0));    // false
console.log(Object.is(+0, 0));     // true
console.log(Object.is(-0, 0));     // false
// 正确的NaN相等判定
console.log(Object.is(NaN, NaN)); // true
```

要检查超过两个值，递归地利用相等性传递即可

```js
function recursivelyCheckEqual (x, ...rest) {
	return Object.is(x, rest[0]) && (rest.length < 2 || recursivelyCheckEqual(...rest)) 
}
```

### 对象解构

+ 解构在内部使用函数 `ToObject()` （不能在运行时环境中直接访问）把源数据结构转换为对象
+ 这意味着在对象解构的上下文中，原始值会被当成对象
+ 所以，`null` 和 `undefined` 不能被解构，否则会抛出错误

```js
let { length } = 'foobar';
console.log(length);          // 6
let { constructor: c } = 4;
console.log(c === Number);   // true
let { _ } = null;              // TypeError
let { _ } = undefined;        // TypeError
```

解构并不要求变量必须在解构表达式中声明。不过，如果是给事先声明的变量赋值，则赋值表达式必须包含在一对括号中

```js
let personName, personAge;
let person = {
  name: 'Matt',
  age: 27
};
({name: personName, age: personAge} = person);
console.log(personName, personAge); // Matt, 27
```

#### 嵌套结构

```js
let person = {
  name: 'Matt',
  age: 27,
  job: {
    title: 'Software engineer'
  }
};
let personCopy = {};
({
  name: personCopy.name,
  age: personCopy.age,
  job: personCopy.job
} = person);
// 因为一个对象的引用被赋值给personCopy，所以修改
// person.job对象的属性也会影响personCopy
person.job.title = 'Hacker'
console.log(person);
// { name: 'Matt', age: 27, job: { title: 'Hacker' } }
console.log(personCopy);
// { name: 'Matt', age: 27, job: { title: 'Hacker' } }
```

```js
let person = {
  name: 'Matt',
  age: 27,
  job: {
    title: 'Software engineer'
  }
};
// 声明title变量并将person.job.title的值赋给它
let { job: { title } } = person;
console.log(title); // Software engineer
```

#### 部分解构

如果一个解构表达式涉及多个赋值，开始的赋值成功而后面的赋值出错，则整个解构赋值只会完成一部分

```js
let person = {
  name: 'Matt',
  age: 27
};
let personName, personBar, personAge;
try {
  // person.foo是undefined，因此会抛出错误
  ({name: personName, foo: { bar: personBar }, age: personAge} = person);
} catch(e) {}
console.log(personName, personBar, personAge);
// Matt, undefined, undefined
```

#### 参数上下文

对参数的解构赋值不会影响`arguments`对象，但**可以在函数签名中声明在函数体内使用局部变量**

```js
let person = {
  name: 'Matt',
  age: 27
};
function printPerson(foo, {name, age}, bar) {
  console.log(arguments);
  console.log(name, age);
}
function printPerson2(foo, {name: personName, age: personAge}, bar) {
  console.log(arguments);
  console.log(personName, personAge);
}
printPerson('1st', person, '2nd');
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27
printPerson2('1st', person, '2nd');
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27
```



## 创建对象

### 工厂模式

```js
function createPerson(name, age, job) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log(this.name);
  };
  return o;
}
let person1 = createPerson("Nicholas", 29, "Software Engineer");
let person2 = createPerson("Greg", 27, "Doctor");
```

### 构造函数模式

**ECMAScript**中的构造函数是用于创建特定类型对象的

```js
function Person(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log(this.name);
  };
}
let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");
person1.sayName();   // Nicholas
person2.sayName();   // Greg
```

要创建 `Person` 实例，应使用 `new` 操作符。将会执行以下操作：

+ 在内存中创建一个新对象
+ 在这个新对象内部的`[[Prototype]]` 特性被赋值为构造函数的 `prototype` 属性
+ 构造函数内部的 `this` 被赋值为这个新对象（即 `this` 指向新对象）
+ 执行构造函数内部的代码（给新对象添加属性）
+ 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象

```js
console.log(person1.constructor == Person);   // true
console.log(person2.constructor == Person);   // true
```

```js
console.log(person1 instanceof Object);   // true
console.log(person1 instanceof Person);   // true
console.log(person2 instanceof Object);   // true
console.log(person2 instanceof Person);   // true
```

### isPrototypeOf()

```js
console.log(Person.prototype.isPrototypeOf(person1));   // true
console.log(Person.prototype.isPrototypeOf(person2));   // true
```

### Object.getPrototypeOf()

```js
console.log(Object.getPrototypeOf(person1) == Person.prototype);
console.log(Object.getPrototypeOf(person1).name);
```

### Object.setPrototypeOf()

```js
let biped = {
  numLegs: 2
};
let person = {
  name: 'Matt'
};
Object.setPrototypeOf(person, biped);
console.log(person.name);                                      // Matt
console.log(person.numLegs);                                  // 2
console.log(Object.getPrototypeOf(person) === biped);   // true
```

**警告 Object.setPrototypeOf()可能会严重影响代码性能**

**不仅是执行`Object.setPrototypeOf()`语句那么简单，而是会涉及所有访问了那些修改过`[[Prototype]]`的对象的代码**

为避免使用`Object.setPrototypeOf()`可能造成的性能下降，可以通过`Object.create()`来创建一个新对象，同时为其指定原型



### 原型的动态性

```js
let friend = new Person();
Person.prototype.sayHi = function() {
  console.log("hi");
};
friend.sayHi();    // "hi"，没问题！
```

虽然随时能给原型添加属性和方法，并能够立即反映在所有对象实例上，但这跟重写整个原型是两回事
实例的`[[Prototype]]`指针是在调用构造函数时自动赋值的，这个指针即使把原型修改为不同的对象也不会变

**实例只有指向原型的指针，没有指向构造函数的指针**

```js
function Person() {}
let friend = new Person();
Person.prototype = {
  constructor: Person,
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName() {
    console.log(this.name);
  }
};
friend.sayName();   // 错误
```





## 继承

### 原型和继承的关系

原型与实例的关系可以通过两种方式来确定

+ `instanceof`

  ```js
  console.log(instance instanceof Object);      // true
  console.log(instance instanceof SuperType);   // true
  console.log(instance instanceof SubType);     // true
  ```

+ `isPrototypeOf()`

  ```js
  console.log(Object.prototype.isPrototypeOf(instance));      // true
  console.log(SuperType.prototype.isPrototypeOf(instance));   // true
  console.log(SubType.prototype.isPrototypeOf(instance));     // true
  ```

### 原型链

```js
function SuperType() {
  this.property = true;
}
SuperType.prototype.getSuperValue = function() {
  return this.property;
};
function SubType() {
  this.subproperty = false;
}
// 继承SuperType
SubType.prototype = new SuperType();
//通过对象字面量添加新方法，这会导致上一行无效
SubType.prototype={
  getSubValue(){
    returnthis.subproperty;
  },
  someOtherMethod(){
    returnfalse;
  }
};
let instance = new SubType();
console.log(instance.getSuperValue());//出错！
```

### 盗用构造函数

```js
function SuperType() {
  this.colors = ["red", "blue", "green"];
}
function SubType() {
  //继承SuperType
  SuperType.call(this);
}
let instance1 = new SubType();
instance1.colors.push("black");
console.log(instance1.colors); // "red, blue, green, black"
let instance2 = new SubType();
console.log(instance2.colors); // "red, blue, green"
```

相比于使用原型链，盗用构造函数的一个优点就是可以在子类构造函数中向父类构造函数**传参**

```js
function SuperType(name){
  this.name = name;
}
function SubType() {
  // 继承SuperType并传参
  SuperType.call(this, "Nicholas");
  // 实例属性
  this.age = 29;
}
let instance = new SubType();
console.log(instance.name); // "Nicholas";
console.log(instance.age);   // 29
```

盗用构造函数的主要缺点，也是使用构造函数模式自定义类型的问题：**必须在构造函数中定义方法**，因此函数不能重用。此外，**子类也不能访问父类原型上定义的方法**，因此所有类型只能使用构造函数模式。由于存在这些问题，**盗用构造函数基本上也不能单独使用**

### 组合继承

**原型链 + 盗用构造函数 = 组合继承**

```js
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
  console.log(this.name);
};
function SubType(name, age){
  // 继承属性
  SuperType.call(this, name);
  this.age = age;
}
// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function() {
  console.log(this.age);
};
let instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors);   // "red, blue, green, black"
instance1.sayName();               // "Nicholas";
instance1.sayAge();                // 29
let instance2 = new SubType("Greg", 27);
console.log(instance2.colors);   // "red, blue, green"
instance2.sayName();               // "Greg";
instance2.sayAge();                // 27
```

组合继承弥补了原型链和盗用构造函数的不足

是`JavaScript`中使用最多的继承模式

组合继承也保留了`instanceof`操作符和`isPrototypeOf()`方法识别合成对象的能力



### 原型式继承

```js
function object (o) {
	function F () {}
  F.prototype = o
  return new F()
}
```

在只有一个参数时，`Object.create()`与这里的`object()`方法效果相同

```js
let person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
let yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
console.log(person.friends);   // "Shelby,Court,Van,Rob,Barbie"
```

`Object.create()`的第二个参数与`Object.defineProperties()`的第二个参数一样：每个新增属性都通过各自的描述符来描述。以这种方式添加的属性会遮蔽原型对象上的同名属性

```js
let person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = Object.create(person, {
  name: {
    value: "Greg"
  }
});
console.log(anotherPerson.name);   // "Greg"
```

### 寄生式继承

```js
function createAnother(original){
  let clone = Object.create(original);   // 通过调用函数创建一个新对象
  clone.sayHi = function() {      // 以某种方式增强这个对象
    console.log("hi");
  };
  return clone;              // 返回这个对象
}

let person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = createAnother(person);
anotherPerson.sayHi();   // "hi"
```



### 寄生式组合继承

回顾一下**组合继承**

```js
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
  console.log(this.name);
};
function SubType(name, age){
  SuperType.call(this, name);   //第二次调用SuperType()
  this.age = age;
}
SubType.prototype=newSuperType();   //第一次调用SuperType()
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
  console.log(this.age);
};
```

**寄生式组合继承**

```js
function inheritPrototype(subType, superType) {
  let prototype = Object.create(superType.prototype);   // 创建对象
  prototype.constructor = subType;                  // 增强对象
  subType.prototype = prototype;                    // 赋值对象
}

function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
  console.log(this.name);
};
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function() {
  console.log(this.age);
};
```

这里只调用了一次`SuperType`**构造函数**，避免了`SubType.prototype`上不必要也用不到的属性.

**原型链仍然保持不变**，因此`instanceof`操作符和`isPrototypeOf()`方法正常有效.

原型链仍然保持不变，因此instanceof操作符和isPrototypeOf()方法正常有效

**寄生式组合继承可以算是引用类型继承的最佳模式**



## 类

```js
class Person {
  constructor(override) {
    this.foo = 'foo';
    if (override) {
      return {
        bar: 'bar'
      };
    }
  }
}
let p1 = new Person(),
    p2 = new Person(true);
console.log(p1);                         // Person{ foo: 'foo' }
console.log(p1 instanceof Person);   // true
console.log(p2);                         // { bar: 'bar' }
console.log(p2 instanceof Person);   // false
```

默认情况下，类构造函数会在执行之后返回`this`对象

如果返回的不是`this`对象，而是其他对象，那么这个对象**不会通过**`instanceof`操作符检测出跟类有关联，因为这个对象的原型指针并没有被修改

类构造函数与构造函数的主要区别是，调用类构造函数必须使用`new`操作符

类构造函数没有什么特殊之处，实例化之后，它会成为普通的实例方法（但作为类构造函数，仍然要使用`new`调用）

```js
class Person {}
console.log(Person);           // class Person {}
console.log(typeof Person);   // function
```



**ECMAScript类就是一种特殊函数**

```js
class Person {}
console.log(Person);           // class Person {}
console.log(typeof Person);   // function
```



**类标识符有prototype属性**

```js
class Person{}
console.log(Person.prototype);                               // { constructor: f() }
console.log(Person === Person.prototype.constructor);   // true
```

**可以使用 `instanceof`**

```js
class Person {}
let p = new Person();
console.log(p instanceof Person); // true
```

```js
class Person {}
let p1 = new Person();
console.log(p1.constructor === Person);           // true
console.log(p1 instanceof Person);                  // true
console.log(p1 instanceof Person.constructor);   // false
let p2 = new Person.constructor();
console.log(p2.constructor === Person);           // false
console.log(p2 instanceof Person);                  // false
console.log(p2 instanceof Person.constructor);   // true

console.log(p2 instanceof Function) // true
```



### 实例、原型、类成员

```js
class Person {
  constructor() {
    // 添加到this的所有内容都会存在于不同的实例上
    this.locate = () => console.log('instance', this);
  }
  // 定义在类的原型对象上
  locate() {
    console.log('prototype', this);
  }
  //定义在类本身上
  static locate(){
    console.log('class', this);
  }
}
let p = new Person();
p.locate();                     // instance, Person {}
Person.prototype.locate();   // prototype, {constructor: ... }
Person.locat e();               // class, class Person {}
```

**静态类方法非常适合作为实例工厂**

```js
class Person {
  constructor(age) {
    this.age_ = age;
  }
  sayAge() {
    console.log(this.age_);
  }
  static create() {
    // 使用随机年龄创建并返回一个Person实例
    return new Person(Math.floor(Math.random()＊100));
  }
}
console.log(Person.create()); // Person { age_: ... }
```



在静态方法中可以通过`super`调用继承的类上定义的静态方法

```js
class Vehicle {
  static identify() {
    console.log('vehicle');
  }
}
class Bus extends Vehicle {
  static identify() {
    super.identify();
  }
}
Bus.identify();   // vehicle
```

`super`只能在派生类构造函数和静态方法中使用

 不能单独引用`super`关键字，要么用它调用构造函数，要么用它引用静态方法。

```js
class Vehicle {}
class Bus extends Vehicle {
  constructor() {
    console.log(super);
    // SyntaxError: 'super' keyword unexpected here
  }
}
```

调用`super()`会调用父类构造函数，并将返回的实例赋值给`this`

`super()`的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入

```js
class Vehicle {
  constructor(licensePlate) {
    this.licensePlate = licensePlate;
  }
}
class Bus extends Vehicle {
  constructor(licensePlate) {
    super(licensePlate);
  }
}
console.log(new Bus('1337H4X')); // Bus { licensePlate: '1337H4X' }
```

如果没有定义类构造函数，在实例化派生类时会调用`super()`，而且**会传入所有传给派生类的参数**

在类构造函数中，不能在调用`super()`之前引用`this`

```js
class Vehicle {}
class Bus extends Vehicle {
  constructor() {
    console.log(this);
  }
}
new Bus();
// ReferenceError: Must call super constructor in derived class
// before accessing 'this' or returning from derived constructor
```

如果在派生类中显式定义了构造函数，则要么必须在其中调用`super()`，要么必须在其中返回一个对象

```js
class Vehicle {}
class Car extends Vehicle {}
class Bus extends Vehicle {
  constructor() {
    super();
  }
}
class Van extends Vehicle {
  constructor() {
    return {};
  }
}
console.log(new Car());   // Car {}
console.log(new Bus());   // Bus {}
console.log(new Van());   // {}
```

### 抽象基类

```js
// 抽象基类
class Vehicle {
  constructor() {
    console.log(new.target);
    if (new.target === Vehicle) {
      throw new Error('Vehicle cannot be directly instantiated');
    }
  }
}
// 派生类
class Bus extends Vehicle {}
new Bus();         // class Bus {}
new Vehicle();    // class Vehicle {}
// Error: Vehicle cannot be directly instantiated
```

**通过在抽象基类构造函数中进行检查**，可以要求派生类必须定义某个方法

**因为原型方法在调用类构造函数之前就已经存在了**,

**所以可以通过`this`关键字来检查相应的方法**

```js
// 抽象基类
class Vehicle {
  constructor() {
    if (new.target === Vehicle) {
      throw new Error('Vehicle cannot be directly instantiated');
    }
    if (! this.foo) {
      throw new Error('Inheriting class must define foo()');
    }
    console.log('success! ');
  }
}
// 派生类
class Bus extends Vehicle {
  foo() {}
}
// 派生类
class Van extends Vehicle {}
new Bus(); // success!
new Van(); // Error: Inheriting class must define foo()
```



### 继承内置类型

```js
class SuperArray extends Array {
  shuffle() {
    // 洗牌算法
    for (let i = this.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() ＊ (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
  }
}
let a = new SuperArray(1, 2, 3, 4, 5);
console.log(a instanceof Array);         // true
console.log(a instanceof SuperArray);   // true
console.log(a);   // [1, 2, 3, 4, 5]
a.shuffle();
console.log(a);   // [3, 1, 4, 5, 2]
```

有些内置类型的方法会返回新实例。默认情况下，返回实例的类型与原始实例的类型是一致的

```js
class SuperArray extends Array {}
let a1 = new SuperArray(1, 2, 3, 4, 5);
let a2 = a1.filter(x => ! ! (x%2))
console.log(a1);   // [1, 2, 3, 4, 5]
console.log(a2);   // [1, 3, 5]
console.log(a1 instanceof SuperArray);   // true
console.log(a2 instanceof SuperArray);   // true
```

如果想覆盖这个默认行为，则可以覆盖`Symbol.species`访问器，这个访问器决定在创建返回的实例时使用的类

```js
class SuperArray extends Array {
  static get[Symbol.species](){
    return Array;
  }
}
let a1 = new SuperArray(1, 2, 3, 4, 5);
let a2 = a1.filter(x => ! ! (x%2))
console.log(a1);   // [1, 2, 3, 4, 5]
console.log(a2);   // [1, 3, 5]
console.log(a1 instanceof SuperArray);   // true
console.log(a2instanceofSuperArray);  //false
```



### 类混入

`Object.assign()`方法是为了混入对象行为而设计的

只有在需要混入类的行为时才有必要自己实现混入表达式。如果只是需要混入多个对象的属性，那么使用`Object.assign()`就可以了

```js
class Vehicle {}
function getParentClass() {
  console.log('evaluated expression');
  return Vehicle;
}
class Bus extends getParentClass(){}
// 可求值的表达式
```

很多`JavaScript`框架（特别是**React**）已经抛弃混入模式，转向了组合模式（**把方法提取到独立的类和辅助对象中，然后把它们组合起来，但不使用继承**）。这反映了那个众所周知的软件设计原则：“**组合胜过继承**（**composition over inheritance**）。”这个设计原则被很多人遵循，在代码设计中能提供极大的灵活性

## 总结

+ `JavaScript`的继承主要通过原型链来实现
+ 原型链的问题是所有继承的属性和方法都会在对象实例间共享，无法做到实例私有
+ 盗用构造函数模式通过在子类构造函数中调用父类构造函数，可以避免这个问题
+ 但要求类型只能通过构造函数模式来定义，但要求类型只能通过构造函数模式来定义
+ 组合继承，即通过原型链继承共享的属性和方法，通过盗用构造函数继承实例属性
+ 原型式继承可以无须明确定义构造函数而实现继承，**本质上是对给定对象执行浅复制**
+ 寄生式继承，即先基于一个对象创建一个新对象，**然后再增强这个新对象**，最后返回新对象。这个模式也被用在组合继承中，**用于避免重复调用父类构造函数导致的浪费**
+ **寄生组合继承**被认为是实现基于类型继承的最有效方式
+ **类很大程度上是基于既有原型机制的语法糖**
+ **类有效地跨越了对象实例、对象原型和对象类之间的鸿沟**

