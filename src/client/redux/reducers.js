import { SET_CURRENT_USER_INFO } from './actions';

function simRootApplicationReducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_USER_INFO:
      {
        return {
          currentUserInfo: action.currentUserInfo
        };
      }
    default:
      {
        return state;
      }
  }
}

export default simRootApplicationReducer;
