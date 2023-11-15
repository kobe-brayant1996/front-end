// import { INCREMENT, DECREMENT } from '../constants/counter';

// const initialStore = {
//   count: 0,
// }

// export default function reducer (state = initialStore, action) {
//   switch (action.type) {
//     case INCREMENT: {
//       return {
//         ...state,
//         count: state.count + action.payload
//       }
//     }
//     case DECREMENT: {
//       return {
//         ...state,
//         count: state.count - action.payload
//       }
//     }
//     default: {
//       return state;
//     }
//   }
// }


import { handleActions } from 'redux-actions';
import { increment, decrement } from '../actions/counter.action';

const initialStore = {
  count: 0
}

const handleIncrement = (state, action) => ({ count: state.count + action.payload})
const handleDecrement = (state, action) => ({ count: state.count - action.payload })

export default handleActions({
  [increment]: handleIncrement,
  [decrement]: handleDecrement,
}, initialStore);
 