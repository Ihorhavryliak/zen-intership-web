import { AppStateType } from "../store";

export const getIsSuccessMessage = (state: AppStateType) => {
  return state.postReducer.isSuccess;
};

export const getAllMessageDataSelector = (state: AppStateType) => {
  return state.postReducer.messages;
};

export const getCountPageSelector = (state: AppStateType) => {
  return state.postReducer.countPage;
};

