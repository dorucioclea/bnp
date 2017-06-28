export const SET_CURRENT_USER_INFO = 'SET_CURRENT_USER_INFO';
export const UPDATE_USER_LANGUAGE = 'UPDATE_USER_LANGUAGE';

export function setCurrentUserInfo(currentUserData) {
  return {
    type: SET_CURRENT_USER_INFO, currentUserData
  };
}

export function changeUserLanguage(currentUserData) {
  return {
    type: UPDATE_USER_LANGUAGE, currentUserData
  };
}
