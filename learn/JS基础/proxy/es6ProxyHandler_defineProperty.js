const q = {}
const p = new Proxy (q, {
  /**
   * @function handle.defineProperty()用于拦截对象的Object.defineProperty()操作
   * @param {目标对象} target 
   * @param {待检索其描述的属性名} prop 
   * @param {待定义或修改的属性的描述符} descriptor 
   * @returns 
   */
  defineProperty (target, prop, descriptor) {
    console.log('this____绑在hander上', this)
    console.log('descriptor', descriptor);
    return Reflect.defineProperty(target, prop, descriptor);

  }
});
Object.defineProperty(p, 'attr', {
  value: '123',
  writable: true,
  enumerable: true,
});


q.name = 'charon'
p.des = '真滴帅'

console.log('p', p) // p { attr: '123', name: 'charon', des: '真滴帅' }
console.log('q', q) // q { attr: '123', name: 'charon', des: '真滴帅' }

