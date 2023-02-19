import {
  GetAllMessageAPIType,
  postMessageAPI,
} from "../../api/post_message_api";
import { BaseThunkType, InfersActionsTypes } from "../store";

let initialState = {
  messages: [] as GetAllMessageAPIType[],
  isSuccess: null as boolean | null,
};

const authReducer = (
  state = initialState,
  action: ActionCreatesTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_GET_NEW_DATA":
      return { ...state, messages: [...state.messages, ...[action.payload]] };

    default:
      return state;
  }
};

export const actions = {
  setNewData: (data: GetAllMessageAPIType) =>
    ({ type: "SET_GET_NEW_DATA", payload: data } as const),
};

//
export const onRegistration =
  (name: string, email: string, password: string): ThunkType =>
  async (dispatch) => {
    try {
      const data = await postMessageAPI.registrationDB(name, email, password);
      dispatch(actions.setNewData(data));
    } catch (err) {
      console.log(err);
    }
  };

export default authReducer;
export type InitialStateType = typeof initialState;
export type ActionCreatesTypes = InfersActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionCreatesTypes>;
