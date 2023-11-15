function sum (a, b) {
  return a + b;
}

const handler = {
  /**
   * @function 用于拦截函数的调用
   * @param {目标对象 必须是函数对象} target 
   * @param {被调用时的上下文对象} thisArg 
   * @param {被调用时的参数数组} argumentsList 
   */
  apply: function (target, thisArg, argumentsList) {
    console.log('你真帅', thisArg)
    return target(...argumentsList) * 10
  }
}

const proxy = new Proxy(sum, handler)

console.log(proxy(10, 20))
