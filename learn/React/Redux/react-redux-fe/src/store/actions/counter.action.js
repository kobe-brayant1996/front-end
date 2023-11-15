// import { INCREMENT_ASYNC } from "../constants/counter";

// const increment = (payload) => ({type: 'increment', payload});
// const decrement = (payload) => ({ type: 'decrement', payload });


// const increment_async = (payload) => dispatch => {
//   setTimeout(() => {
//     dispatch(increment(payload));
//   }, 2000);
// }

// const decrement_async = (payload) => ({ type: INCREMENT_ASYNC, payload })

// export {
//   decrement,
//   increment,
//   increment_async,
//   decrement_async
// };


import { createAction } from 'redux-actions';

export const increment = createAction('increment')
export const decrement = createAction('decrement')
