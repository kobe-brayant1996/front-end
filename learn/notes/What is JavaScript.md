## What is JavaScript ?

### `ECMAScript` 

+ ECMA-262 定义的语言
+ 没有输入输出之类的方法
+ 作为一个基准定义，以便在它之上构建更稳健的脚本语言
+ Web 服务器只是 `ECMAScript` 实现的一种宿主环境
+ 宿主环境提供 `ECMAScript`的基准实现和与环境自身交互必须的扩展（如： DOM）
+ 扩展使用`ECMAScript` 核心类型和语法，提供特定于环境的额外功能
+ 其他宿主环境还有：`Node.js`

##### ECMA-262 定义了什么 ？

+ 语法
+ 类型
+ 语句
+ 关键字
+ 保留字
+ 操作符
+ 全局对象

##### `ECMAScript` 只是对实现这个规范描述的所有方面的一门语言的称呼

**`JavaScript` 实现了 `ECMAScript`**

+ ### `DOM`

  	+ 文档对象类型 （DOM,  Document Object Model）
  	
  	+ `DOM` 将整个页面抽象为一组分层节点
  	+ `DOM` 通过创建表示文档的树，让开发者可以随心所欲地控制网页的内容和结构
  	+ 使用 **DOM API** 可以轻松地删除、添加、替换、修改节点
  	+ 对于浏览器来说，`DOM` 就是使用 `ECMAScript` 实现的，如今已经成为 `JavaScript` 语言的一大组成部分

+ ### `BOM`(浏览器对象模型) 

  + 用于支持访问和操作浏览器的窗口
  + 使用 `BOM` ，开发者可以操控浏览器显示页面之外的部分
  + 唯一一个没有相关标准的 `JavaScript` 实现
  + `HTML5` 以正式规范的形式涵盖了尽可能多的 **BOM 特性**
  + 总的来说，`BOM` 主要针对浏览器窗口和子窗口
  + 通常会把任何特定于浏览器的扩展都归在 `BOM`
    + 弹出新浏览器窗口的能力；
    + 移动 、缩放和关闭浏览器的能力；
    + `navigator` 对象，提供关于浏览器的详尽信息；
    + `location` 对象，提供浏览器加载页面的详尽信息；
    + `screen` 对象，提供关于用户屏幕分辨率的详尽信息；
    + `performance` 对象，提供浏览器内存占用、导航行为和时间统计的详尽信息；
    + 其他自定义对象，如 `XMLHttpRequest`；



### 总结

**JavaScript 是一门用来与网页交互的脚本语言**

+ `ECMAScript` : 由 **ECMA-262** 定义并提供核心功能
+ 文档对象模型 (DOM): 提供与网页内容交互的方法和接口
+ 浏览器对象模型 (BOM): 提供与浏览器交互的方法和接口





## HTML 中的 JavaScript

###  `<script>` 元素 (其有8个属性)

+ `async` ?:  表示立即下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载，**只对外部脚本文件有效**
+ `charset`?:  使用 `src` 属性指定的代码字符集，**大多数浏览器不在乎它的值**
+ `crossorigin`?： 配置相关请求的 `CORS` ( 跨域资源共享) 设置。默认不使用 `CORS`
  + `crossorigin = anonymous` 配置文件请求不必设置凭据标志
  + `crossorigin = use-credentials` 设置凭据标志，意味着出站请求会包含凭据
+ `defer`?：表示脚本可以延迟到文档完全被解析和显示之后再执行，**只对外部脚本文件有效**
+ `integrity`?：允许比对接收的资源和指定的加密签名以验证子资源的完整性；如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行；这个属性可以用于确保内容分发网络（CDN, Content Delivery Network）不会提供恶意内容
+ `language` : 废弃
+ `src`?：表示包含要执行的代码的外部文件
+ `type`?：表示代码中脚本语言的内容类型
  + `type=module`, 代码会被当成 ES6 模块，而且只有这时候代码中才能出现 `import` 和 `export` 关键字

### 关于 `<script>` 

+ 在 `<script>` 元素中的代码被计算完成之前，页面的其余内容不会被加载，也不会被显示
+ 按照惯例，外部 JavaScript 文件的扩展名是.js。这不是必需的，因为浏览器不会检 查所包含 JavaScript 文件的扩展名。
+ 这就为使用服务器端脚本语言动态生成 JavaScript 代 码，或者在浏览器中将 JavaScript 扩展语言(如 TypeScript，或 React 的 JSX)转译为 JavaScript 提供了可能性。
+ 不管包含的是什么代码，浏览器都会按照`<script>`在页面中出现的顺序依次解释它们，前提是它们没有使用 `defer` 和 `async` 属性。第二个`<script>`元素的代码必须在第一个`<script>`元素的代码解 释完毕才能开始解释，第三个则必须等第二个解释完，以此类推。



### 标签位置

+ 如果把所有 JavaScript 文件都放在`<head>`里，也就意味着必须把所有 JavaScript 代码都下载、解析和解释完成后，才能开始渲 染页面(页面在浏览器解析到`<body>`的起始标签时开始渲染)。
+ 解决这个问题，现代 Web 应用程序通常 将所有 JavaScript 引用放在`<body>`元素中的页面内容后面



### 总结

**`JavaScript` 是通过 `<script>` 元素插入到 `HTML` 页面中的**

+ 如果包含外部文件，必须将`src` 属性设置为要包含文件的 `URL` , 文件可以和网页在同一台服务器上，也可以位于完全不同的域
+ 所有 `script` 元素会依照它们在网页中出现的次序被解释；在不使用 `defer` 和 `async` 属性的情况下，包含在 `script` 中的代码必须严格按照次序解释
+ 对于不推迟执行的脚本，浏览器必须解释完位于 `script` 中的代码，然后才能继续渲染页面的剩余部分；为此，通常应该把 `script` 元素放在页面末尾，介于主内容之后以及 `</body>` 标签之前
+ 可以使用 `defer` 属性把脚本推迟到文档渲染完毕之后再执行，推迟的脚本原则上按照它们被列出的次序执行
+ 可以使用 `async` 属性表示脚本不需要等待其他脚本，同时也不阻塞文档渲染，即异步加载；异步脚本不能保证按照它们在页面中的次序执行
+ 通过使用 `<noscript>` 元素，可以指定浏览器不支持脚本时显示的内容；如果浏览器支持并启用脚本，则 `noscript` 元素中的任何内容都不会被渲染





## 语言基础

> 任何语言的核心所描述的都是这门语言最基本的层面上是如何工作的；
>
> 涉及 语法、操作符、数据类型以及内置功能；
>
> 在此基础上才可以构建复杂的解决方案；
>
> `ECMA-262` 以一个名为 `ECMAScript` 的为语言的形式，定义了 `JavaScript` 的所有这些方面



### 语法

#### 区分大小写

#### 标识符

+ 所谓的标识符，就是变量、函数、属性或函数参数的名称。
+ 第一个字符必须是字母、下划线或 `$`
+ 剩下的其他字符可以是字母，下划线、`$` 或数字
+ 关键字、保留字、`true`、 `false` 和 `null` 不能作为标识符

#### 注释

```js
// 单行注释

/**
* 多行注释 
*/
```

#### 严格模式

+ 严格模式是一种不同的 `JavaScript` 解析和执行模型
+ 所有现代浏览器都支持严格模式

```js
"use strict"


// 也可以单独指定一个函数在严格模式下执行

function fn () {
	"use strict"
}
```

#### 语句

+ `ECMAScript ` 中的语句以分号结尾
+ 省略分号意味着由解析器确定语句在哪里结尾
+ 加分号便于开发者通过删除空行来压缩代码
+ 加分号有助于某些情况下提升性能，因为解析器会尝试在合适的位置补上分号以纠正语法错误

#### 关键字 和 保留字

+ 关键字和保留字不能用作标识符
+ 虽然现在还可以用作对象的属性名，但是为了确保兼容过去和未来的 **ECMAScript 版本** ，所以还是不要使用关键字和保留字来作为标识符和属性名

### 变量

