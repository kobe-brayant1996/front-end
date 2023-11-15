## Redux

+ javaScript 状态容器，提供可预测化的状态管理

+ Store: 存储状态的容器，JavaScript对象
+ View: 视图， HTML 
+ Actions: 对象，描述对状态进行怎样的操作
+ Reducers: 函数，操作状态并返回新的状态


#### 核心API
+ 创建 Store 状态容器
```js
const store = Redux.createStore(reducer)
```

+ 创建用于处理状态的 reducer 函数
```js
function reducer (state = initialState, action) {}
``` 
+ 获取状态
```js
store.getState()
```

+ 订阅状态
```js
store.subscribe(function () {})
```

+ 触发 action
```js
store.dispatch({ type: 'charon' })
```


### 在 React 项目中加入 Redux 的好处

+ 使用 `Redux` 管理数据，由于 `Store` 独立于组件，使得数据管理独立于组件，
+ 解决了组件之间传递数据困难的问题


### Redux 中间件

+ 中间件允许我们拓展`redux`应用程序
+ 本质是一个函数

```js
export default store => next => action => {}
```

+ 中间件在开发完成以后只有被住处才能在Redux的工作流中生效
```js
  import { createStore, applyMiddleware } from 'redux';

  createStore(reducer, applyMiddleware(logger))
```


### Redux 常用中间件

+ redux-thunk;

+ redux-saga

```js
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();
sagaMiddleware.run(counterSaga)
```

+ redux-actions
  + redux 流程中大量的样板代码读写很痛苦，使用redux-actions 可以简化 Action 和 Reducer 的处理
