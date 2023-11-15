
const p = new Proxy({}, {
  /**
   * 用于拦截：
   * 1）delete proxy[attr] / delete proxy.attr
   * 2）Reflect.deleteProperty()
   */
  deleteProperty (target, prop) {
    console.log('delete', prop)
    delete target[prop]
    return true // 必须返回一个 Boolean 类型的值，表示该属性是否被成功删除
  }
})

p.name = 'charon'

console.log('p', p)

delete p.name

console.log('p', p)