+ `ECMAScript` 变量是松散类型的，意思是变量可以用于保存任何类型的数据
+ 每个变量只不过是一个用于保存任意值的命名占位符

#### var 关键字

##### `var` 声明作用域

```js
function test () {
	var message = "hi"; // 局部变量
}
test()
console.log(message) // 出错
```

> `test()` 调用时会创建这个变量并给它赋值，  调用之后变量随即被销毁

```js
function test () {
	message = "hi" // 全局变量
}
test(); 
console.log(message); // "hi"
```

> 函数定义变量的时候省略 `var` 操作符，可以创建一个全局变量，函数调用后，并不会被销毁

```js
var message = "hi", found = false, age = 27; // 可以同时声明多个变量并初始化
```

#####  `var` 声明提升

```js
function foo () {
	console.log(age);
  var age = 26;
}
foo(); // undefined
```

> 函数内的所有变量声明都会被拉到函数作用域的顶部

####   `let` 声明

##### 块级作用域

+ 不同于 `var`, `let` 声明的范围是块作用域，而`var` 声明的范围是函数作用域

  ```js
  if (true) {
  	var name = 'Kobe';
    console.log(name); // Kobe
  }
  console.log(name); // Kobe
  
  
  if (true) {
  	let age = 26;
    console.log(age); // 26
  }
  console.log(age); // ReferenceError: age 没有定义
  ```

+ `let` 也不允许同一个块作用域中出现冗余声明

  ```js
  var name;
  var name;
  
  let age;
  let age; // SyntaxError: 标识符 age 已经声明过了
  ```

+ `JavaScript` 引擎会记录用于变量声明的标识符以及其所在的块作用域，因此嵌套使用相同的标识符不会报错，因为同一个块中没有重复声明

  ```js
  var name = 'Nicholas';
  console.log(name) // 'Nicholas'
  if (true) {
  	var name = 'Matt';
    console.log(name); 'Matt'
  }
  
  let age = 30;
  console.log(age);  // 30
  if (true) {
  	let age = 26;
    console.log(age); // 26
  }
  ```

##### 暂时性死区

+ `let` 和`var` 的另一个重要的区别，就是 `let` 声明的变量不会在作用域中被提升

  ```js
  // name 会被提升
  console.log(name); // undefined
  var name = 'Kobe';
  
  
  // age 不会被提升
  console.log(age); // ReferenceError: age 没有定义
  let age = 26;
  ```

  > 在解析代码时，`JavaScript` 引擎也会注意出现在块后面的 `let` 声明，只不过在此之前不能以任何方式来引用未声明的变量。在 `let` 声明之前的执行瞬间被称为 "暂时性死区"，在此阶段引入任何后面才声明的变量都会抛出 `ReferenceError`

##### 全局声明

+ 与 `var` 关键字不同，使用 `let` 在全局作用域中声明的变量不会成为 `window` 对象的属性（`var` 声明的变量则会）

  ```js
  var name = 'Kobe';
  console.log(window.name); // 'Kobe'
  
  let age = 26;
  console.log(window.age); // undefined
  ```

  > `let` 声明仍然是在全局作用域中发生的，相应变量会在页面的生命周期内存续，因此，为了避免 `SyntaxError`, 必须确保页面不会重复声明同一个变量

##### 条件声明

+ 在使用 `var` 声明变量的时候，由于声明会被提升，`JavaScript` 引擎会自动将多余的声明在作用域顶部合并为一个声明 

+ 因为 `let` 的作用域是块，所以不可能检查前面是否已经使用`let` 声明过同名变量，同时也就不可能在没有声明的情况下声明它

  ```html
  <script>
    var name = 'Nicholas';
    let age = 26;
  </script>
  <script>
  // 假设脚本不确定页面中是否已经声明了同名变量
  var name = 'Matt';
  // 这里没问题，因为可以被作为一个提升声明来处理 // 不需要检查之前是否声明过同名变量
  let age = 36;
  // 如果 age 之前声明过，这里会报错 
  </script>
  ```

  > 使用 try/catch 语句或 typeof 操作符也不能解决，因为条件块中 let 声明的作用域仅限于该块。

  ```html
  <script>
    let name = 'Nicholas';
    let age = 36;
  </script>
  
  <script>
    // 那它可以假设还没有声明过
    if (typeof name === 'undefined') {
      let name;
    }
    // name 被限制在 if {} 块的作用域内 // 因此这个赋值形同全局赋值
    name = 'Matt';
    try {
   		console.log(age); // 如果 age 没有声明过，则会报错
    }
    catch(error) {
      12 13 14
      let age;
    }
    // age 被限制在 catch {}块的作用域内 // 因此这个赋值形同全局赋值
    age = 26;
  </script>
  ```

+ 为此，对于 `let` 这个新的 `ES6` 声明关键字，不能依赖条件声明模式

##### `for` 循环中的 `let` 声明

+ 在`let` 出现之前，`for` 循环定义的迭代变量会渗透到循环体外部

  ```js
  for (var i = 0; i < 5; ++i) {
  	// 循环逻辑
  }
  console.log(i) // 5
  
  
  
  for (let j = 0; j < 5; ++j) {
  	// 循环逻辑
  }
  console.log(j) // ReferenceError: j 没有定义
  ```

+ 改成 `let` 之后，这个问题就消失了，因为迭代变量的作用域仅限于 `for` 循环块内部

+ 在使用 `let` 声明迭代变量时，`JavaScript` 引擎在后台会为每个迭代循环声明一个新的迭代变量

+ 每个 `setTimeout` 引用的都是不同的实例

  ```js
  for (var i = 0; i < 5; ++i) {
          setTimeout(() => console.log(i), 0)
  }
  // 你可能以为会输出0、1、2、3、4 // 实际上会输出5、5、5、5、5
  
  for (let i = 0; i < 5; ++i) {
          setTimeout(() => console.log(i), 0)
  }
  // 会输出0、1、2、3、4
  ```

  

##### 模拟 `for`循环的过程

+ 我曾经想过，`let` 是可以在不同的块级作用域中重复声明变量的，所以在`for` 循环中，是不是每次循环的时候就会重新声明一个变量 `i`, 从而达到`JavaScript` 引擎在后台会为每个迭代循环声明一个新的迭代变量这个效果；

+ 然而，查阅了很多资料，均表示: 

  > 在 JavaScript 的 `for` 循环中，当第二次回到条件表达式之后，**不会**重新声明变量。初始化表达式（例如 `let i = 0`）只在循环开始时执行一次。这意味着循环中定义的变量只被声明和初始化一次，然后在每次循环迭代中被更新。

  然后我尝试用`js` 代码去模拟 `for` 循环的过程：

  ```js
  let i = 0;
  
  if (i < 5) {
    setTimeout(() => console.log(i), 0);
  }
  i++;
  {
    i; // 块级作用域的i
    if (i < 5) {
      setTimeout(() => console.log(i), 0);
    }
  }
  i++;
  {
    i; // 块级作用域的i
    if (i < 5) {
      setTimeout(() => console.log(i), 0);
    }
  }
  
  ```

  在上面的模拟中：

  + `let i = 0`; 声明并初始化变量 i。
    块级作用域:

  + 每个 {...} 块创建了一个新的作用域。在 `for `循环中，`let `也会为每次迭代创建一个新的作用域。
    条件检查:

  + `if (i < 5)` 检查条件是否满足，类似于` for `循环中的条件表达式。
    执行动作:

  + `setTimeout(() => console.log(i), 0)` 类似于 `for` 循环体内的操作。
    变量更新:

  + `i++  `更新变量，与 `for` 循环中的更新表达式类似。
    作用域内变量引用:

  + 在每个 {...} 块中，`i` 被 **重新引用**。这与` for`循环中的每次迭代独立的 `i `类似。

  但是很显然，执行结果并不是我们预期的那样

  后面我突然间想到思路出现的问题在于，块级作用域并非只有 {...}, 我忽视了另一个重要的块级作用域： **函数作用域**

  或许将模拟的代码改成以下代码，会更加接近 `JavaScript` 引擎对`for` 循环的处理过程 :

  ```js
  {
    let i = 0;
  
    if (i < 5) {
      // 每次迭代都会调用一个新的 IIFE
      // 为每个 setTimeout 回调创建一个独立的作用域
      (function (i) {
        setTimeout(() => console.log(i), 0);
      }(i))
    }
    i++;
     if (i < 5) {
      // 每次迭代都会调用一个新的 IIFE
      // 为每个 setTimeout 回调创建一个独立的作用域
      (function (i) {
        setTimeout(() => console.log(i), 0);
      }(i))
    }
    i++;
    if (i < 5) {
      // 每次迭代都会调用一个新的 IIFE
      // 为每个 setTimeout 回调创建一个独立的作用域
      (function (i) {
        setTimeout(() => console.log(i), 0);
      }(i))
    }
  }
  ```

  > 所以，这样看来，`let` 声明在 `for` 循环中确实只执行一次；
  >
  > 我们不难看出，这个问题其实就是考验我们对作用域的理解；
  >
  > 在每次函数的调用过程中，都会创建一个函数块级执行上下文，在这个上下文中，会声明一些变量(函数体内代码声明的变量以及形参变量)，这些变量仅能在这个上下文中被访问，或者通过**闭包**供外部变量访问。
  >
  > 所以上面的 `setTimeout`执行时 访问到的是`IIFE` 执行时创建的变量实例 `i`；
  >
  > 回到最初的问题，我们已经找到了答案，那就是在 `forr` 循环中，`let` 变量声明和初始化只执行一次。 

