/**
 * revocable : 可以创建一个可撤销的代理对象
 * 返回一个包含了代理对象本身和它的撤销方法的可撤销 Proxy 对象 
 * 
 * {"proxy": proxy, "revoke": revoke}
 * */
let revocable = Proxy.revocable(
  {},
  {
    get (target, name) {
      return "[[" + name + "]]";
    } 
  }
)

let proxy = revocable.proxy;

proxy.foo
console.log(typeof proxy.foo)

revocable.revoke()

console.log(typeof proxy)
console.log(proxy.foo)

