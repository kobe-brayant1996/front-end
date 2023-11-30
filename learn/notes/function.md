## 函数

+ 函数实际上是对象
+ 每个函数都是 `Function` 类型的实例，而 `Function` 也有属性和方法
+ 因为函数是一个对象，所以函数名就是指向函数对象的指针



## 函数名

+ 函数名就是指向函数的指针，所以它们跟其他包含对象指针的变量具有相同的行为

  ```js
  function sum(num1, num2) {
    return num1 + num2;
  }
  console.log(sum(10, 10));           // 20
  let anotherSum = sum;
  console.log(anotherSum(10, 10));   // 20
  sum = null;
  console.log(anotherSum(10, 10));   // 20
  ```

  把`sum`设置为`null`之后，就切断了它与函数之间的关联。而`anotherSum()`还是可以照常调用

+ `ECMAScript 6`的所有函数对象都会暴露一个**只读**的`name`属性

  ```js
  function foo() {}
  let bar = function() {};
  let baz = () => {};
  console.log(foo.name);                   // foo
  console.log(bar.name);                   // bar
  console.log(baz.name);                   // baz
  console.log((() => {}).name);          //（空字符串）
  console.log((new Function()).name);   // anonymous
  ```

  如果函数是一个获取函数、设置函数，或者使用`bind()`实例化，那么标识符前面会加上一个前缀

  ```js
  function foo() {}
  console.log(foo.bind(null).name);     // bound foo
  let dog = {
    years: 1,
    get age() {
      return this.years;
    },
    set age(newAge) {
      this.years = newAge;
    }
  }
  let propertyDescriptor = Object.getOwnPropertyDescriptor(dog, 'age');
  console.log(propertyDescriptor.get.name);   // get age
  console.log(propertyDescriptor.set.name);   // set age
  ```

## `arguments`

+ 严格模式下，`arguments`会有一些变化
  + 给`arguments[1]`赋值不会再影响`num2`的值，把arguments[1]设置为10, num2的值仍然还是传入的值
  + 在函数中尝试重写`arguments`对象会导致语法错误
+ 箭头函数中没有`arguments`对象
+ 如果把对象作为参数传递，那么传递的值就是这个对象的引用



## 没有重载

+ 如果在`ECMAScript`中定义了两个同名函数，则后定义的会覆盖先定义的
+ 可以通过检查参数的类型和数量，然后分别执行不同的逻辑来**模拟函数重载**


## 默认参数值

+ 函数的默认参数只有**在函数被调用时**才会求值，不会在函数定义时求值
+ 计算默认值的函数只有在调用函数但未传相应参数时才会被调用

**在求值默认参数时可以定义对象，也可以动态调用函数，所以函数参数肯定是在某个作用域中求值的**

**给多个参数定义默认值实际上跟使用`let`关键字顺序声明变量一样**

**参数初始化顺序遵循“暂时性死区”规则**



## 扩展参数

```js
let values = [1, 2, 3, 4];
function getSum() {
  let sum = 0;
  for (let i = 0; i < arguments.length; ++i) {
    sum += arguments[i];
  }
  return sum;
}
console.log(getSum.apply(null, values)); // 10
```

```js
console.log(getSum(...values)); // 10
```

## 收集参数

+ 在构思函数定义时，可以使用扩展操作符把不同长度的独立参数组合为一个数组
+ 收集参数的前面如果还有命名参数，则只会收集其余的参数
+ 箭头函数虽然不支持`arguments`对象，但支持收集参数的定义方式，因此也可以实现与使用`arguments`一样的逻辑



## 函数内部

### `arguments`

+ 类数组对象

+ `arguments.callee` 指向`arguments`对象所在函数的指针

  ```js
  function factorial(num) {
    if (num <= 1) {
      return 1;
    } else {
      returnnum＊arguments.callee(num-1);
    }
  }
  ```

### `this`