##### 函数调用时

或许看到这里，还有一个疑问，那就是`IIFE` 执行时创建的变量实例 `i`难道不是通过`var`、`let`、`const` 声明的吗？

其实这就涉及到函数调用时，`JS` 引擎做了哪些关键步骤：

+ **创建执行上下文**
  + 当函数被调用时，JavaScript引擎会为该函数创建一个新的执行上下文。执行上下文是存储函数运行时所有信息的内部数据结构。
+ **变量环境的创建**
  + 在这个执行上下文中，创建一个称为“变量环境”的内部对象，用于存储函数中定义的所有局部变量（使用 `var`、`let` 或 `const` 声明的）。
+ **参数的赋值**:
  + 函数的参数会被赋值到新创建的执行上下文中。这些参数在内部表现为局部变量。
+ **函数体的执行**:
  + 接下来，`JavaScript`引擎执行函数体。在这个过程中，任何新声明的局部变量都会被添加到当前执行上下文的变量环境中。
+ **作用域链**:
  + 每个执行上下文都有一个所谓的作用域链，它包含当前函数作用域以及所有外部作用域的引用。这使得函数能够访问在其外部作用域中定义的变量。
+ **函数执行完毕**:
  + 当函数执行完毕，其执行上下文被从调用栈中弹出。如果没有其他引用指向这个执行上下文，它会被垃圾回收器回收

> 所以，当一个函数被调用时，其内部的变量声明是通过创建一个新的执行上下文和相应的变量环境来实现的，而不是通过在每次函数调用时重新执行 `let`、`var` 或 `const` 声明。这是JavaScript引擎的内部机制，确保每次函数调用都有其独立的作用域和变量。

#### `const` 声明

+ `const` 的行为与` let `基本相同，唯一一个重要的区别是用它声明变量时必须同时初始化变量，且 尝试修改` const` 声明的变量会导致运行时错误。
+ 同时 `const` 也不允许重复声明。
+ `const` 声明的限制只适用于它指向的变量的引用，换句话说，如果 `const` 变量引用的是一个对象，那么修改这个对象的内部属性并不违反 `const` 不可修改的限制。

#### 总结

> 使用 `const`  声明可以让浏览器运行时强制保持变量不变，也可以让静态代码分析工具提前发现不合法的赋值操作。
>
> 因此，建议优先使用 `const` 来声明变量，只在提前知道未来会有修改时，才使用 `let`
>
> 这样可以让开发者更有信心地推断某些变量的值永远不会变，同时也能迅速发现因意外赋值导致的非预期行为。


### 数据类型

####  `ECMAScript` 6种简单数据类型（原始类型）

##### `Undefined`

+ `Undefined` 类型只有一个值，`undefined` ; 使用 `var` 和  `let` 声明变量没有初始化时，就相当于给变量赋予了 `undefined` 值
+ 对于为未声明的变量使用 `typeof` 同样返回 `undefined`

##### `Null`

+ `Null`  类型同样只有一个值，即特殊值 `null`
+ `null` 值表示一个空对象指针 `typeof null === "object"`
+ 在定义将来要保存对象值的变量时，建议使用 `null` 来初始化
+ `undefined` 是由 `null` 派生而来的，所以 `(null == undefined) === true`

##### `Boolean`

+ `Boolean` 两个字面值： `true` 、 `false`

+ 所有的 其他 `ECMAScript` 类型的值都有相应布尔值的等价形式

+ 使用 `Boolean()` 可以讲一个其他类型的值转为布尔值

  ```js
  console.log(Boolean(false)) // false
  console.log(Boolean(true)) // true
  console.log(Boolean('')) // false
  console.log(Boolean('kobe')) // true
  console.log(Boolean(null)) // false
  console.log(Boolean({})) // true 
  console.log(Boolean({name: 'kobe'})) // true
  console.log(Boolean(undefined)) // false
  console.log(Boolean(0)) //false
  console.log(Boolean(NaN)) // false
  console.log(Boolean(24)) // true
  ```

+ `if`  等流控制语句会自动执行其他类型值到布尔值的转换

##### `Number`

+ 不同的数值类型相应地也有不同的数值字面量格式

+ 最基本的数值字面量格式是十进制整数 `let intNum = 55` 

+ 整数也可以用八进制（以8为基数）或十六进制（以16为基数）字面量表示

  ```js
  let num1 = 070; // 八进制的 56
  let num2 = 079; // 无效的八进制值，当成 79 处理
  let num3 = 08;  // 无效的八进制值，当成 8 处理
  ```

  > ES6 中的八进制值通过前缀 0o 来表示;严格模式下，前缀 0 会被视为语法错误，如果要表示 八进制值，应该使用前缀 0o。

+ 使用八进制和十六进制格式创建的数值在所有数学操作中都被视为十进制数值

###### 浮点数

+ 要定义浮点值，数值中必须包含小数点，而且小数点后面必须至少有一个数字

+ 虽然小数点前面不是必须有整数，但是建议加上

+ 因为存储浮点值使用的内存空间是存储整数值的两倍，所以 `ECMAScript` 总是想方设法把值转换为整数

  ```js
  let floatNum1 = 1.; // 小数点后面没有数字，当成整数 1 处理
  let floatNum2 = 10.0; // 小数点后面是零，当成整数 10 处理
  ```

+ 浮点数的精确度最高可达 17 位小数，但在算数计算中，远不如整数精确 `0.1 + 0.2 !== 0.3`

  > 之所以存在这种舍入错误，是因为使用了IEEE754数值，这种错误并非ECMAScript 所独有。其他使用相同格式的语言也有这个问题。

###### 值的范围

+ 由于内存的限制， `ECMAScript` 并不支持表示这个世界上的所有数值

+ `ECMAScript` 可以表示的最小数值保存在 `Number.MIN_VALUE` 在多数浏览器中，这个值是 `5e-324`

+ `ECMAScript` 可以表示的最小数值保存在 `Number.MAX_VALUE` 在多数浏览器中，这个值是`1.797 693 134 862 315 7e+308`

  + 如果某个计算得到的数值结果超过了 `JavaScript`  可以表示的范围，那么数值就会被自动转换为一个特殊的 `Infinity` （无穷）值。
  + 确定某个值是不是有限大可以使用`isFinite(num)`

  > 可以使用 `Number.NEGATIVE_INFINITY` 和 `Number.POSITIVE_INFINITY`  也可以获取正、负 `infinity`

###### NaN

+ `NaN` 表示 “不是数值”，用来表示本来要返回数值的操作失败了（而不是抛出错误）

