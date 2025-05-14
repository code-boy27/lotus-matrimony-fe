import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssVarsProvider, CssBaseline } from "@mui/joy";
import { Provider } from "react-redux";
import { store } from "./store";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <Provider store={store}>
      <CssVarsProvider>
        <CssBaseline />
        {/* <Router> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
        {/* </Router> */}
        <Toaster />
      </CssVarsProvider>
    </Provider>
  );
}
