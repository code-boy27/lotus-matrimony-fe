import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/joy";
import { LockOutlined } from "@mui/icons-material";
import type { FormikProps } from "formik";
import type { ProfileFormValues } from "../../../types/profile";

interface ContactInfoFormProps {
  formik: FormikProps<ProfileFormValues>;
}

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ formik }) => {
  const { values, errors, touched, handleChange } = formik;

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3,
          }}
        >
          <LockOutlined fontSize="small" color="warning" />
          <Typography level="title-md">
            Contact Information (Private)
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="privateData.email"
                value={values.privateData.email || ""}
                disabled
                placeholder="Your email"
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl
              error={
                touched.privateData?.phone && Boolean(errors.privateData?.phone)
              }
            >
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="privateData.phone"
                value={values.privateData.phone || ""}
                onChange={handleChange}
                placeholder="Your phone number"
              />
              {touched.privateData?.phone && errors.privateData?.phone && (
                <FormHelperText>{errors.privateData.phone}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl
              error={
                touched.privateData?.height &&
                Boolean(errors.privateData?.height)
              }
            >
              <FormLabel>Height (cm)</FormLabel>
              <Input
                name="privateData.height"
                type="number"
                value={values.privateData.height || ""}
                onChange={handleChange}
                placeholder="Your height in cm"
              />
              {touched.privateData?.height && errors.privateData?.height && (
                <FormHelperText>{errors.privateData.height}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Caste/Community</FormLabel>
              <Input
                name="privateData.caste"
                value={values.privateData.caste || ""}
                onChange={handleChange}
                placeholder="Your caste/community"
              />
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ContactInfoForm;
