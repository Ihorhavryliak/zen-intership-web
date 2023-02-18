import { AppStateType } from "../store";

export const getIsSuccessMessage = (state: AppStateType) => {
  return state.authReducer.isSuccess;
};

export const getAllMessageDataSelector = (state: AppStateType) => {
  return state.authReducer.messages;
};

