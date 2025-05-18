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
} from "@mui/joy";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../store/slices/authSlice";
import { useToast } from "../components/ui/use-toast";
import AuthCard from "../components/AuthCard";

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
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to continue to your account"
    >
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
                />
                {touched.email && errors.email && (
                  <FormHelperText>{errors.email}</FormHelperText>
                )}
              </FormControl>

              <FormControl error={touched.password && Boolean(errors.password)}>
                <FormLabel>Password</FormLabel>
                <Field
                  as={Input}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
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
                  sx={{
                    color: "primary.500",
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
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
                className="mt-4"
              >
                {isSubmitting ? <CircularProgress size="sm" /> : "Sign In"}
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
          color="primary"
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
          sx={{
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          Google
        </Button>
      </div>

      <div className="mt-6 text-center">
        <Typography level="body-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign up
          </Link>
        </Typography>
      </div>
    </AuthCard>
  );
};

export default Login;
