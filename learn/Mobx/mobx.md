## Mobx 是一个简单的可扩展的状态管理库，无样板代码风格简约


### 核心概念
+ observable: 被 `Mobx` 跟踪的状态
+ action: 允许修改状态的方法，在严格模式下只有 `action` 方法被允许修改状态
+ computed: 根据现有状态衍生出来的状态
+ flow: 执行副作用，它是一个 `generator` 函数，可以更改状态值

+ mobx

+ mobx-react-lite

+ mobx-react

#### 状态变化更新视图的必要条件

+ 状态必须被标记为 `observalbe`
+ 更改状态的方法必须被标记为 `action`
+ 组件必须通过 `observer` 方法包裹


