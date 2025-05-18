import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
