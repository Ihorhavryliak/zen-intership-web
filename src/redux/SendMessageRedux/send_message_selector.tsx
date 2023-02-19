import { AppStateType } from "../store";

export const getIsSuccessMessage = (state: AppStateType) => {
  return state.messageReducer.isSuccess;
};

export const getAllMessageDataSelector = (state: AppStateType) => {
  return state.messageReducer.messages;
};

export const getCountPageSelector = (state: AppStateType) => {
  return state.messageReducer.countPage;
};

