import { takeEvery, put, delay } from 'redux-saga/effects';
import { increment } from '../actions/counter.action';
import { INCREMENT_ASYNC } from '../constants/counter';

// takeEvery 接收 actions
// put 触发 action

function* decrement_async_fn(action) {
    console.log(action)
    yield delay(2000);
    yield put(increment(action.payload));
}

export default function* counterSaga() {
    yield takeEvery(INCREMENT_ASYNC, decrement_async_fn)
}
