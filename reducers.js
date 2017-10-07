import { 
  GET_INFO_SUCCESS,
  SAVE_KEY_SUCCESS
} from './actions';

export default function(state={}, action) {
  switch(action.type) {
    case GET_INFO_SUCCESS:
      return Object.assign({}, {
        info: action.payload
      })
    case SAVE_KEY_SUCCESS:
      return Object.assign({}, {
        key: action.payload
      })
    default:
      return state
  }
}
