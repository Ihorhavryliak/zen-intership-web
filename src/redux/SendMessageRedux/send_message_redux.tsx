import {
  GetAllMessageAPIType,
  sendMessageAPI,
} from "../../api/post_message_api";
import { BaseThunkType, InfersActionsTypes } from "../store";

let initialState = {
  messages: [] as GetAllMessageAPIType[],
  isSuccess: null as boolean | null,
};

const messageReducer = (
  state = initialState,
  action: ActionCreatesTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_POST":
      return { ...state, messages: [...state.messages, ...[action.payload]] };
    case "SET_GET_NEW_DATA":
      return { ...state, messages: [...state.messages, ...[action.payload]] };
    case "SET_GET_ALL_MESSAGE":
      return { ...state, messages: action.payload };
    case "SET_IS_SUCCESS":
      return { ...state, isSuccess: action.payload };
    default:
      return state;
  }
};

export const actions = {
  setPost: (data: GetAllMessageAPIType) =>
  ({ type: "SET_POST", payload: data } as const),
  setNewData: (data: GetAllMessageAPIType) =>
  ({ type: "SET_GET_NEW_DATA", payload: data } as const),
  setGetAllMessage: (data: GetAllMessageAPIType[]) =>
    ({ type: "SET_GET_ALL_MESSAGE", payload: data } as const),
  setIsSuccess: (data: boolean) =>
    ({ type: "SET_IS_SUCCESS", payload: data } as const),
};

//
export const getAllMessage = (): ThunkType => async (dispatch) => {
  try {
    const data = await sendMessageAPI.getAllMessageAPI();
    dispatch(actions.setGetAllMessage(data));
  } catch (err) {
    console.log(err);
  }
};

//set data from Websocket
export const setWebsocket =
  (data: GetAllMessageAPIType): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(actions.setPost(data));
    } catch (err) {
      console.log(err);

    }
  };
//
//
export const sendMessage =
  (name: string, email: string, message: string, home: string, selectedFile: any): ThunkType =>
  async (dispatch) => {
    try {
     const data = await sendMessageAPI.sendMessageDB(name, email, message, home, selectedFile);
 
      dispatch(actions.setIsSuccess(true));//
      dispatch(actions.setNewData(data));
    } catch (err) {
      console.log(err);
      dispatch(actions.setIsSuccess(false));
    }
  };

export default messageReducer;
export type InitialStateType = typeof initialState;
export type ActionCreatesTypes = InfersActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionCreatesTypes>;
