import { takeEvery, put, delay } from 'redux-saga/effects';
import { hide } from '../actions/modal.action';

// takeEvery 接收 actions
// put 触发 action

function* hide_async_fn(action) {
    console.log(action)
    yield delay(2000);
    yield put(hide(action.payload));
}

export default function* modalSaga() {
    yield takeEvery('hide_modal_async', hide_async_fn)
}