+ 用 `0` 除任意数值在其他语言中通常会导致错误，而中止代码执行，但在`ECMAScript` 中

  ```js
  console.log(0 / 0) // NaN
  console.log(-0 / +0) // NaN
  ```

+ 如果分子是非 0 值，分母是有符号 0 或无符号 0，则会返回 `Infinity` 或`-Infinity`

  ```js
  console.log(5/0);   // Infinity
  console.log(5/-0);  // -Infinity
  ```

+ 任何涉及 `NaN` 的操作始终返回 `NaN` （`NaN / 10`）, 在连续多步计算时这可能是个问题

+ `NaN` 不等于包括 `NaN` 内的任何值

  ```js
  console.log(NaN == NaN) // false
  ```

+ `ECMAScript` 提供了一个函数 `isNaN() `，参数可以是任意数据类型

  + 把一个参数传给 `isNaN()` , 会先尝试把它转换成数值，某些非数值的值可以直接转换成数值，如字符串 "10" 或 布尔值 
  + 任何不能转换为数值的都会导致这个函数返回 `true`

  ```js
  console.log(isNaN(NaN)) // true
  console.log(isNaN(10))  // false, 10是数值
  console.log(isNaN("10")) // false, 可以转换为数值 10
  console.log(isNaN("KOBE")) // true, 不可以转换为数值
  console.log(isNaN(true)) // false, 可以转换为数值 1
  console.log(isNaN(false)) // false, 可以转换为数值 0
  ```

  > 虽然不常见，但是`isNaN()` 可以用于测试对象。
  >
  > 此时，首先会调用对象的 `valueOf()` 方法，然后在确定返回的值是否可以转换为数值  ,
  >
  > 如果不能，在调用 `toString()` 方法，并测试其返回值。
  >
  > 这通常是 `ECMAScript` 内置函数和操作符的工作方式

###### 数值转换

有3个函数可以将非数值转换为数值： `Number()`、 `parseInt()` 、 `parseFloat()`

+ `Number()` 是转型函数，可以用于任何数据类型

  `Number()`  函数基于如下规则执行转换

  + 布尔值， `true` 转换为 1， `false` 转换为 0
  + 数值，直接返回
  + `null`, 返回 0
  + `undefined`, 返回 `NaN`
  + 字符串，应用如下规则：
    + 如果字符串仅包含数值字符，包括数值字符前面带 `+`、 `-` 符号的情况，则转换为一个十进制数值
    + 如果字符串包含有效的浮点值格式如"1.1"，则会转换为相应的浮点值(同样，忽略前面的零)
    + 如果字符串包含有效的十六进制格式如"0xf"，则会转换为与该十六进制值对应的十进制整数值
    + 如果是空字符串(不包含字符)，则返回 0
    + 如果字符串包含除上述情况之外的其他字符，则返回 NaN
  + 对象
    + 调用 `valueOf()` 方法，并按照上述规则转换返回的值。如果转换的结果是 `NaN` ，则调用 `toString()` 方法，再按照转换字符串的规则转换。

+ `parseInt()` 

  + 通常需要得到整数时，优先使用 `parseInt()` 函数

  + `parseInit()`  函数更专注于字符串是否包含数值模式

  + 如果第一个字符不是数值字符、`+` 和 `-` ，`parseInt()` 立即返回 `NaN`,  即空字符串也会返回 `NaN`

  + `parseInt()`函数也能识别不同的整数格式 (十进制、八 进制、十六进制)

    ```js
    let num1 = parseInt("1234blue");  // 1234
    let num2 = parseInt(""); // NaN
    let num3 = parseInt("0xA"); // 10，解释为十六进制整数
    let num4 = parseInt(22.5); // 22
    let num5 = parseInt("70"); // 70，解释为十进制值 9 // 15，解释为十六进制整数
    let num6 = parseInt("0xf"); // 15，解释为十六进制整数
    ```

    

  + 不同的数值格式很容易混淆，因此`parseInt()` 也接收第二个参数，用于指定底数(进制数)

    ```js
    let num = parseInt("0xAF", 16); // 175
    
    // 如果提供了十六进制参数，那么字符串前面的"0x"可以省掉
    let num1 = parseInt("AF", 16); // 175
    let num2 = parseInt("AF");      // NaN
    
    // 通过第二个参数，可以极大扩展转换后获得的结果类型
    let num1 = parseInt("10", 2); // 2, 二进制解析
    let num2 = parseInt("10", 8); // 8, 八进制解析
    let num3 = parseInt("10", 10); // 10, 十进制解析
    let num4 = parseInt("10", 16); // 16, 十六进制解析
    
    ```

    > 因为不传底数参数相当于让 parseInt()自己决定如何解析，所以为避免解析出错，建议始终传给
    >
    > 它第二个参数。

  + `parseInt()` 的第二个参数的有效范围是从 2 到 36，代表最小的二进制到最大的 36 进制。如果你传入的基数不在这个范围内，`parseInt()` 将返回 `NaN`（非数字值）

+ `parseFloat()`

  + `parseFloat()` 函数从位置 0 开始检测每个字符。同样， 它也是解析到字符串末尾或者解析到一个无效的浮点数值字符为止

  + `parseFloat()` 始终忽略字符串开头的零，这个函数能识别前面讨论的所有浮点格式，以及十进制格式(开头的零始终被忽略)

  + 十六进制数值始终会返回 0。因为` parseFloat()` 只解析十进制值, 因此不能指定底数

  + 如果字符串表示整数(没有小数点或者小 数点后面只有一个零)，则 `parseFloat()` 返回整数

    ```js
    let num1 = parseFloat("1234blue"); // 1234, 按整数解析
    let num2 = parseFloat("0xA"); // 0
    let num3 = parseFloat("22.5"); // 22.5
    let num4 = parseFloat("22.34.5"); // 22.34
    let num5 = parseFloat("0908.5"); // 908.5
    let num6 = parseFloat("3.125e7"); // 31250000
    ```

    

##### `String`

######  字符串的特点

+ `ECMAScript` 中的字符串是不可变的（immutable）, 意思是一旦创建，它们的值就不能变了
+ 要修改某个变量中的字符串值，必须先销毁原始的字符串，然后将包含新值的字符串保存到该变量

###### 转换为字符串

+ `toString()` : 返回当前值的字符串等价物

  ```js
  let age = 11;
  let ageAsString = age.toString(); // 字符串 "11"
  let found = true;
  let foundAsString = found.toString(); // 字符串 "true"
  ```

  + 多数情况下，`toString()` 不接收任何参数, 在对数值调用这个方法时，`toString()` 可以接收一个底数参数

+ `String()` 始终会返回表 示相应类型值的字符串

  `String()` 遵循如下规则：

  + 如果有 `toString()` 方法，则调用该方法（不传参数）并返回结果
  + 如果有 `null` ，则返回 `null`
  + 如果值是 `undefined` ， 则返回 `undefined`

###### 模板字面量

+ 由于模板字面量会保持反引号内部的空格，因此在使用时要格外注意。格式正确的模板字符串看起 来可能会缩进不当

###### 字符串插值

+ 字符串插值通过在${}中使用一个 JavaScript 表达式实现
+ 所有插入的值都会使用 toString()强制转型为字符串，而且任何 JavaScript 表达式都可以用于插 值。嵌套的模板字符串无须转义

###### 模板字面量标签函数

```js
let a = 6;
let b = 9;
function simpleTag(strings, aValExpression, bValExpression, sumExpression) { 						     console.log(strings);
  console.log(aValExpression);
  console.log(bValExpression);
  console.log(sumExpression);
  return 'foobar'
}
let untaggedResult = `${ a } + ${ b } = ${ a + b }`; // "6 + 9 = 15"
let taggedResult = simpleTag`${ a } + ${ b } = ${ a + b }`; // foobar
// ["", "+", "=", ""]
// 6
// 9
// 15
```

对于有` n` 个插值的模板字面量，传给标签函数的表达式参数的个数始终是 n，而传给标签函数的第 一个参数所包含的字符串个数则始终是` n+1`

