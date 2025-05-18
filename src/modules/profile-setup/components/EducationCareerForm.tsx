import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/joy";
import { PublicOutlined, LockOutlined } from "@mui/icons-material";
import type { FormikProps } from "formik";
import type { ProfileFormValues } from "../../../types/profile";

interface EducationCareerFormProps {
  formik: FormikProps<ProfileFormValues>;
}

const EducationCareerForm: React.FC<EducationCareerFormProps> = ({
  formik,
}) => {
  const { values, handleChange } = formik;

  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <PublicOutlined fontSize="small" color="success" />
          <Typography level="title-md">Education & Career (Public)</Typography>
        </div>

        <Grid container spacing={2}>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Education</FormLabel>
              <Input
                name="publicData.education"
                value={values.publicData.education || ""}
                onChange={handleChange}
                placeholder="Highest qualification"
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Occupation</FormLabel>
              <Input
                name="publicData.occupation"
                value={values.publicData.occupation || ""}
                onChange={handleChange}
                placeholder="Your profession"
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Annual Income</FormLabel>
              <Input
                name="privateData.income"
                value={values.privateData.income || ""}
                onChange={handleChange}
                placeholder="Annual income"
              />
              <FormHelperText>
                <LockOutlined fontSize="small" className="align-middle mr-1" />
                Only visible to subscribed users
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EducationCareerForm;
