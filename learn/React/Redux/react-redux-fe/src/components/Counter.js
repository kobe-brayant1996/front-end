import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from '../store/actions/counter.action';


function Counter (props) {
  const { count, increment, decrement} = props;
  return (
    <div>
      <button onClick={() => increment(100)}>
        +
      </button>
      <span>{count}</span>
      <button onClick={() => decrement(100)}>
        -
      </button>
    </div>
  )
}

// 1. connect 方法会帮助我们订阅 store， 当 store 中的状态发生更改的时候会帮助重新渲染组件
// 2. connect 方法可以让我们获取 store 中的状态， 将状态通过组件的props属性映射给组件
// 3. connect 方法可以让我们获取 dispatch 方法

const mapStateToProps = state => (
  {
    count: state.counter.count,
    a: 'a'
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(counterActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
