import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
  CircularProgress,
} from "@mui/joy";
import { useToast } from "../components/ui/use-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import AuthCard from "../components/AuthCard";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPassword(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleResetPassword = async (
    values: ForgotPasswordFormValues
  ): Promise<void> => {
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

  return (
    <AuthCard
      title="Forgot Password"
      subtitle="Enter your email address and we'll send you a link to reset your password"
    >
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
    </AuthCard>
  );
}