+ 在标准函数中，`this`引用的是把函数当成方法调用的上下文对象

  ```js
  window.color = 'red';
  let o = {
    color: 'blue'
  };
  function sayColor() {
    console.log(this.color);
  }
  sayColor();     // 'red'
  o.sayColor = sayColor;
  o.sayColor();   // 'blue'
  ```

+ 在箭头函数中，`this`引用的是定义箭头函数的上下文

  ```js
  window.color = 'red';
  let o = {
    color: 'blue'
  };
  let sayColor = () => console.log(this.color);
  sayColor();     // 'red'
  o.sayColor = sayColor;
  o.sayColor();   // 'red'
  ```

函数名只是保存指针的变量。因此全局定义的`sayColor()`函数和`o.sayColor()`是**同一个函数**，只不过**执行的上下文不同**



### `caller`

+ 这个属性引用的是调用当前函数的函数，或者如果是在全局作用域中调用的则为`null`

  ```js
  function outer() {
    inner();
  }
  function inner() {
    console.log(inner.caller);
  }
  outer();
  ```

  ```js
  function outer() {
    inner();
  }
  function inner() {
    console.log(arguments.callee.caller);
  }
  outer();
  ```

+ 在**严格模式**下访问`arguments.callee`会报错

+ **严格模式**下还有一个限制，就是不能给函数的`caller`属性赋值



### `new.target`

`ECMAScript`中的函数始终可以作为构造函数实例化一个新对象，也可以作为普通函数被调用

+ 检测函数是否使用`new`关键字调用的`new.target`属性

+ 如果函数是正常调用的，则`new.target`的值是`undefined`

+ 如果是使用`new`关键字调用的，则`new.target`将引用**被调用的构造函数**

  ```js
  function King() {
    if (! new.target) {
      throw 'King must be instantiated using "new"'
    }
    console.log('King instantiated using "new"');
  }
  new King(); // King instantiated using "new"
  King();      // Error: King must be instantiated using "new"
  ```



## 函数属性与方法

+ `ECMAScript`中的函数是对象，因此有属性和方法
+ `length` 表示命名参数的个数
+ `prototype` 大部分函数拥有原型属性 （`Function.prototype `虽然是一个`funtion`，但是它没有`prototype`）
+ `call`
+ `apply`
+ `bind`



## 函数表达式

理解函数声明与函数表达式之间的区别，关键是**理解提升**



## 递归

递归函数通常的形式是一个函数通过名称调用自己

```js
function factorial (num) {
	if (num >= 1) {
		return 1
  } else {
   	return num * factorial(num - 1) 
  }
}
```

```js
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num ＊ arguments.callee(num-1);
  }
}
```

**在严格模式下运行的代码是不能访问`arguments.callee`的**

```js
const factorial = (function f(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num ＊ f(num-1);
  }
});
```



## 尾调用优化

`ECMAScript 6`规范新增了一项**内存管理优化机制**，让`JavaScript`**引擎**在满足条件时可以**重用栈帧**

这项优化非常适合 “尾调用”

```js
function outerFunction() {
  return innerFunction(); // 尾调用
}
```

**如果外层函数的返回值是内部函数的返回值，那么外层函数执行时所占用的栈帧会在内部函数执行前弹出执行栈外**



### 尾调用优化的条件

确定外部栈帧真的没有必要存在

+ 严格模式
+ 外部函数的返回值是对尾调函数的调用
+ 尾调函数返回后不需要执行额外的逻辑
+ 尾调函数不是引用外部函数作用域中自由变量的闭包

下面展示了几个违反上述条件的函数

```js
"use strict";
// 无优化：尾调用没有返回
function outerFunction() {
  innerFunction();
}
// 无优化：尾调用没有直接返回
function outerFunction() {
  letinnerFunctionResult=innerFunction();
  returninnerFunctionResult;
}
// 无优化：尾调用返回后必须转型为字符串
function outerFunction() {
  return innerFunction().toString();
}
// 无优化：尾调用是一个闭包
function outerFunction() {
  letfoo='bar';
  function innerFunction() { returnfoo;}
  return innerFunction();
}
```

