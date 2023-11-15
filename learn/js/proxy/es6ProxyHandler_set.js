
const p = new Proxy(
  {},
  {
    /**
     * 
     * @param {目标对象} target 
     * @param {将被设置的属性名或 Symbol} prop 
     * @param {新属性值} value 
     * @param {最初被调用的对象。通常是 proxy 本身，但 handler 的 set 方法也有可能在原型链上，或以其他方式被间接地调用（因此不一定是 proxy 本身）。} receiver 
     * 备注： 假设有一段代码执行 obj.name = "jen"， obj 不是一个 proxy，且自身不含 name 属性，但是它的原型链上有一个 proxy，那么，那个 proxy 的 set() 处理器会被调用，而此时，  obj 会作为 receiver 参数传进来。
     * @returns  返回值为Boolen
     */ 
    set (target, prop, value, receiver) {
      target[prop] = value
      return true;
    }
  }
)