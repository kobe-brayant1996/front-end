import mountElement from "./mountElement";
import updateTextNode from './updateTextNode';
import updateNodeElement from "./updateNodeElement";
import createDOMElement from "./createDOMElement";
import unmountNode from "./unmountNode";
import diffComponent from "./diffComponent";

export default function diff (virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component;
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  }   else if (typeof virtualDOM.type === "function") {
    // 要更新的是组件
    /**
     * 1）组件本身的 virtualDOM 对象 通过它可以获取组件最新的 props
     * 2）要更新的组件实例对象，通过它可以调用组件的生命周期函数 可以更新组件的 props 属性 可以获取到组件返回的最新的 VirtualDOM
     * 3）要更新的 DOM 对象，在更新组件时，需要在已有 DOM 对象的身上进行修改 实现 DOM 最小化操作 获取旧的 Virtual DOM 对象
     * 4）如果要更新的组件和旧组件不是同一个组件 要直接将组件返回的 Virtual DOM 显示在页面中，此时需要 container 作为父级容器
     */
    diffComponent(virtualDOM, oldComponent, oldDOM, container)
  } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function' ) {
    const newElement = createDOMElement(virtualDOM);
    oldDOM.parentNode.replaceChild(newElement, oldDOM);
  }  else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    if (virtualDOM.type === "text") {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }
 

    /**
     * 1. 将拥有key属性的子元素放置在一个单独的对象中
     * 2. 循环 virtualDOM 的子元素 获取子元素的 key 属性 
     * 3. 看看当前位置的元素是不是我们期望的元素
     */

     // 1. 将拥有key属性的子元素放置在一个单独的对象中
    let keyedElements = {}
    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      let domElement = oldDOM.childNodes[i]
      if (domElement.nodeType === 1) {

        let key = domElement.getAttribute("key")
        if (key) {
          keyedElements[key] = domElement
        }
      }
    }

    let hasNoKey = Object.keys(keyedElements).length === 0

    if (hasNoKey) {
      // 对比子节点
      virtualDOM.children.forEach((child, i) => {
        diff(child, oldDOM, oldDOM.childNodes[i])
      })
    } else {
      // 2. 循环 virtualDOM 的子元素 获取子元素的 key 属性
      virtualDOM.children.forEach((child, i) => {
        let key = child.props.key
        if (key) {
          let domElement = keyedElements[key]
          if (domElement) {
            // 3. 看看当前位置的元素是不是我们期望的元素
            if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
              oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
            }
          } else {
            // 新增元素
            mountElement(child, oldDOM, oldDOM.childNodes[i])
          }
        }
      })
    }

    // 删除节点
    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes;
    // 判断旧节点的数量
    if (oldChildNodes.length > virtualDOM.children.length) {
      if (hasNoKey) {
        // 有节点被删除
        for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
          unmountNode(oldChildNodes[i]);
        }
      } else {
        // 通过key属性删除节点
        for (let i = 0; i < oldChildNodes.length; i++) {
          let oldChild = oldChildNodes[i];
          let oldChildKey = oldChild._virtualDOM.props.key;
          let found = false;
          for (let n = 0; n < virtualDOM.children.length; n++) {
            if (oldChildKey === virtualDOM.children[n].props.key) {
              found = true;
              break;
            }
          }

          if (!found) {
            unmountNode(oldChild);
          }
        }
      }
     
    }

  }
}