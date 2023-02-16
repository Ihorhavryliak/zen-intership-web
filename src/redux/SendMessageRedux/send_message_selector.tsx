import { AppStateType } from "../store";

export const getIsSuccessMessage = (state: AppStateType) => {
  return state.sendMessageReducer.isSuccess;
};
