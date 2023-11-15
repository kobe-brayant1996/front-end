import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import saga from './saga';


// 创建 sagaMiddleware
const sagaMiddleware = createSagaMiddleware();


const store = createStore(reducer, applyMiddleware(sagaMiddleware));

export default store;

sagaMiddleware.run(saga);