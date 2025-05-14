import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
  Box,
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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleRegister = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <Box
        className="border"
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
          <img src="/lotus-logo.png" alt="Lotus Logo" className="h-56 w-96" />
        </motion.div>
        <Typography level="h2" sx={{ mb: 2, textAlign: "center" }}>
          Create Account
        </Typography>
        <Typography level="body-sm" sx={{ mb: 3, textAlign: "center" }}>
          Join our community and find your perfect match
        </Typography>

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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
      </Box>
    </motion.div>
  );
}
