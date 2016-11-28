export const SET_CURRENT_USER_INFO = 'SET_CURRENT_USER_INFO';

export function setCurrentUserInfo(currentUserInfo) {
  return {
    type: SET_CURRENT_USER_INFO, currentUserInfo
  };
}