```js
let a = 6;
let b = 9;
function zipTag(strings, ...expressions) {
	return strings[0] + expressions.map((e, i) => `${e}${strings[i + 1]}`).join('');
}
letuntaggedResult= `${a}+${b}=${a+b}`;
let taggedResult = zipTag`${ a } + ${ b } = ${ a + b }`;
console.log(untaggedResult);  // "6 + 9 = 15"
console.log(taggedResult);    // "6 + 9 = 15"
```

###### 原始字符串

+ 使用默认的 `String.raw` 标签函数 可以获取被转换后的字符表示

  ```js
  console.log(`\u00A9`); // ©
  console.log(String.raw`\u00A9`); // \u00A9
  ```

+ 另外，也可以通过标签函数的第一个参数，即字符串数组的`.raw` 属性取得每个字符串的原始内容

  ```js
  function printRaw (strings) {
  	console.log('Actaul characters:');
    for (const string of strings) {
  		console.log(string)
    }
    
    console.log('Escaped characters:')
    for (const string of strings.raw) {
  		console.log(rawString)
    }
  }
  printRaw`\u00A9${ 'and' }\n`;
  // Actual characters:
  // ©
  //(换行符)
  // Escaped characters:
  // \u00A9
  // \n
  ```

  

##### `Symbol`

+  `Symbol`实例是唯一，不可变的
+ `Symbol` 的用途是确保对象属性使用唯一的标识符，不会发生属性冲突的危险

###### `Symbol` 的基本用法

```js
let sym = Symbol();
console.log(typeof sym) // symbol
```

+ 调用 Symbol()函数时，也可以传入一个字符串参数作为对符号的描述(description)，将来可以通 过这个字符串来调试代码。但是，这个字符串参数与符号定义或标识完全无关

  ```js
  let genericSymbol = Symbol();
  let otherGenericSymbol = Symbol();
  console.log(genericSymbol == otherGenericSymbol);  // false
  
  let fooSymbol = Symbol('foo');
  let otherFooSymbol = Symbol('foo');
  console.log(fooSymbol == otherFooSymbol);          // false
  ```

+ 按照规范，你只要创建 `Symbol()`实例并将其 用作对象的新属性，就可以保证它不会覆盖已有的对象属性，无论是符号属性还是字符串属性。

###### 使用全局符号注册表

+ 如果运行时的不同部分需要共享和重用符号实例，那么可以用一个字符串作为键，在全局符号注册 表中创建并重用符号

  ```js
  let fooGlobalSymbol = Symbol.for('foo');
  console.log(typeof fooGlobalSymbol); // symbol
  ```

  > `Symbol.for()` 对每个字符串键都执行幂等操作。第一次使用某个字符串调用时，它会检查全局运 行时注册表，发现不存在对应的符号，于是就会生成一个新符号实例并添加到注册表中。后续使用相同 字符串的调用同样会检查注册表，发现存在与该字符串对应的符号，然后就会返回该符号实例。

  ```js
  let fooGlobalSymbol = Symbol.for('foo'); // 创建新符号
  let otherFooGlobalSymbol = Symbol.for('foo'); // 重用已有符号
  console.log(fooGlobalSymbol === otherFooGlobalSymbol); // true
  ```

+ 即使采用相同的符号描述，在全局注册表中定义的符号跟使用 `Symbol()`定义的符号也并不等同

  ```js
  let localSymbol = Symbol('foo');
  let globalSymbol = Symbol.for('foo');
  console.log(localSymbol === globalSymbol); // false
  ```

+ 全局注册表中的符号必须使用字符串键来创建，因此作为参数传给 `Symbol.for()` 的任何值都会被转换为字符串, 注册表中使用的键同时也会被用作符号描述

  ```js
  let emptyGlobalSymbol = Symbol.for();
  console.log(emptyGlobalSymbol);    // Symbol(undefined)
  ```

+ 还可以使用 `Symbol.keyFor()`来查询全局注册表，这个方法接收符号，返回该全局符号对应的字 符串键。如果查询的不是全局符号，则返回 `undefined`。

  ```js
  // 创建全局符号
  let s = Symbol.for('foo');
  console.log(Symbol.keyFor(s)); // foo
  
  // 创建普通符号
  let s2 = Symbol('bar');
  console.log(Symbol.keyFor(s2)); // undefined
  ```

  > 如果传给 `Symbol.keyFor()`的不是符号，则该方法抛出 TypeError

  ```js
  Symbol.keyFor(123); // TypeError: 123 is not a symbol
  ```

###### 使用符号作为属性

+ 凡是可以使用字符串或数值作为属性的地方，都可以使用符号

  + 对象字面量属性
  + `Object.defineProperty()` 定义属性
  + `Object.defineProperties() ` 定义属性

  ```js
  let s1 = Symbol('foo'),
      s2 = Symbol('bar'),
      s3 = Symbol('baz'),
      s4 = Symbol('qux');
  let o = {
  	[s1]: 'foo val'
  }; 
  // 这样也可以:o[s1] = 'foo val';
  
  Object.defineProperty(o, s2, {value: 'bar val'});
  
  Object.defineProperties(o, {
    [s3]: {value: 'baz val'},
    [s4]: {value: 'qux val'}
  });
   console.log(o);
  // {Symbol(foo): foo val, Symbol(bar): bar val,Symbol(baz): baz val, Symbol(qux): qux val}
  ```

+ `Object.getOwnPropertyNames()` 返回对象实例的常规属性数组

+ `Object.getOwnPropertySymbolS()` 返回对象实例的符号属性数组

+ `Object.getOwnPropertyDescriptors()` 返回同时包含常规和符号属性描述符的对象

+ `Reflect.ownKeys()` 会返回两种类型的键

  ```js
  let s1 = Symbol('foo'),
  s2 = Symbol('bar');
  let o = {
    [s1]: 'foo val',
    [s2]: 'bar val',
    baz: 'baz val',
    qux: 'qux val'
  };
  console.log(Object.getOwnPropertySymbols(o)); // [Symbol(foo), Symbol(bar)]
  console.log(Object.getOwnPropertyNames(o)); // ["baz", "qux"]
  console.log(Object.getOwnPropertyDescriptors(o));
  /**
  {
    baz: {
      value: 'baz val',
      writable: true,
      enumerable: true,
      configurable: true
    },
    qux: {
      value: 'qux val',
      writable: true,
      enumerable: true,
      configurable: true
    },
    [Symbol(foo)]: {
      value: 'foo val',
      writable: true,
      enumerable: true,
      configurable: true
    },
    [Symbol(bar)]: {
      value: 'bar val',
      writable: true,
      enumerable: true,
      configurable: true
    }
  }
  */console.log(Reflect.ownKeys(o)); // ["baz", "qux", Symbol(foo), Symbol(bar)]
  ```

  因为符号属性是对内存中符号的一个引用，所以直接创建并用作属性的符号不会丢失。但是，如果 没有显式地保存对这些属性的引用，那么必须遍历对象的所有符号属性才能找到相应的属性键:

  ```js
  let o = {
    [Symbol('foo')]: 'foo val',
    [Symbol('bar')]: 'bar val'
  };
  
  console.log(o); // {Symbol(foo): "foo val", Symbol(bar): "bar val"}
  
  let barSymbol = Object.getOwnPropertySymbols(o)..find((symbol) => symbol.toString().match(/bar/));
  
  console.log(barSymbol); //Symbol('bar')
  ```

###### 常用的内置符号

###### `Symbol.asyncInterator`

######  `Symbol.hasInstance`

###### `Symbol.isConcatSpeadable`

###### `Symbol.iterator`

###### `Symbol.match`

###### `Symbol.replace`

###### `Symbol.search`

###### `Symbol.species`

###### `Symbol.split`

###### `Symbol.toPrimitive`

###### `Symbol.unscopables`



#### 复杂数据类型

##### `Object`

