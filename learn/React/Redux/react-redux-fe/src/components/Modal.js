import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from '../store/actions/modal.action';

function Modal (props) {

  const { showStatus, show_async, hide_async } = props;

  const styles = {
    width: 200,
    height: 200,
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -100,
    marginTop: -100,
    backgroundColor: 'skyblue',
    display: showStatus ? 'block' : 'none'
  }

  return (
    <div>
      <button onClick={() => { show_async(); console.log(showStatus) }}>显示</button>
      <button>隐藏</button>
      <div onClick={() => {hide_async(false); console.log(showStatus)}} style={styles}></div>
    </div>
  )
}

const mapStateToProps = state => ({
  showStatus: state.modal.show,
})

const mapDispatchToProps = dispatch => bindActionCreators(modalActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
