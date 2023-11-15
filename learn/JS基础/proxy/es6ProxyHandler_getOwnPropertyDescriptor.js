const obj = {}
Object.defineProperty(obj, 'name', {
  configurable: true,
  enumerable: true,
  value: 'charon'
})

const p = new Proxy(
  obj,
  {
    getOwnPropertyDescriptor (target, prop) {
      console.log('prop', prop) 
      return { value: 'karong', configurable: true, enumerable: true, }
    }
  }
)

console.log('p', p);
console.log(Object.getOwnPropertyDescriptor(p, 'name'));