+ `Object` 是一种无序名值对的集合
+ `ECMAScript` 中的对象其实就是一组数据和功能的集合
+ `ECMAScript` 中的 `Object` 也是派生其他对象的基类
+ `Object` 类型的所有属性和方法在派生 的对象上同样存在

每个 Object 实例都有如下属性和方法

+ `constructor`:用于创建当前对象的函数。这个属性的值就是` Object()`

  函数

+ `hasOwnProperty(propertyName)`:用于判断当前对象实例(不是原型)上是否存在给定的属

  性, 要检查的属性名必须是字符串

+ `isPrototypeOf(object) `: 用于判断当前对象是否为另一个对象的原型

+ `propertyIsEnumerable(propertyName)` :  用于判断给定的属性是否可以使用

+ `toLocaleString()`: 返回对象的字符串表示，该字符串反映对象所在的本地化执行环境

+ `toString()`: 返回对象的字符串表示

+ `valueOf()`: 返回对象对应的字符串、数值或布尔值表示, 通常与 toString()的返回值相同



#### `typeof 操作符`

因为 `ECMAScript` 的类型系统是松散的，所以需要一种手段来确定任意变量的数据类型;

`typeof` 为此而生

对一个值使用 `typeof` 操作符会返回下列字符串之一：

+ "undefined" 表示值未定义；
+ "boolean" 表示值为布尔值；
+ "string" 表示值为字符串；
+ "number" 表示值为数值；
+ "object" 表示值为对象（而不是函数）或 "null"
+ "function" 表示值为函数；
+ "symbol" 表示值为符号

`typeof`  是一个操作符，而不是一个函数，所以不需要参数（但也可以使用参数）

`typeof`  在某些情况下返回的结果可能让人费解，但是技术上讲是正确的，如：

``` js
typeof null // "object"
```

这是因为特殊值 `null`  被认为是一个对空对象的引用

> 严格来讲，函数在 `ECMAScript`  中被认为是对象，并不代表一种数据类型；
>
> 可是，函数也有自己的特殊属性，有必要通过 `typeof`  操作符来区分函数和其他对象



#### 操作符

##### 一元操作符

##### 位操作符

+ 按位非

  ```js
  let num1 = 25; 		// 二进制00000000000000000000000000011001
  let num2 = ~num1; // 二进制11111111111111111111111111100110
  console.log(num2); // -26
  ```

+ 按位与

  ```js
  let result = 25 & 3;
  console.log(result); // 1
  
  25  = 0000 0000 0000 0000 0000 0000 0001 1001
  	3 = 0000 0000 0000 0000 0000 0000 0000 0011
  And = 0000 0000 0000 0000 0000 0000 0000 0001
  ```

+ 按位或

  ```JS
  let result = 25 | 3;
  console.log(result); // 27
  
  25 = 0000 0000 0000 0000 0000 0000 0001 1001
   3 = 0000 0000 0000 0000 0000 0000 0000 0011
  --------------------------------------------
  OR = 0000 0000 0000 0000 0000 0000 0001 1011
  ```

+ 按位异或

  ```js
  let result = 25 ^ 3;
  console.log(result); // 26
  
   25 = 0000 0000 0000 0000 0000 0000 0001 1001
    3 = 0000 0000 0000 0000 0000 0000 0000 0011
  ---------------------------------------------
  XOR = 0000 0000 0000 0000 0000 0000 0001 1010
  ```

+ 左移

  ```js
  let oldValue = 2; // 等于二进制10
  let newValue = oldValue << 5; // 等于二进制1000000，即十进制64
  ```

+  有符号右移

  ```js
  let oldValue = 64; // 等于二进制1000000
  let newValue = oldValue >> 5; // 等于二进制10，即十进制2
  ```

+ 无符号右移

  ```js
  let oldValue = 64; // 等于二进制1000000
  let newValue = oldValue >>> 5; // 等于二进制10，即十进制2
  
  
  let oldValue = -64;
  let newValue = oldValue >>> 5;
  ```



##### 布尔值操作

+ 逻辑非
+ 逻辑与
+ 逻辑或

##### 乘性操作符

+ 乘法操作符
+ 除法操作符

##### 取模操作符

##### 指数操作符

```js
console.log(Math.pow(3, 2); // 9
console.log(3 ** 2); // 9

console.log(Math.pow(16, 0.5)); // 4
console.log(16 ** 0.5); // 4

let squared = 3;
squared **= 2;
console.log(squared); // 9


let sqrt = 16;
sqrt **= 0.5;
console.log(sqrt); // 4]
```

##### 加性操作符

###### 加法操作符

如果两个操作数都是数值，加法操作符执行加法运算并根据如下规则返回结果：

+ 如果有任一操作数是` NaN`，则返回 `NaN`;
+ 如果是` Infinity` 加` Infinity`，则返回 `Infinity`;
+ 如果是`-Infinity` 加`-Infinity`，则返回`-Infinity`;
+ 如果是 `Infinity`加`-Infinity`，则返回 `NaN`
+ 如果是`+0 `加`+0`，则返回`+0`;
+ 如果是`-0` 加`+0`，则返回`+0`;
+ 如果是`-0` 加`-0`，则返回`-0`。

如果有一个操作数是字符串，则要应用如下规则：

+ 如果两个操作数都是字符串，则将第二个字符串拼接到第一个字符串后面；
+ 如果只有一个操作数是字符串，则将另一个操作数转换为字符串，再将两个字符串拼接在一起。

如果有任一操作数是对象、数值或布尔值，则调用它们的 toString()方法以获取字符串，然后再

应用前面的关于字符串的规则。

###### 减法操作符

