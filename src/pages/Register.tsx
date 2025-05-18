import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/joy";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { registerSuccess } from "../store/slices/authSlice";
import { useToast } from "../components/ui/use-toast";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import AuthCard from "../components/AuthCard";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register(): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleRegister = async (values: RegisterFormValues): Promise<void> => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(userCredential.user, {
        displayName: values.name,
      });

      dispatch(registerSuccess(userCredential.user));
      toast({
        title: "Success",
        description: "Registration successful!",
      });
      navigate("/dashboard");
    } catch (error) {
      const firebaseError = error as Error;
      toast({
        title: "Error",
        description: firebaseError.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create Account"
      subtitle="Join our community and find your perfect match"
    >
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <FormControl error={touched.name && !!errors.name}>
              <FormLabel>Name</FormLabel>
              <Field
                as={Input}
                name="name"
                placeholder="Enter your name"
                fullWidth
              />
              {touched.name && errors.name && (
                <Typography level="body-sm" color="danger">
                  {errors.name}
                </Typography>
              )}
            </FormControl>

            <FormControl error={touched.email && !!errors.email}>
              <FormLabel>Email</FormLabel>
              <Field
                as={Input}
                name="email"
                type="email"
                placeholder="Enter your email"
                fullWidth
              />
              {touched.email && errors.email && (
                <Typography level="body-sm" color="danger">
                  {errors.email}
                </Typography>
              )}
            </FormControl>

            <FormControl error={touched.password && !!errors.password}>
              <FormLabel>Password</FormLabel>
              <Field
                as={Input}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                fullWidth
                endDecorator={
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    variant="plain"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
              {touched.password && errors.password && (
                <Typography level="body-sm" color="danger">
                  {errors.password}
                </Typography>
              )}
            </FormControl>

            <FormControl
              error={touched.confirmPassword && !!errors.confirmPassword}
            >
              <FormLabel>Confirm Password</FormLabel>
              <Field
                as={Input}
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                fullWidth
                endDecorator={
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    variant="plain"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Typography level="body-sm" color="danger">
                  {errors.confirmPassword}
                </Typography>
              )}
            </FormControl>

            <Button type="submit" fullWidth disabled={loading} sx={{ mt: 2 }}>
              {loading ? <CircularProgress size="sm" /> : "Register"}
            </Button>
          </Form>
        )}
      </Formik>

      <Divider sx={{ my: 3 }}>
        <Typography level="body-sm" color="neutral">
          OR
        </Typography>
      </Divider>

      <Typography level="body-sm" sx={{ textAlign: "center" }}>
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Login
        </Link>
      </Typography>
    </AuthCard>
  );
}
