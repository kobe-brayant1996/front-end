
const obj = {}

Object.defineProperty(obj, 'name', {
  configurable: false,
  enumerable: false,
  writable: true,
  value: 'qs',
  // get: undefined
})

const p = new Proxy (
  obj,
  {
    /**
     * @function 用于拦截目标对象以下操作
     * 1）proxy[attr] / proxy.attr
     * 2）访问原型链上的属性： Otbjec.create(proxy)[attr]
     * 3）Reflect.get()
     * 
     * @description 
     * 1）如果要访问的目标属性是不可写以及不可配置的，则返回的值必须与该目标属性的值相同
     * 2）如果访问的目标属性没有配置访问防范，即get方式是undefined的，则返回值必须为undefined
     */
    get (target, prop, receiver) {
      console.log('recevier', receiver)
      return '帅';
    }
  }  
)

p.name = 'charon'

console.log(p) // { name: 'charon' }
console.log(p.name) // 帅
