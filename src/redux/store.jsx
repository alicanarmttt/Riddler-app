import { configureStore } from "@reduxjs/toolkit";
import riddleReducer from "./slices/riddleSlice";
export const store = configureStore({
  reducer: {
    riddle: riddleReducer,
  },
});

export default store;
