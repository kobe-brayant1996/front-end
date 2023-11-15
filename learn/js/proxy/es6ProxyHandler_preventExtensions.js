
const p = new Proxy (
  {
    name: 'charon'
  },
  {
    preventExtensions (target) {
      target.name = '帅'
      Object.preventExtensions(target);
      return true
    }
  }
)

console.log(Object.preventExtensions(p))
