## 组件卸载前进行清理操作

在组件中为 `window `注册的**全局事件**, 以及**定时器**, 在组件卸载前要清理掉, 防止组件卸载后继续执行影响应用性能

```js
import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"

const App = () => {
  let [index, setIndex] = useState(0)
  useEffect(() => {
    let timer = setInterval(() => {
      setIndex(prev => prev + 1)
      console.log('timer is running...')
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  return (
    <button onClick={() => ReactDOM.unmountComponentAtNode(document.getElementById("root"))}>
      {index}
    </button>
  )
}

export default App
```

## `PureComponent`

### 什么是纯组件

+ 纯组件会对组件输入数据进行**浅层比较**，
+ 如果当前输入数据和上次输入数据相同，组件不会重新渲染

### 什么是浅层比较

+ 比较引用数据类型在**内存**中的**引用地址是否相同**，比较**基本数据类型的值是否相同**

### 如何实现纯组件

+ 类组件继承 `PureComponent` 类，
+ 函数组件使用` memo` 方法

```js
import React from "react"
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {name: "张三"}
  }
  updateName() {
    setInterval(() => this.setState({name: "张三"}), 1000)
  }
  componentDidMount() {
    this.updateName()
  }
  render() {
    return (
      <div>
        <RegularComponent name={this.state.name} />
        <PureChildComponent name={this.state.name} />
      </div>
    )
  }
}

class RegularComponent extends React.Component {
  render() {
    console.log("RegularComponent")
    return <div>{this.props.name}</div>
  }
}

class PureChildComponent extends React.PureComponent {
  render() {
    console.log("PureChildComponent")
    return <div>{this.props.name}</div>
  }
}
```

为什么不直接进行 `diff` 操作, 而是要先进行浅层比较，浅层比较难道没有性能消耗吗 ?

+ 和进行 `diff `比较操作相比，浅层比较将消耗更少的性能。
+ `diff `操作会重新遍历整颗 `virtualDOM` 树, 而浅层比较**只操作当前组件的` state` 和 `props`**



##  `shouldComponentUpdate`

+ 纯组件只能进行浅层比较，要进行深层比较，使用 `shouldComponentUpdate `编写自定义比较逻辑
+ 返回 `true `重新渲染组件，返回 `false` 阻止重新渲染
+ 函数的第一个参数为 `nextProps`, 第二个参数为 `nextState`.

```js
import React from "react"

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {name: "张三", age: 20, job: "waiter"}
  }
  componentDidMount() {
    setTimeout(() => this.setState({ job: "chef" }), 1000)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.name !== nextState.name || this.state.age !== nextState.age) {
      return true
    }
    return false
  }

  render() {
    console.log("rendering")
    let { name, age } = this.state
    return <div>{name} {age}</div>
  }
}
```

## `React.memo`

+ 将函数组件变为纯组件
+ 将当前 props 和上一次的 props 进行**浅层比较**，如果相同就阻止组件重新渲染

```js
import React, { memo, useEffect, useState } from "react"

function ShowName({ name }) {
  console.log("showName render...")
  return <div>{name}</div>
}

const ShowNameMemo = memo(ShowName)

function App() {
  const [index, setIndex] = useState(0)
  const [name] = useState("张三")
  useEffect(() => {
    setInterval(() => {
      setIndex(prev => prev + 1)
    }, 1000)
  }, [])
  return (
    <div>
      {index}
      <ShowNameMemo name={name} />
    </div>
  )
}

export default App
```

+ 为` memo` 传递比较逻辑
  + 使用 `memo`方法自定义比较逻辑，用于执行深层比较
  + 比较函数的第一个参数为上一次的 `props`, 比较函数的第二个参数为下一次的 `props`, 比较函数返回 `true`, 不进行渲染, 比较函数返回 `false`, 组件重新渲染.



## 使用组件懒加载

使用组件懒加载可以减少` bundle` 文件大小, 加快组件呈递速度

### 路由组件懒加载

```js
import React, { lazy, Suspense } from "react"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"

const Home = lazy(() => import(/* webpackChunkName: "Home" */ "./Home"))
const List = lazy(() => import(/* webpackChunkName: "List" */ "./List"))

function App() {
  return (
    <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/list">List</Link>
      <Switch>
        <Suspense fallback={<div>Loading</div>}>
          <Route path="/" component={Home} exact />
          <Route path="/list" component={List} />
        </Suspense>
      </Switch>
    </BrowserRouter>
  )
}
   
export default App
```



### 根据条件进行组件懒加载

```js
import React, { lazy, Suspense } from "react"

function App() {
  let LazyComponent = null
  if (true) {
    LazyComponent = lazy(() => import(/* webpackChunkName: "Home" */ "./Home"))
  } else {
    LazyComponent = lazy(() => import(/* webpackChunkName: "List" */ "./List"))
  }
  return (
    <Suspense fallback={<div>Loading</div>}>
      <LazyComponent />
    </Suspense>
  )
}

export default App
```

