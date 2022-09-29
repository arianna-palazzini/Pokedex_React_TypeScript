import { combineReducers } from "redux";
import reducer from "../reducer";

export const reducerStore = combineReducers({
    general: reducer
})

export type RootState = ReturnType<typeof reducerStore>