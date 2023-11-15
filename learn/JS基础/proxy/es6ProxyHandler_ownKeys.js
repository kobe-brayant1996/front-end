const obj = {
  name: 'charon',
  age: 27,
}

const p = new Proxy (obj, {
  /**
   * 用于拦截以下操作：
   * 1）Object.getOwnPropertyNames()
   * 2）Object.getOwmPropertySymbols()
   * 3）Object.keys()
   * 4）Reflect.ownKeys()
   * 
   */
  ownKeys (target) {
    return ['abc'];
  }
})

console.log('Object.keys(p)', Object.keys(p)) // Object.keys(p) []

console.log(Object.getOwnPropertyNames(p)) // [ 'abc' ]
