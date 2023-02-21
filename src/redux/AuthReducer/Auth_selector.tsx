import { AppStateType } from "../store";

export const getIsSuccessMessage = (state: AppStateType) => {
  return state.authReducer.isSuccess;
};

export const getUserDataSelector = (state: AppStateType) => {
  return state.authReducer.user;
};