+ 如果两个操作数都是数值，则执行数学减法运算并返回结果；
+ 如果有任一操作数是 `NaN`，则返回`NaN`；
+ 如果是 `Infinity` 减 `Infinity`，则返回 `NaN`；
+ 如果是`-Infinity` 减`-Infinity`，则返回 `NaN`；
+ 如果是 `Infinity` 减`-Infinity`，则返回 `Infinity`；
+ 如果是`-Infinity` 减 `Infinity`，则返回`-Infinity`;
+ 如果是`+0` 减`+0`，则返回+0`;
+ 如果是`+0` 减`-0`，则返回`-0`;
+ 如果是`-0` 减`-0`，则返回`+0`

+ 如果有任一操作数是字符串、布尔值、null 或 undefined，则先在后台使用 Number()将其转 8

  换为数值，然后再根据前面的规则执行数学运算。如果转换结果是 NaN，则减法计算的结果是

  NaN。

+ 如果有任一操作数是对象，则调用其 valueOf()方法取得表示它的数值。如果该值是 NaN，则

  减法计算的结果是 NaN。如果对象没有 valueOf()方法，则调用其 toString()方法，然后再将得到的字符串转换为数值。



##### 关系操作符

+ 如果操作数都是数值，则执行数值比较
+ 如果操作数都是字符串，则逐个比较字符串中对应字符的编码
+ 如果有任一操作数是数值，则将另一个操作数转换为数值，执行数值比较
+ 如果有任一操作数是对象，则调用其 `valueOf()`方法，取得结果后再根据前面的规则执行比较
+ 如果没有` valueOf()`操作符，则调用 `toString()`方法，取得结果后再根据前面的规则执行比较
+ 如果有任一操作数是布尔值，则将其转换为数值再执行比较



##### 相等运算符

在转换操作数的类型时，相等和不相等（`==`,`!=`）操作符遵循如下规则：

+ 如果任一操作数是布尔值，则将其转换为数值再比较是否相等；

+ 如果一个操作数是字符串，另一个操作数是数值，则尝试将字符串转换为数值，再比较是否

  相等；

+ 如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf()方法取得其原始值，再根据前面的规则进行比较；

+ `null` 和 `undefined` 相等, `null == undefined` 

+ `null` 和` undefined` 不能转换为其他类型的值再进行比较

+ 如果有任一操作数是 `NaN`，则相等操作符返回 `false`，不相等操作符返回 `true`

+ 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象, 则相等操作符返回 `true`


全等和不全等操作符与相等和不相等操作符类似，只不过它们在比较相等时不转换操作数。全等操 作符由 3 个等于号(===)表示，只有两个操作数在不转换的前提下相等才返回 `true`

> 由于相等和不相等操作符存在类型转换问题，因此推荐使用全等和不全等操作符。 这样有助于在代码中保持数据类型的完整性。

##### 条件操作符

##### 赋值操作符

##### 逗号操作符

### 语句

#### `if`

#### **do-while**

#### while

#### for

#### for-in

+ `for-in` 语句是一种严格的迭代语句，用于枚举对象中的非符号键属性
+ 如果 `for-in` 循环要迭代的变量是 `null` 或 `undefined`，则不执行循环体

#### for-of

+ `for-of `语句是一种严格的迭代语句，用于遍历可迭代对象的元素
+ `for-of` 循环会按照可迭代对象的 `next()`方法产生值的顺序迭代元素

#### 标签语句

```js
start: for (let i = 0; i < count; i++) {
    console.log(i);
}
```

#### break**和**continue语句

+ `break`语句用于立即退 出循环，强制执行循环后的下一条语句
+ `continue` 语句也用于立即退出循环，但会再次从循环顶部 开始执行

#### with语句

+ `with `语句的用途是将代码作用域设置为特定的对象

  ```js
  let qs = location.search.substring(1);
  let hostName = location.hostname;
  let url = location.href;
  
  with(location) {
    let qs = search.substring(1);
    let hostName = hostname;
    let url = href;
  }
  ```

+ 使用 with 语句的主要场景是针对一个对象反复操作，这时候将代码作用域设置为该对象能提供便利

+ 严格模式不允许使用 with 语句，否则会抛出错误

#### switch语句

+ `switch` 语句在比较每个条件的值时会使用全等操作符，因此不会强制转换数据类型



### 函数

+ 最佳实践是函数要么返回值，要么不返回值。只在某个条件下返回值的函数会带来 麻烦，尤其是调试时
+ 严格模式对函数也有一些限制： 
  + 函数不能以 eval 或 arguments 作为名称
  + 函数的参数不能叫 eval 或 arguments
  + 两个命名参数不能拥有同一个名称



### 总结

+ `ECMAScript` 中的**基本数据类型**包括` Undefined`、`Null`、`Boolean`、`Number`、`String` 和 `Symbol`
+ 与其他语言不同，`ECMAScript` 不区分整数和浮点值，只有 `Number` 一种数值数据类型
+ `Object` 是一种复杂数据类型，它是这门语言中所有对象的基类
+ 严格模式为这门语言中某些容易出错的部分施加了限制
+ `ECMAScript` 提供了 C 语言和类 C 语言中常见的很多基本操作符，包括数学操作符、布尔操作符、 关系操作符、相等操作符和赋值操作符等

`ECMAScript` 中的函数与其他语言中的函数不一样:

+ 不需要指定函数的返回值，因为任何函数可以在任何时候返回任何值
+ 不指定返回值的函数实际上会返回特殊值 `undefined`



## 变量、作用域与内存

### 原始值和引用值

在把一个值赋给变量时，`JavaScript 引擎`必须确定这个值是原始值还是引用值

+ 保存原始值的变量是按值(by value)访问的，因为我们操作的就是存储在变量中的实际值
+ 引用值是保存在内存中的对象
+ JavaScript 不允许直接访问内存位置，因此也就 不能直接操作对象所在的内存空间
+ 在操作对象时，实际上操作的是对该对象的引用而非 实际的对象本身。为此，保存引用值的变量是按引用访问的



#### 动态属性

+ 对于引用值而言，可以随时添加、修改和删除其属性 和方法。



#### 复制值

+ 在通过变量把一个原始值赋值 到另一个变量时，原始值会被复制到新变量的位置
+ 在把引用值从一个变量赋给另一个变量时，存储在变量中的值也会被复制到新变量所在的位置。区 别在于，这里复制的值实际上是一个指针，它指向存储在堆内存中的对象



#### 传递参数

+ `ECMAScript` 中所有函数的参数都是按值传递的
+ `ECMAScript` 中函数的参数就是局部变量



#### 确定类型

+ `typeof` 虽然对原始值很有用，但它对引用值的用处不大

+ 为了解决这个问题，`ECMAScript` 提供了 `instanceof` 操作符

  ```js
  result = variable instanceof constructor
  ```

+ 所有引用值都是 `Object` 的实例，因此通过` instanceof `操作符检测任何引用值和 `Object `构造函数都会返回 `true`。

> `typeof`操作符在用于检测函数时也会返回"function", 当在Safari(直到Safari5) 和 Chrome(直到 Chrome 7)中用于检测正则表达式时，由于实现细节的原因，`typeof `也会返回"function"。
>
> ECMA-262 规定，任何实现内部`[[Call]]`方法的对象都应该在 `typeof`检测时返回"function"



### 执行上下文与作用域

+ 变量或函数的上下文决定 了它们可以访问哪些数据，以及它们的行为
+ 每个上下文都有一个关联的**变量对象(variable object)**， 而这个上下文中定义的所有变量和函数都存在于这个对象上
+ 全局上下文是最外层的上下文，在浏览器中，全局上下文就是我们常说的` window `对象
  + 因此所有通过 `var `定 义的全局变量和函数都会成为` window `对象的属性和方法
  + 使用` let `和` const` 的顶级声明不会定义在全局上下文中，但在作用域链解析上效果是一样的
+ 上下文在其所有代码都执行完毕后会被销毁, 包括定义 在它上面的所有变量和函数
+ 全局上下文在应用程序退出前才会被销毁，比如关闭网页或退出浏览器
+ 每个**函数调用**都有自己的上下文。当代码执行流进入函数时，函数的上下文被推到一个上下文栈上。 在函数执行完之后，上下文栈会弹出该函数上下文，将控制权返还给之前的执行上下文
+ `ECMAScript` 程序的执行流就是通过这个上下文栈进行控制的
+ 上下文中的代码在执行的时候，会创建变量对象的一个**作用域链(scope chain)**
+ 这个作用域链决定 了各级上下文中的代码在访问变量和函数时的顺序
+ 代码正在执行的上下文的变量对象始终位于作用域链的最前端
+ 如果上下文是**函数**，则其**活动对象(activation object)**用作**变量对象**
+ **活动对象**最初只有 一个定义变量: `arguments`。(全局上下文中没有这个变量。)
+ 作用域链中的下一个变量对象来自包含上 下文，再下一个对象来自再下一个包含上下文。以此类推直至**全局上下文**
+ **全局上下文的变量对象**始终 是作用域链的最后一个**变量对象**
+ 代码执行时的**标识符解析**是通过沿**作用域链**逐级搜索标识符名称完成的。搜索过程始终从作用域链 的最前端开始，然后逐级往后，直到找到标识符。(如果没有找到标识符，那么通常会报错。)
+ 局部作用域中定义的变量可用于在局部上下文中替换全局变量
+ 函数参数被认为是当前上下文中的变量，因此也跟上下文中的其他变量遵循相同的 访问规则。

#### 作用域链增强

虽然执行上下文主要有**全局上下文**和**函数上下文**两种(`eval()`调用内部存在**第三种上下文**), 但有其他方式来增强作用域链, 某些语句会导致在作用域链前端临时添加一个上下文, 这个上下文在代码执 行后会被删除

+ `try/catch` 语句的`catch` 块

+ `with` 语句

  > 这两种情况下，都会在作用域链前端添加一个变量对象;
  >
  > 对 `with `语句来说，会向作用域链前端添加指定的对象;
  >
  > 对 `catch `语句而言，则会创建一个新的变量对象，这个变量对象会包含要抛出的错误 对象的声明

#### 变量声明

##### 使用 **`var`** 的函数作用域声明

+ 在使用` var` 声明变量时，变量会被自动添加到最接近的上下文
+ 在函数中，最接近的上下文就是函 数的局部上下文
+ 在 `with` 语句中，最接近的上下文也是函数上下文
+ 如果变量未经声明就被初始化了， 那么它就会自动被添加到全局上下文
+ `var `声明会被拿到函数或全局作用域的顶部，位于作用域中所有代码之前。这个现象叫作“提升” 

##### 使用 **`let`** 的块级作用域声明

+ `let `的行为非常适合在循环中声明迭代变量
+ 严格来讲，`let` 在` JavaScript `运行时中也会被提升，但由于“**暂时性死区”(temporal dead zone)**的 缘故，实际上不能在声明之前使用` let `变量

##### 使用 **const** 的常量声明

+ 赋值为对象的 `const` 变量不能再被重新赋值 为其他引用值，但对象的键则不受限制

+ 如果想让整个对象都不能修改，可以使用` Object.freeze()`，这样再给属性赋值时虽然不会报错， 但会静默失败

  ```js
  const o3 = Object.freeze({});
  o3.name = 'Jake';
  console.log(o3.name); // undefined
  ```

+ 由于 `const `声明暗示变量的值是单一类型且不可修改，`JavaScript`运行时编译器可以将其所有实例都替换成实际的值，而不会通过查询表进行变量查找。谷歌的 **V8 引擎**就执行这种优化。

##### 标识符查找

+ 搜索开始于作用域链前端，以给定的名称搜索对应的标识符。如果在局部上下文中找到该标识符，则搜索 停止，变量确定;如果没有找到变量名，则继续沿作用域链搜索。(注意，作用域链中的对象也有一个 原型链，因此搜索可能涉及每个对象的原型链。)这个过程一直持续到搜索至全局上下文的变量对象。 如果仍然没有找到标识符，则说明其未声明。

+ 标识符查找并非没有代价。访问**局部变量**比访问全局变量要快，因为不用**切换作用域**。不过，**JavaScript 引擎**在优化标识符查找上做了很多工作，将来这个差异可能就微不足道了。



### 垃圾回收

+ 执行环境负责在代码执行时管理内存
+ `JavaScript `通过自动内存管理实现内存分配和闲置资源回收

#### 标记清理

+ 垃圾回收程序运行的时候，会标记内存中存储的所有变量
+ 将所有在上下文中的变量，以及被在上下文中的变量引用的变量的标记去掉
+ 在此之后再被加上标记 的变量就是待删除的了，原因是任何在上下文中的变量都访问不到它们了
+ 随后垃圾回收程序做一次内 存清理，销毁带标记的所有值并收回它们的内存



#### 引用计数

+ 对每个值都记录它被 引用的次数
+ 声明变量并给它赋一个引用值时，这个值的引用数为 1。如果同一个值又被赋给另一个变 量，那么引用数加 1
+ 如果保存对该值引用的变量被其他值给覆盖了，那么引用数减 1。当一 个值的引用数为 0 时，就说明没办法再访问到这个值了，因此可以安全地收回其内存了
+ 垃圾回收程序 下次运行的时候就会释放引用数为 0 的值的内存
+ 为避免类似的循环引用问题，应该在确保不使用的情况下切断原生 JavaScript 对象与 DOM 元素之 间的连接。

#### 性能

+ 垃圾回收程序会周期性运行，如果内存中分配了很多变量，则可能造成性能损失，因此垃圾回收的 时间调度很重要。
+ 现代垃圾回收程序会基于对 JavaScript 运行时环境的探测来决定何时运行
+ 基本上都是根据已分配对象的大小和数量来判断的
+ 在一次完整的垃圾回收之后，**V8** 的堆增长策略会根据**活跃对象的数量**外加**一些余量**来确定何时再次垃 圾回收
+ **JavaScript 引擎**的垃圾回收程序被调优为动态改变分配变量、字面量或数组槽位等会触 发垃圾回收的阈值
+ 如果垃圾回收程序回收的内存不到已分配的**15%**，  这些变量、字面量或数组槽位的阈值就会翻倍。如果有一次回收的内存达到已分配的 85%，则阈值重置为默认值。

#### 内存管理

+ 将内存占用量保持在一个较小的值可以让页面性能更好。

+ 优化内存占用的最佳手段就是保证在执行 代码时只保存必要的数据。如果数据不再必要，那么把它设置为 null，从而释放其引用

+ 解除对一个值的引用并不会自动导致相关内存被回收。解除引用的关键在于确保相关的值已经不在上下文里了，因此它在下次垃圾回收时会被回收

+ 通过 `const` 和 `let`声明提升性能，相比于使用` var`，使用这两个新关键字可能会更早地让垃圾回

  收程序介入，尽早回收应该回收的内存。

+ 隐藏类和删除操作

  + **V8** 在将解释后的 `JavaScript` 代码编译为实际的机器码时会利用“隐藏类”
  + 运行期间，**V8** 会将创建的对象与隐藏类关联起来，以跟踪它们的属性特征。能够共享相同隐藏类 的对象性能会更好
  + 避免` JavaScript` 的“先创建再补充式的动态属性赋值，并在构造函数中一次性声明所有属性
  + 最佳实践是把不想要的属性设置为 `null`。这样可以保持隐藏类不变 和继续共享，同时也能达到删除引用值供垃圾回收程序回收的效果

+ 内存泄漏

  + `JavaScript` 中的内存泄漏大部分是由不合理的 引用导致的

  + 意外声明全局变量是最常见但也最容易修复的内存泄漏问题

  + 定时器也可能会悄悄地导致内存泄漏

    ```js
    let name = 'Jake';
    setInterval(() => {
      console.log(name);
    }, 100);
    ```

  + 使用` JavaScript `闭包很容易在不知不觉间造成内存泄漏

    ```js
    let outer = function() { 10 let name = 'Jake';
    return function() {
    	return name;
     };
    };
    ```

+ 静态分配与对象池

  + 为了提升` JavaScript `性能，最后要考虑的一点往往就是**压榨浏览器**了
  + 一个关键问题就是如何减少浏览器执行垃圾回收的次数
  + 理论上，如果能够合理使用分配的内存，同时避免多余的垃圾回收，那就可以保住因释放内存而损失的性能

### 总结

`JavaScript` 变量可以保存两种类型的值:原始值和引用值

+ 原始值大小固定，因此保存在**栈内存**上
+ 从一个变量到另一个变量复制原始值会创建该值的第二个副本
+ 引用值是对象，存储在**堆内存**上
+ 包含引用值的变量实际上只包含指向相应对象的一个指针，而不是对象本身
+ 从一个变量到另一个变量复制引用值只会复制指针，因此结果是两个变量都指向同一个对象
+ `typeof `操作符可以确定值的原始类型，而` instanceof` 操作符用于确保值的引用类型
+ 任何变量(不管包含的是原始值还是引用值)都存在于某个执行上下文中(也称为作用域)。这个上下文(作用域)决定了变量的生命周期，以及它们可以访问代码的哪些部分
+ 执行上下文分全局上下文、函数上下文和块级上下文
+ 代码执行流每进入一个新上下文，都会创建一个作用域链，用于搜索变量和函数
+ 函数或块的局部上下文不仅可以访问自己作用域内的变量，而且也可以访问任何包含上下文乃至全局上下文中的变量

+ 全局上下文只能访问全局上下文中的变量和函数，不能直接访问局部上下文中的任何数据
+ 变量的执行上下文用于确定什么时候释放内存

`JavaScript` 是使用垃圾回收的编程语言，开发者不需要操心内存分配和回收

+ 离开作用域的值会被自动标记为可回收，然后在垃圾回收期间被删除
+ 主流的垃圾回收算法是标记清理，即先给当前不使用的值加上标记，再回来回收它们的内存
+ 引用计数是另一种垃圾回收策略，需要记录值被引用了多少次。`JavaScript 引擎`不再使用这种算 法，但某些旧版本的 IE 仍然会受这种算法的影响，原因是` JavaScript `会访问**非原生 JavaScript 对象**(如 DOM 元素)
+ 引用计数在代码中存在循环引用时会出现问题
+ 解除变量的引用不仅可以消除循环引用，而且对垃圾回收也有帮助。为促进内存回收，全局对 象、全局对象的属性和循环引用都应该在不需要时解除引用。









