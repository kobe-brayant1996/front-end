export default function createElement (type, props, ...children) {
  const childElement = [].concat(...children).reduce((result, child) => {
    if (typeof child !== 'boolean' && child !== null) {
      if (child instanceof Object) {
        result.push(child) 
      } else {
        result.push(createElement("text", { textContent: child }))
      }
    }
    return result
  }, [])
  return {
    type,
    props: Object.assign({ children: childElement, ...props }),
    children: childElement,
  }
}