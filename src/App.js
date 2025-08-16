import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "./store";
import { theme } from "./styles/theme";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainLayout />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
