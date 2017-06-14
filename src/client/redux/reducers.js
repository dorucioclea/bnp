import { SET_CURRENT_USER_INFO, UPDATE_USER_LANGUAGE } from './actions';

function simRootApplicationReducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_USER_INFO:
      {
        return {
          currentUserData: action.currentUserData
        };
      }
      case UPDATE_USER_LANGUAGE:
      {
        return {
          currentUserData: action.currentUserData
        };
      }
    default:
      {
        return state;
      }
  }
}

export default simRootApplicationReducer;
