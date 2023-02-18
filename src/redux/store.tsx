import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./AuthReducer/Auth_reducer";
import messageReducer from "./SendMessageRedux/send_message_redux";

const store = configureStore({
  reducer: {
    // @ts-ignore
    messageReducer,
      // @ts-ignore
    authReducer,
  },
});

export type AppStateType = ReturnType<typeof store.getState>;

export type InfersActionsTypes<T> = T extends {
  [keys: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
export type BaseThunkType<
  A extends Action = Action,
  R = Promise<void>
> = ThunkAction<R, AppStateType, unknown, A>;
export type AppDispatch = typeof store.dispatch;

export default store;
