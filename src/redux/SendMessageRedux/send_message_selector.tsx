import { AppStateType } from "../store";

export const getIsSuccessMessage = (state: AppStateType) => {
  return state.sendMessageReducer.isSuccess;
};

export const getAllMessageDataSelector = (state: AppStateType) => {
  return state.sendMessageReducer.messages;
};

