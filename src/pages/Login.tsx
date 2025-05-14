import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { CssVarsProvider } from "@mui/joy/styles";
import {
  Sheet,
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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleLogin = async (
    values: LoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
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

  const handleGoogleLogin = async () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <CssVarsProvider>
      <div className="flex min-h-screen items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Sheet
            variant="outlined"
            className="rounded-xl shadow-xl overflow-hidden"
            sx={{
              p: 4,
              borderRadius: "xl",
              boxShadow: "lg",
              backgroundColor: "background.surface",
              backgroundImage: `url('/green-bg.svg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-4"
            >
              <img src="/lotus-logo.png" alt="Lotus Logo" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography
                level="h3"
                className="text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-purple-500 mb-2"
              >
                Welcome Back
              </Typography>
              <Typography level="body-sm" className="text-center mb-6">
                Sign in to continue to your account
              </Typography>
            </motion.div>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginValidationSchema}
              onSubmit={handleLogin}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <motion.div className="space-y-4" variants={itemVariants}>
                    <FormControl error={touched.email && Boolean(errors.email)}>
                      <FormLabel>Email</FormLabel>
                      <Field
                        as={Input}
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        startDecorator={<i className="fas fa-envelope"></i>}
                        fullWidth
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
                      <Link
                        to="/forgot-password"
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Forgot password?
                      </Link>
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
                      {isSubmitting ? (
                        <CircularProgress size="sm" />
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </motion.div>

                  <motion.div variants={itemVariants} className="mt-6">
                    <Divider>
                      <Typography level="body-xs" className="text-gray-500">
                        OR CONTINUE WITH
                      </Typography>
                    </Divider>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="mt-6 flex flex-col gap-2"
                  >
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
                    {/* <Button
                      variant="outlined"
                      color="neutral"
                      fullWidth
                      startDecorator={<GitHub />}
                    >
                      GitHub
                    </Button> */}
                  </motion.div>
                </Form>
              )}
            </Formik>

            <motion.div variants={itemVariants} className="mt-6 text-center">
              <Typography level="body-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Sign up
                </Link>
              </Typography>
            </motion.div>
          </Sheet>
        </motion.div>
      </div>
    </CssVarsProvider>
  );
};

export default Login;
