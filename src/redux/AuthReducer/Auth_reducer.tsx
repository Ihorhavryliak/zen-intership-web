import { authAPI, GetUserType } from "../../api/auth_api";
import { getTokenId } from "../../utils/getTokenId";
import { BaseThunkType, InfersActionsTypes } from "../store";

let initialState = {
  user: [] as GetUserType[],
  isSuccess: null as boolean | null,
};

const authReducer = (
  state = initialState,
  action: ActionCreatesTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_CLEAN_DATA":
      return { user: [], isSuccess: null };

    case "SET_USER":
      return { ...state, user: [action.payload] };

    case "SET_IS_SUCCESS":
      return { ...state, isSuccess: action.payload };
    default:
      return state;
  }
};

export const actions = {
  setIsSuccess: (data: boolean | null) =>
    ({ type: "SET_IS_SUCCESS", payload: data } as const),
  setUser: (data: GetUserType) =>
    ({ type: "SET_USER", payload: data } as const),
  setCleanData: () => ({ type: "SET_CLEAN_DATA" } as const),
};

//
export const cleanAllData = (): ThunkType => async (dispatch) => {
  try {
    dispatch(actions.setCleanData());
  } catch (err) {
    console.log(err);
    dispatch(actions.setIsSuccess(false));
  }
};

//
export const getUser =
  (id: string): ThunkType =>
  async (dispatch) => {
    if (id.length === 0) {
      return;
    }
    try {
      const data = await authAPI.getUser(+id);
      dispatch(actions.setUser(data));
      dispatch(actions.setIsSuccess(true));
    } catch (err) {
      dispatch(actions.setIsSuccess(false));
      console.log(err);
    }
  };

//
export const login =
  (email: string, password: string): ThunkType =>
  async (dispatch) => {
    try {
      const data = await authAPI.loginDB(email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch(getUser(getTokenId()));
        dispatch(actions.setIsSuccess(true));
      }
      dispatch(actions.setIsSuccess(true));
    } catch (err) {
      dispatch(actions.setIsSuccess(false));
      console.log(err);
    }
  };
//
export const logOut = (): ThunkType => async (dispatch) => {
  try {
    //delete token
    localStorage.removeItem("token");
    dispatch(cleanAllData());
  } catch (err) {
    console.log(err);
    dispatch(actions.setIsSuccess(false));
  }
};
//
export const onRegistration =
  (name: string, email: string, password: string): ThunkType =>
  async (dispatch) => {
    try {
      const data = await authAPI.registrationDB(name, email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch(getUser(getTokenId()));
        dispatch(actions.setIsSuccess(true));
      }
      dispatch(actions.setIsSuccess(false));
    } catch (err) {
      dispatch(actions.setIsSuccess(false));
      console.log(err);
    }
  };

export default authReducer;
export type InitialStateType = typeof initialState;
export type ActionCreatesTypes = InfersActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionCreatesTypes>;
