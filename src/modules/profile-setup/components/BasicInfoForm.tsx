import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  FormHelperText,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/joy";
import { PublicOutlined } from "@mui/icons-material";
import type { FormikProps } from "formik";
import type { ProfileFormValues } from "../../../types/profile";

interface BasicInfoFormProps {
  formik: FormikProps<ProfileFormValues>;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ formik }) => {
  const { values, errors, touched, handleChange, setFieldValue } = formik;

  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <PublicOutlined fontSize="small" color="success" />
          <Typography level="title-md">Basic Information (Public)</Typography>
        </div>

        <Grid container spacing={2}>
          <Grid xs={12}>
            <FormControl
              error={
                touched.publicData?.name && Boolean(errors.publicData?.name)
              }
            >
              <FormLabel>Full Name *</FormLabel>
              <Input
                name="publicData.name"
                value={values.publicData.name || ""}
                onChange={handleChange}
                placeholder="Your full name"
              />
              {touched.publicData?.name && errors.publicData?.name && (
                <FormHelperText>{errors.publicData.name}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl
              error={
                touched.publicData?.gender && Boolean(errors.publicData?.gender)
              }
            >
              <FormLabel>Gender *</FormLabel>
              <Select
                name="publicData.gender"
                value={values.publicData.gender || ""}
                onChange={(_, value) =>
                  setFieldValue("publicData.gender", value)
                }
                placeholder="Select gender"
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
              {touched.publicData?.gender && errors.publicData?.gender && (
                <FormHelperText>{errors.publicData.gender}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl
              error={
                touched.publicData?.birthDate &&
                Boolean(errors.publicData?.birthDate)
              }
            >
              <FormLabel>Birth Date *</FormLabel>
              <Input
                name="publicData.birthDate"
                type="date"
                value={values.publicData.birthDate || ""}
                onChange={handleChange}
              />
              {touched.publicData?.birthDate &&
                errors.publicData?.birthDate && (
                  <FormHelperText>{errors.publicData.birthDate}</FormHelperText>
                )}
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                name="publicData.location"
                value={values.publicData.location || ""}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Religion</FormLabel>
              <Input
                name="publicData.religion"
                value={values.publicData.religion || ""}
                onChange={handleChange}
                placeholder="Your religion"
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Mother Tongue</FormLabel>
              <Input
                name="publicData.motherTongue"
                value={values.publicData.motherTongue || ""}
                onChange={handleChange}
                placeholder="Your mother tongue"
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Marital Status</FormLabel>
              <Select
                name="publicData.maritalStatus"
                value={values.publicData.maritalStatus || ""}
                onChange={(_, value) =>
                  setFieldValue("publicData.maritalStatus", value)
                }
                placeholder="Select status"
              >
                <Option value="never_married">Never Married</Option>
                <Option value="divorced">Divorced</Option>
                <Option value="widowed">Widowed</Option>
                <Option value="separated">Separated</Option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BasicInfoForm;
