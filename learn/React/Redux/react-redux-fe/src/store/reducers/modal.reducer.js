import { SHOWMODAL, HIDEMODAL } from '../constants/modal';

const initialStore = {
  show: true,
}

export default function reducer (state = initialStore, action) {
  switch (action.type) {
    case SHOWMODAL: {
      return {
        ...state,
        show: true
      }
    }
    case HIDEMODAL: {
      return {
        ...state,
        show: false
      }
    }
    default: {
      return state;
    }
  }
}