
function Func (name, desc) {
  this.name = name;
  this.desc = desc;
}

const proxy1 = new Proxy(Func, {
  /**
   * @function 用于拦截new操作符
   * @description 生成的Proxy对象必须可以使用new操作符生效，所以目标对象必须具有[[consturct]] 内部方法 （即 new target 必须是有效的）
   * @param {target} target 
   * @param {argumentsList} args 
   * @param {newTarget 新生成的代理对象} proxy1 
   * @returns 
   */
  construct (target, args) {
    console.log(target.name);
    // 必须返回一个对象
    return new target(...args);
  }
});

const result = new proxy1('karong', '你是真滴帅');

console.log(result);