import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1F7396",
    },
    secondary: {
      main: "#388e3c",
    },
    success: {
      main: "#27D3A8",
    },
    error: {
      main: "#EE7070",
    },
    warning: {
      main: "#F8B53A",
    },
    info: {
      main: "#D4E8FF",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
