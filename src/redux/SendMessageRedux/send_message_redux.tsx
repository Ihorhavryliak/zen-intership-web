import { sendMessageAPI } from "../../api/send_message_api";
import { BaseThunkType, InfersActionsTypes } from "../store";

let initialState = {
  isSuccess: null as boolean | null,
};

const sendMessageReducer = (
  state = initialState,
  action: ActionCreatesTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_IS_SUCCESS":
      return { ...state, isSuccess: action.payload };
    default:
      return state;
  }
};

export const actions = {
  setIsSuccess: (data: boolean) =>
    ({ type: "SET_IS_SUCCESS", payload: data } as const),
};

//delete Portfolio
export const sendMessage =
  (name: string, email: string, message: string): ThunkType =>
  async (dispatch) => {
    try {
      const data = await sendMessageAPI.sendMessageDB(name, email, message);
      if (data.status === 200) {
        dispatch(actions.setIsSuccess(true));
      }
    } catch (err) {
      console.log(err);
      dispatch(actions.setIsSuccess(false));
    }
  };

export default sendMessageReducer;
export type InitialStateType = typeof initialState;
export type ActionCreatesTypes = InfersActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionCreatesTypes>;
