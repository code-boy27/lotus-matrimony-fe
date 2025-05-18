import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "./components/ui/toaster";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { store } from "./store/store";

import BrowseMatches from "./pages/BrowseMatches";
import ProfileSetupPage from "./modules/profile-setup/ProfileSetupPage";

export default function App() {
  return (
    <Provider store={store}>
      <CssVarsProvider>
        <CssBaseline />
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
          <Route path="/profile-setup" element={<ProfileSetupPage />} />
          <Route path="/browse-matches" element={<BrowseMatches />} />

          <Route path="/" element={<Login />} />
        </Routes>

        <Toaster />
      </CssVarsProvider>
    </Provider>
  );
}