下面几个例子符合尾调优化条件

```js
"use strict";
// 有优化：栈帧销毁前执行参数计算
function outerFunction(a, b) {
  return innerFunction(a + b);
}
// 有优化：初始返回值不涉及栈帧
function outerFunction(a, b) {
  if (a < b) {
    return a;
  }
  return innerFunction(a + b);
}
// 有优化：两个内部函数都在尾部
function outerFunction(condition) {
  return condition ? innerFunctionA() : innerFunctionB();
}
```

这个优化在**递归场景**下的效果是**最明显**的，因为递归代码最容易在栈内存中迅速产生大量栈帧

> 之所以要求**严格模式**，主要因为在**非严格模式**下函数调用中允许使用`f.arguments`和`f.caller`，而它们都会**引用外部函数的栈帧**。显然，这意味着不能应用优化了。因此**尾调用优化要求必须在严格模式下有效**，以**防止引用这些属性**


### 尾调用优化代码

```js
function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n -1) + fib(n -2);
}
console.log(fib(0));   // 0
console.log(fib(1));   // 1
console.log(fib(2));   // 1
console.log(fib(3));   // 2
console.log(fib(4));   // 3
console.log(fib(5));   // 5
console.log(fib(6));   // 8
```

```js
"use strict";
// 基础框架
function fib(n) {
  return fibImpl(0, 1, n);
}
// 执行递归
function fibImpl(a, b, n) {
  if (n === 0) {
    return a;
  }
  return fibImpl(b, a + b, n -1);
}
```

## 闭包

**闭包指的是那些引用了另一个函数作用域中变量的函数**

在调用一个函数时，会为这个函数调用创建一个执行上下文

并创建一个作用域链

然后用`arguments`和其他命名参数来初始化这个函数的**活动对象**

**外部函数**的活动对象是**内部函数作用域链**上的第二个对象

这个作用域链一直向外串起了所有包含函数的**活动对象**，直到**全局执行上下文**才终止

存在闭包的函数执行完毕后，其执行上下文的作用域链会销毁，但它的**活动对象**仍然会**保留在内存**中，直到匿名函数被销毁后才会被销毁

### `this` 对象

每个函数在被调用时都会自动创建两个特殊变量：`this`和 `arguments`

**内部函数**永远不可能直接访问**外部函数**的这两个变量

如果把`this`**保存到闭包**可以访问的另一个变量中

```js
window.identity = 'The Window';
let object = {
  identity: 'My Object',
  getIdentityFunc() {
    let that = this;
    return function() {
      return that.identity;
    };
  }
};
console.log(object.getIdentityFunc()()); // 'My Object'
```

```js
window.identity = 'The Window';
let object = {
  identity: 'My Object',
  getIdentity(){
    returnthis.identity;
  }
};
object.getIdentity();                               // 'My Object'
(object.getIdentity)();                             // 'My Object'
(object.getIdentity = object.getIdentity)();   // 'The Window'
```

### 内存泄漏

```js
function assignHandler() {
  let element = document.getElementById('someElement');
  element.onclick = () => console.log(element.id);
}
```

```js
function assignHandler() {
  let element = document.getElementById('someElement');
  letid=element.id;
  element.onclick = () => console.log(id);
  element=null;
}
```

## 立即调用的函数表达式

```js
(function() {
  // 块级作用域
})();
```


## 私有变量

- 任何定义在函数或块中的变量，都可以认为是私有的，因为在这个函数或块的外部无法访问其中的变量
- 私有变量包括函数参数、局部变量，以及函数内部定义的其他函数