## 使用 Fragment 避免额外标记

```js
import { Fragment } from "react"

function App() {
  return (
    <Fragment>
      <div>message a</div>
      <div>message b</div>
    </Fragment>
  )
}
```

## 不要使用内联函数定义

在使用内联函数后, `render` 方法每次运行时都会创建该函数的新实例, 导致 `React `在进行`Virtual DOM `比对时, 新旧函数比对不相等，导致 `React `总是为元素绑定新的函数实例, 而旧的函数实例又要交给垃圾回收器处理

## 在构造函数中进行函数`this`绑定

可以在构造函数中对函数的 `this `进行更正, 也可以在行内进行更正, 两者看起来没有太大区别, 但是对性能的影响是不同的.

+ 构造函数只执行一次, 所以函数` this` 指向更正的代码也只执行一次
+ 在行内进行更正，`render` 方法每次执行时都会调用` bind `方法生成新的函数实例.

## 类组件中的箭头函数

+ 在类组件中使用箭头函数不会存在` this` 指向问题, 因为箭头函数本身并不绑定`this`
+ 当使用箭头函数时, 该函数被添加为类的实例对象属性, 而不是原型对象属性.
+ 如果组件被多次重用, 每个组件实例对象中都将会有一个相同的函数实例
+ 降低了函数实例的可重用性造成了资源浪费.

综上所述, 更正函数内部 `this `指向的最佳做法仍是在**构造函数**中使用`bind `方法进行绑定

## 避免使用内联样式属性

当使用内联 `style `为元素添加样式时, 内联 `style` 会被编译为 `JavaScript `代码, 通过`JavaScript` 代码将样式规则映射到元素的身上, 浏览器就会花费更多的时间**执行脚本**和**渲染 UI**, 从而增加了组件的渲染时间.

更好的办法是将`CSS `文件导入样式组件. 能通过` CSS` 直接做的事情就不要通过` JavaScript` 去做，因为 `JavaScript `操作 `DOM` 非常慢

## 优化条件渲染

```js
function App() {
  return (
    <>
      {true && <AdminHeader />}
      <Header />
      <Content />
    </>
  )
}
```

## 避免重复无限渲染

```js
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {name: "张三"}
  }
  render() {
    this.setState({name: "李四"})
    return <div>{this.state.name}</div>
  }
}
```

与其他生命周期函数不同,` render` 方法应该被作为**纯函数**. 这意味着, 在` render` 方法中不要做以下事情

+ 调用` setState` 方法
+ 使用其他手段查询**更改原生 `DOM` 元素**
+ 其他更改应用程序的任何操作

**`render `方法的执行要根据状态的改变, 这样可以保持组件的行为和渲染方式一致.**



## 为组件创建错误边界

**错误边界**是一个` React `组件, 可以捕获子级组件在渲染时发生的错误, 当错误发生时, 可以将错误记录下来, 可以显示备用 UI 界面

**错误边界**涉及到两个生命周期函数, 分别为 `getDerivedStateFromError` 和`componentDidCatch`

```JS
// ErrorBoundaries.js
import React from "react"
import App from "./App"

export default class ErrorBoundaries extends React.Component {
  constructor() {
    super()
    this.state = {
      hasError: false
    }
  }
  componentDidCatch(error) {
    console.log("componentDidCatch")
  }
  static getDerivedStateFromError() {
    console.log("getDerivedStateFromError")
    return {
      hasError: true
    }
  }
  render() {
    if (this.state.hasError) {
      return <div>发生了错误</div>
    }
    return <App />
  }
}
```



## 避免数据结构突变

组件中 `props ` 和 `state` 的数据结构应该保持一致, 数据结构突变会导致输出不一致.



## 依赖优化

在应用程序中经常会依赖第三方包, 

但我们不想引用包中的所有代码,

 我们只想用到哪些代码就包含哪些代码.

此时可以使用插件对依赖项进行优化

> yarn add react-app-rewired customize-cra lodash babel-plugin-lodash

```js
const { override, useBabelRc } = require("customize-cra")

module.exports = override(
  (oldConfig) => newConfig,
  (oldConfig) => newConfig
)
```

```js
// /src/config-overrides.js

const { override, useBabelRc } = require("customize-cra")

module.exports = override(useBabelRc())
```

```js
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test --env=jsdom",
  "eject": "react-scripts eject"
}
```

```js
// .babelrc
{
  "plugins": ["lodash"]
}
```

```js
import React from "react"
import _ from "lodash"

function App() {
  console.log(_.chunk(["a", "b", "c", "d"], 2))
  return <div>App works</div>
}

export default App
```

