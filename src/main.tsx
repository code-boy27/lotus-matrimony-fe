import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { store } from "./store";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <CssVarsProvider defaultMode="system">
            <CssBaseline />
            <div
              style={{
                backgroundImage: 'url("/bg-green-bg.svg")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
              }}
              className="light"
            >
              <App />
            </div>
          </CssVarsProvider>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
