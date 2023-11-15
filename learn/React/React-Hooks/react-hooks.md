### React Hooks 

+ 对函数组件进行增强，让函数组件可以存储状态，拥有处理副作用的能力

#### 类组件的不足

+ 缺少逻辑复用机制

+ 类组件经常会变得很复杂难以维护

+ 类成员方法不能保证 `this` 指向的正确性


#### `useState`

+ 用于为函数组件引入状态

+ 接收唯一的参数即状态初始值，任意数据类型

+ 参数可以是函数，返回状态初始值，只调用一次

+ 设置状态值的方法可以是一个函数，参数为对应的状态值

+ 设置状态值方法本身是异步的


##### `useState` 的实现原理

```js
let state = [];
let setters = [];
let stateIndex = 0;

function createSetter (index) {
  return function (newState) {
    state[index] = newState
    render();
  }
}

function render () {
  stateIndex = 0;
  ReactDOM.render(<App />, document.getByElementId('root'))
}


function useState (initailState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initailState;
  setters.push(createSetter(stateIndex));
  let value = state[stateIndex];
  let setter = setters[stateIndex];
  stateIndex ++;
  return [state, setter]
}

function App () {

  return <></>
}

```


#### `useReducer`

+ `useReducer` 是一种让函数组件保存状态的方式

#### `useReducer` 的实现原理

```js
function useReducer (reducer, initailState) {
  const [state, setState] = useState(initailState)

  function dispatch (action) {
    const newState = reducer(state, action);
    setState(newState);
  }

  return [state, dispatch]
}
```


#### `useContext`

+ 在跨组件层级获取数据时，简化获取数据时的代码


#### `useEffect`

+ 函数组件处理副作用的钩子

##### `useEffect` 执行时机

+ 组件挂载完成之后执行、组件状态更新以及组件被卸载前执行

  +  `useEffect(() => {})`  =>  `componentDidMount` & `componentDidUpdate`
  +  `useEffect(() => {}, [])` => `componentDidMount`
  +  `useEffect(() => () => {})` => `componentWillUnMount` （ReactDOM.unmountComponentAtNode(xxx)）

##### `useEffect` 解决的问题

+ 按照用途将代码进行分类（将一组相干的业务逻辑归置到同一个副作用函数中）
+ 简化重复代码，是组件内部代码更加清晰


##### `useEffect` 的第二个参数

+ 只有指定数据发生变化时出发 effect

##### `useEffect` 结合异步函数

+ `useEffect` 中的参数函数不能是异步函数，因为 `useEffect` 函数要返回清理资源的函数，如果是异步函数就变成返回 `Promise`

```js
useEffect(() => {
  (async () => {
    await axios.get()
  })()
})
```

##### `useEffect` 的实现原理

```js
  let preDepsAry = [];
  let effectIndex = 0;

  function useEffect (callback, depsAry) {
    if (Object.prototype.toString.call(callbcak) !== '[object Function]') {
      thow new Error('不是函数')
    }
    if (typeof depsAry === 'undefined') {
      callback()
    } else {
      if (Object.prototype.toString.call(depsAry) !== '[object Array]') {
        throw new Error('不是数组')
      }
      let prevDeps = preDepsAry[effectIndex];
      let hasChanged = prevDeps ? depsAry.every((dep, index) => dep === preDepAry[index]) === false : true;

      if (hasChanged) {
        callback()
      }
      prevDepsAry[effectIndex] = depsAry;
      effectIndex++ // render 时 重置 effectIndex
    }
  }
```


### `useMemo`

+ `useMemo` 的行为类似 `Vue` 中的计算属性，可以监测某个值的变化，根据变化值计算新值
+ `useMemo` 会缓存计算结果，如果监测值没有发生变化，即使组件重新渲染，也不会重新计算，此行为可以有助于避免在每个渲染上进行昂贵的计算


+ 使用 `memo` 方法提高组件性能

  + 性能优化，如果本组件中的数据没有发生变化，组织组件更新，类似类组件中的 `PureComponent` 和 `shouldComponentUpdate`




### `useCallback`

+ 性能优化，使组件重新渲染时得到相同的函数实例
```js
const [count, setCount] = useState(0)
const resetCount = useCallback(() => setCount(0), [setCount])
```


### `useRef`

+ 获取 `DOM` 元素对象

+ 保存数据 （跨组件周期）
  + 即使组件重新渲染，保存的数据仍然还在，保存的数据被更改不会触发组件重新渲染



### 路由钩子函数

+ `react-router-dom` 路由提供的钩子函数

  + `useHistory`

  + `useLocation`

  + `useRouteMatch`

  + `useParams`

