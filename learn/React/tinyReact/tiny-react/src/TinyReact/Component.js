import diff from "./diff";

export default class Component {
  constructor (props) {
    this.props = props
  }

  setState (state) {
    this.state = Object.assign({}, this.state, state)
    // 获取最新渲染的 VirtualDOM
    let virtualDOM = this.render()
    // 获取旧的 virtualDOM 对象 进行比对
    let oldDOM = this.getDOM();
    // 获取容器
    const container = oldDOM.parentNode;
    // 对比
    diff(virtualDOM, container, oldDOM)
  }

  setDOM (dom) {
    this._dom = dom;
  }

  getDOM () {
    return this._dom;
  }
  updateProps (props) {
    this.props = props
  }

  // 生命周期函数
  componentWillMount () {}
  componentDidMount () {}
  componentWillReceiveProps (nextProps) {}
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps != this.props || nextState != this.state
  }
  componentWillUpdate (nextProps, nextState) {}
  componentDidUpdate (prevProps, preState) {}
  componentWillUnMount () {}

}