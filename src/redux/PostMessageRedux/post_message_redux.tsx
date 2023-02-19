import {
  GetAllMessageAPIType,
  GetAllMessageNewAPIType,
  SendAnswerType,
  postMessageAPI,
} from "../../api/post_message_api";
import { BaseThunkType, InfersActionsTypes } from "../store";

let initialState = {
  messages: [] as GetAllMessageNewAPIType[],
  isSuccess: null as boolean | null,
  countPage: 0 as number,
};

const postReducer = (
  state = initialState,
  action: ActionCreatesTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_POST":
      return { ...state, messages: [...[action.payload], ...state.messages] };
    case "SET_GET_NEW_ANSWER_DATA":
      return {
        ...state,
        messages: state.messages.map((data) => {
          if (data.id === action.payload.childId) {
            return { ...data, child: [...data.child, ...[action.payload]] };
          }
          return data;
        }),
      };
    case "SET_GET_NEW_DATA":
      return {
        ...state,
        messages: [...state.messages, ...action.payload.rows],
        countPage: action.payload.count,
      };
    case "SET_GET_ALL_MESSAGE":
      return {
        ...state,
        messages: action.payload.rows,
        countPage: action.payload.count,
      };
    case "SET_IS_SUCCESS":
      return { ...state, isSuccess: action.payload };
    default:
      return state;
  }
};
//
export const actions = {
  setNewAnswerData: (data: SendAnswerType) =>
    ({ type: "SET_GET_NEW_ANSWER_DATA", payload: data } as const),
  setPost: (data: GetAllMessageNewAPIType) =>
    ({ type: "SET_POST", payload: data } as const),
  setNewData: (data: GetAllMessageAPIType) =>
    ({ type: "SET_GET_NEW_DATA", payload: data } as const),
  setGetAllMessage: (data: GetAllMessageAPIType) =>
    ({ type: "SET_GET_ALL_MESSAGE", payload: data } as const),
  setIsSuccess: (data: boolean) =>
    ({ type: "SET_IS_SUCCESS", payload: data } as const),
};
//

export const getPostOrderByName =
  (name: string, page: number): ThunkType =>
  async (dispatch) => {
    try {
      const data = await postMessageAPI.getPostOrderByNameDB(name, page);
      dispatch(actions.setGetAllMessage(data));
    } catch (err) {
      console.log(err);
    }
  };
//
export const sendAnswer =
  (
    name: string,
    email: string,
    message: string,
    home: string,
    childId: number,
    selectedFile: any
  ): ThunkType =>
  async (dispatch) => {
    try {
      await postMessageAPI.postAnswerDB(
        name,
        email,
        message,
        home,
        childId,
        selectedFile
      );
      dispatch(actions.setIsSuccess(true)); //
    } catch (err) {
      console.log(err);
      dispatch(actions.setIsSuccess(false));
    }
  };
//
export const getAllMessage = (): ThunkType => async (dispatch) => {
  try {
    const data = await postMessageAPI.getPostOrderByNameDB();
    dispatch(actions.setGetAllMessage(data));
  } catch (err) {
    console.log(err);
  }
};
//set data from Websocket
export const setWebsocket =
  (data: GetAllMessageNewAPIType | SendAnswerType): ThunkType =>
  async (dispatch) => {
    try {
      if (!data.childId && data.childId === null) {
        dispatch(actions.setPost(data as GetAllMessageNewAPIType));
      } else {
        dispatch(actions.setNewAnswerData(data)); //TO DO
      }
    } catch (err) {
      console.log(err);
    }
  };
//
export const postMessage =
  (
    name: string,
    email: string,
    message: string,
    home: string,
    selectedFile: any
  ): ThunkType =>
  async (dispatch) => {
    try {
      await postMessageAPI.postMessageDB(
        name,
        email,
        message,
        home,
        selectedFile
      );
      dispatch(actions.setIsSuccess(true)); //
    } catch (err) {
      console.log(err);
      dispatch(actions.setIsSuccess(false));
    }
  };

export default postReducer;
export type InitialStateType = typeof initialState;
export type ActionCreatesTypes = InfersActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionCreatesTypes>;
