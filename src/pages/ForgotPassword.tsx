import { useState } from "react";
import { Link } from "react-router-dom";
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
  CircularProgress,
} from "@mui/joy";
import { useToast } from "../components/ui/use-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleResetPassword = async (values: { email: string }) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, values.email);
      toast({
        title: "Success",
        description: "Password reset email sent! Please check your inbox.",
      });
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
      className="min-h-screen flex items-center justify-center"
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
          Forgot Password
        </Typography>
        <Typography level="body-sm" sx={{ mb: 3, textAlign: "center" }}>
          Enter your email address and we'll send you a link to reset your
          password
        </Typography>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleResetPassword}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
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

              <Button type="submit" fullWidth disabled={loading} sx={{ mt: 2 }}>
                {loading ? <CircularProgress size="sm" /> : "Reset Password"}
              </Button>
            </Form>
          )}
        </Formik>

        <Typography level="body-sm" sx={{ mt: 3, textAlign: "center" }}>
          Remember your password?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </Typography>
      </Box>
    </motion.div>
  );
}
