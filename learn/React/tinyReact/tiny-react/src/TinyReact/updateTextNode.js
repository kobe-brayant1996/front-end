export default function updateTextNode (virtualDOM, oldVirtualDOM, oldDOM) {
  if (virtualDOM.textContent !== oldVirtualDOM.props.textContent) {
    oldDOM.textContent = virtualDOM.props.textContent;
    oldDOM._virtualDOM = virtualDOM;
  } 

}