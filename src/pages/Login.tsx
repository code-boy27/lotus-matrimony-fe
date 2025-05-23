import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  Typography,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  CircularProgress,
  FormHelperText,
  IconButton,
  Box,
} from "@mui/joy";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../store/slices/authSlice";
import { useToast } from "../components/ui/use-toast";
import { motion } from "framer-motion";

// Decorative Plant SVG Component
const PlantBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-10"
    viewBox="0 0 800 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M400 100C400 100 300 200 300 300C300 400 400 500 400 500C400 500 500 400 500 300C500 200 400 100 400 100Z"
      fill="currentColor"
    />
    <path
      d="M400 100C400 100 350 150 350 250C350 350 400 450 400 450C400 450 450 350 450 250C450 150 400 100 400 100Z"
      fill="currentColor"
    />
    <path
      d="M400 100C400 100 380 120 380 220C380 320 400 420 400 420C400 420 420 320 420 220C420 120 400 100 400 100Z"
      fill="currentColor"
    />
  </svg>
);

interface LoginFormValues {
  email: string;
  password: string;
}

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// Shared gradient styles
const gradientStyles = {
  background: "bg-gradient-to-br from-rose-400 via-pink-500 to-orange-400",
  hover: "hover:from-rose-500 hover:via-pink-600 hover:to-orange-500",
  text: "bg-gradient-to-r from-rose-400 via-pink-500 to-orange-400",
  overlay: "bg-gradient-to-tr from-pink-600/30 to-orange-600/30",
  glow: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent",
};

const Login = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleForgotPassword = (e: React.MouseEvent): void => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  const handleLogin = async (
    values: LoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): Promise<void> => {
    try {
      dispatch(loginStart());
      const userCredential = await login(values.email, values.password);
      dispatch(loginSuccess(userCredential.user));
      toast({
        title: "Success!",
        description: "You have successfully logged in",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      dispatch(
        loginFailure(
          error instanceof Error ? error.message : "An error occurred"
        )
      );
      toast({
        variant: "destructive",
        title: "Login Failed",
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      dispatch(loginStart());
      const userCredential = await signInWithGoogle();
      dispatch(loginSuccess(userCredential.user));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      dispatch(
        loginFailure(
          error instanceof Error ? error.message : "An error occurred"
        )
      );
      toast({
        variant: "destructive",
        title: "Google Login Failed",
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Gradient Background with Multiple Layers */}
        <div className={`absolute inset-0 ${gradientStyles.background}`}></div>
        <div className={`absolute inset-0 ${gradientStyles.overlay}`}></div>
        <div className={`absolute inset-0 ${gradientStyles.glow}`}></div>
        <PlantBackground />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <img
              src="/lotus-logo.png"
              alt="Lotus Buddhist Matrimony"
              className="w-32 h-32 mx-auto mb-8 drop-shadow-lg"
            />
            <Typography
              level="h1"
              className="text-4xl font-bold mb-4 text-white drop-shadow-lg"
              sx={{
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                background: "linear-gradient(to right, #fff, #f3f4f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Lotus Buddhist Matrimony
            </Typography>
            <Typography
              level="body-lg"
              className="text-white/95 max-w-md drop-shadow-md"
              sx={{
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Find your perfect match in a community that shares your values and
              beliefs
            </Typography>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Typography
              level="h2"
              className="text-2xl font-bold text-gray-800 mb-2"
            >
              Welcome Back
            </Typography>
            <Typography level="body-md" className="text-gray-600">
              Sign in to continue your journey
            </Typography>
          </div>

          <Box className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginValidationSchema}
              onSubmit={handleLogin}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="space-y-4">
                    <FormControl error={touched.email && Boolean(errors.email)}>
                      <FormLabel>Email</FormLabel>
                      <Field
                        as={Input}
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        fullWidth
                        className="bg-gray-50"
                      />
                      {touched.email && errors.email && (
                        <FormHelperText>{errors.email}</FormHelperText>
                      )}
                    </FormControl>

                    <FormControl
                      error={touched.password && Boolean(errors.password)}
                    >
                      <FormLabel>Password</FormLabel>
                      <Field
                        as={Input}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="bg-gray-50"
                        endDecorator={
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            color="neutral"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        }
                        fullWidth
                      />
                      {touched.password && errors.password && (
                        <FormHelperText>{errors.password}</FormHelperText>
                      )}
                    </FormControl>

                    <div className="flex justify-end">
                      <Typography
                        level="body-sm"
                        className="text-primary-500 cursor-pointer hover:text-primary-600"
                        onClick={handleForgotPassword}
                      >
                        Forgot password?
                      </Typography>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      fullWidth
                      loading={isSubmitting}
                      variant="solid"
                      color="primary"
                      className={`mt-4 ${gradientStyles.background} ${gradientStyles.hover}`}
                    >
                      {isSubmitting ? (
                        <CircularProgress size="sm" />
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="mt-6">
              <Divider>
                <Typography level="body-xs" className="text-gray-500">
                  OR CONTINUE WITH
                </Typography>
              </Divider>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Button
                variant="outlined"
                color="neutral"
                fullWidth
                onClick={handleGoogleLogin}
                startDecorator={
                  <img
                    src="/google-icon.svg"
                    alt="Google Icon"
                    width="24"
                    height="24"
                  />
                }
                className="bg-white hover:bg-gray-50 border-gray-200"
              >
                Continue with Google
              </Button>
            </div>

            <div className="mt-6 text-center">
              <Typography level="body-sm" className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary-500 font-medium hover:text-primary-600"
                >
                  Sign up
                </Link>
              </Typography>
            </div>
          </Box>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
