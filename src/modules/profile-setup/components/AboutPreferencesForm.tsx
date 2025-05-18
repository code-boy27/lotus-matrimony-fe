import React from "react";
import {
  FormControl,
  FormLabel,
  Textarea,
  Stack,
  Card,
  CardContent,
  Typography,
} from "@mui/joy";
import { PublicOutlined, LockOutlined } from "@mui/icons-material";
import type { FormikProps } from "formik";
import type { ProfileFormValues } from "../../../types/profile";

interface AboutPreferencesFormProps {
  formik: FormikProps<ProfileFormValues>;
}

const AboutPreferencesForm: React.FC<AboutPreferencesFormProps> = ({
  formik,
}) => {
  const { values, handleChange } = formik;

  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <Typography level="title-md">About Me & Preferences</Typography>
        </div>

        <Stack spacing={3}>
          <FormControl>
            <FormLabel>
              <PublicOutlined fontSize="small" className="align-middle mr-1" />
              About Me (Public)
            </FormLabel>
            <Textarea
              name="publicData.about"
              value={values.publicData.about || ""}
              onChange={handleChange}
              minRows={3}
              placeholder="Write something about yourself..."
            />
          </FormControl>

          <FormControl>
            <FormLabel>
              <LockOutlined fontSize="small" className="align-middle mr-1" />
              Hobbies & Interests (Private)
            </FormLabel>
            <Textarea
              name="privateData.hobbies"
              value={values.privateData.hobbies || ""}
              onChange={handleChange}
              minRows={2}
              placeholder="Your hobbies and interests..."
            />
          </FormControl>

          <FormControl>
            <FormLabel>
              <LockOutlined fontSize="small" className="align-middle mr-1" />
              Family Details (Private)
            </FormLabel>
            <Textarea
              name="privateData.familyDetails"
              value={values.privateData.familyDetails || ""}
              onChange={handleChange}
              minRows={2}
              placeholder="About your family background..."
            />
          </FormControl>

          <FormControl>
            <FormLabel>
              <LockOutlined fontSize="small" className="align-middle mr-1" />
              Partner Preferences (Private)
            </FormLabel>
            <Textarea
              name="privateData.partnerPreferences"
              value={values.privateData.partnerPreferences || ""}
              onChange={handleChange}
              minRows={3}
              placeholder="What you're looking for in a partner..."
            />
          </FormControl>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AboutPreferencesForm;
