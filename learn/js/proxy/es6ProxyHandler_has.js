
// handler.has 方法可以看作针对 in 操作的钩子


const p = new Proxy(
  {
    name: 'charon',
    desc: '帅',
  },
  {
    has (target, prop) {
      return prop in target
    }
  }
)
console.log('name' in p)
