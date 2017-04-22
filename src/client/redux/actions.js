export const SET_CURRENT_USER_INFO = 'SET_CURRENT_USER_INFO';

export function setCurrentUserInfo(currentUserData) {
  return {
    type: SET_CURRENT_USER_INFO, currentUserData
  };
}
