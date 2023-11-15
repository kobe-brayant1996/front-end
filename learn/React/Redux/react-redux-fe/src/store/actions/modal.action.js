import { HIDEMODAL, SHOWMODAL } from '../constants/modal';

const show = () => ({type: SHOWMODAL});
const hide = () => ({ type: HIDEMODAL });

const show_async = () => dispatch => {
  setTimeout(() => {
    dispatch(show());
  }, 1000);
}

const hide_async = (payload) => ({ type: 'hide_modal_async', payload })

export {
  hide, show,
  show_async,
  hide_async
};
