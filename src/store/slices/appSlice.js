import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  splashVisible: true,
  theme: "light",
  sidebarOpen: false,
  notifications: [],
  loading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSplashVisible: (state, action) => {
      state.splashVisible = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    setAppLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setSplashVisible,
  setTheme,
  toggleSidebar,
  addNotification,
  removeNotification,
  setAppLoading,
} = appSlice.actions;

export default appSlice.reducer;
