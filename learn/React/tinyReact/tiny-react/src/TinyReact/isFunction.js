export default function isFunction (virturalDOM) {
  return virturalDOM && typeof virturalDOM.type === 'function'
}
