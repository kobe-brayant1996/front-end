/**
 * 受控表单
 * 表单控件中的值由组件的 state 对象来管理，state对象中存储的值和表单控件中的值是同步状态的
 * 
 * 非受控表单
 * 表单元素的值由 DOM 元素本身管理
 * 
 * 
 * react-router-dom (BrowserRouter, Route, Link, Redirect)  
 * 
 * 
 * Virtual DOM & Diff
 * 
 * 
 * JSX 
 * JavaScript 语法的扩展
 * 在 React 代码执行之前，Babel会将 JSX 编译为 React API
 * 
 * JSX => React.createElement() => Virtual DOM => DOM
 * 
 * 
 * Virtual DOM
 * 提高 JavaScript 操作 DOM 对象的效率
 * 
 * 在 React 中，每个 DOM 对象都有一个对应的 Virtual DOM 对象
 * 它是 DOM 对象的 JavaScript 对象表现形式
 * 其实就是用 JavaScript 对象来描述 DOM 对象信息 （type, attribute, children）
 * 
 * 
 * Virtual DOM 如何提升效率
 * React 第一次创建 DOM 对象后，会为每个 DOM 对象创建其对应的 Virtual DOM 对象
 * DOM对象发生更新之前
 * React 先更新所有的 Virtual DOM 对象
 * 然后 React 会将更新后的 Virtual DOM 对象和更新前的 Vittual DOM 进行比较，从而找出发生变化的部分
 * React 会将发生变化的部分更新到真实的 DOM 对象中， React 仅更新必要更新的部分
 *  
 * Virtual DOM 对象的更新和比较仅发生在内存中，不会在视图中渲染任何内容，所以这一部分的性能损耗成本是微不足道的
 * 
 */

const vDom = {
  type: "div",
  props: {
    className: "container",
  },
  children: [
    {
      type: "h3",
      props: null,
      children: [
        {
          type: "text",
          props: {
            textContent: "Hello React"
          }
        }
      ]
    },
    {
      type: "div",
      props: null,
      children: [
        {
          type: "p",
          props: {
            textContent: "React is great"
          }
        }
      ]
    }
  ]
}

/** 
 * 组件的渲染
 * 
 * 组件的 VirtualDOM 类型值为函数，类组件和函数组件都一样
 * 在渲染组件的时候，需要将 Component 和 Native Element 区分开
 * Native Element 可以直接开始渲染
 * Component 特别处理
 * 
 */