### 特权方法
- 特权方法（privileged method）是能够访问函数私有变量（及私有函数）的公有方法
- 在对象上有两种方式创建特权方法
  + 在构造函数中实现
    ```js
        function MyObject() {
      // 私有变量和私有函数
      let privateVariable = 10;
      function privateFunction() {
        return false;
      }
      // 特权方法
      this.publicMethod = function() {
        privateVariable++;
        return privateFunction();
      };
    }
    ```
    + 构造函数模式的缺点是每个实例都会重新创建一遍新方法

  + 通过使用私有作用域定义私有变量和函数来实现
    ```js
    (function() {
      // 私有变量和私有函数
      let privateVariable = 10;
      function privateFunction() {
        return false;
      }
      // 构造函数
      MyObject = function() {};
      // 公有和特权方法
      MyObject.prototype.publicMethod = function() {
        privateVariable++;
        return privateFunction();
      };
    })();
    ```
    + 这个模式与前一个模式的主要区别就是，私有变量和私有函数是由实例共享的

> 使用闭包和私有变量会导致作用域链变长，作用域链越长，则查找变量所需的时间也越多

## 模块模式

+ 模块模式是在单例对象基础上加以扩展，使其通过作用域链来关联私有变量和特权方法
  ```js
  let singleton = function() {
    // 私有变量和私有函数
    let privateVariable = 10;
    function privateFunction() {
      return false;
    }
    // 特权/公有方法和属性
    return {
      publicProperty: true,
      publicMethod() {
        privateVariable++;
        return privateFunction();
      }
    };
  }();
  ```
+ 模块模式使用了匿名函数返回一个对象
+ 这个对象字面量中只包含可以公开访问的属性和方法
+ 这个对象定义在匿名函数内部，所以它的所有公有方法都可以访问同一个作用域的私有变量和私有函数

```js
let application = function() {
  // 私有变量和私有函数
  let components = new Array();
  // 初始化
  components.push(new BaseComponent());
  // 公共接口
  return {
    getComponentCount() {
      return components.length;
    },
    registerComponent(component) {
      if (typeof component == 'object') {
        components.push(component);
      }
    }
  };
}();
```

## 模块增强模式
+ 另一个利用模块模式的做法是在返回对象之前先对其进行增强
+ 这适合单例对象需要是某个特定类型的实例，但又必须给它添加额外属性或方法的场景
  ```js
  let singleton = function() {
    // 私有变量和私有函数
    let privateVariable = 10;
    function privateFunction() {
      return false;
    }
    // 创建对象
    let object = new CustomType();
    // 添加特权/公有属性和方法
    object.publicProperty = true;
    object.publicMethod = function() {
      privateVariable++;
      return privateFunction();
    };
    // 返回对象
    return object;
  }();
  ```
  ```js
  let application = function() {
    // 私有变量和私有函数
    let components = new Array();
    // 初始化
    components.push(new BaseComponent());
    // 创建局部变量保存实例
    let app = new BaseComponent();
    // 公共接口
    app.getComponentCount = function() {
      return components.length;
    };
    app.registerComponent = function(component) {
      if (typeof component == "object") {
        components.push(component);
      }
    };
    // 返回实例
    return app;
  }();
  ```

## 总结
+  函数内部也暴露了很多对象和引用，涵盖了函数被谁调用、使用什么调用，以及调用时传入了什么参数等信息
+ `JavaScript`引擎可以优化符合尾调用条件的函数，以节省栈空间
+ 闭包的作用域链中包含自己的一个变量对象，然后是包含函数的变量对象，直到全局上下文的变量对象
+ 函数作用域及其中的所有变量在函数执行完毕后都会被销毁
+ 闭包在被函数返回之后，其作用域会一直保存在内存中，直到闭包被销毁
+ 函数可以在创建之后立即调用，执行其中代码之后却不留下对函数的引用
+ 立即调用的函数表达式如果不在包含作用域中将返回值赋给一个变量，则其包含的所有变量都会被销毁
+ 虽然`JavaScript`没有私有对象属性的概念，但可以使用闭包实现公共方法，访问位于包含作用域中定义的变量
+ 可以访问私有变量的公共方法叫作特权方法
+ 特权方法可以使用构造函数或原型模式通过自定义类型中实现，也可以使用模块模式或模块增强模式在单例对象上实现

