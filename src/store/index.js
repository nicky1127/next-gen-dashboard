import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice";
import appReducer from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export default store;
