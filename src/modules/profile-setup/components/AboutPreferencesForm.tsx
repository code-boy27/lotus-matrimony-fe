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
import { useLanguage } from "../../../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface AboutPreferencesFormProps {
  formik: FormikProps<ProfileFormValues>;
}

const AboutPreferencesForm: React.FC<AboutPreferencesFormProps> = ({
  formik,
}) => {
  const { values, handleChange } = formik;
  const { t } = useLanguage();

  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <Typography
            level="title-md"
            className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
          >
            {t("profile.aboutMePreferences")}
          </Typography>
        </div>

        <Stack spacing={3}>
          <FormControl>
            <AnimatePresence mode="wait">
              <motion.div
                key={t("profile.aboutMe")}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <FormLabel className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500">
                  <PublicOutlined
                    fontSize="small"
                    className="align-middle mr-1"
                  />
                  {t("profile.aboutMe")} ({t("profile.public")})
                </FormLabel>
              </motion.div>
            </AnimatePresence>
            <Textarea
              name="publicData.about"
              value={values.publicData.about || ""}
              onChange={handleChange}
              minRows={3}
              placeholder={t("profile.aboutMePlaceholder")}
            />
          </FormControl>

          <FormControl>
            <AnimatePresence mode="wait">
              <motion.div
                key={t("profile.interests")}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <FormLabel className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500">
                  <LockOutlined
                    fontSize="small"
                    className="align-middle mr-1"
                  />
                  {t("profile.interests")} ({t("profile.private")})
                </FormLabel>
              </motion.div>
            </AnimatePresence>
            <Textarea
              name="privateData.hobbies"
              value={values.privateData.hobbies || ""}
              onChange={handleChange}
              minRows={2}
              placeholder={t("profile.interestsPlaceholder")}
            />
          </FormControl>

          <FormControl>
            <AnimatePresence mode="wait">
              <motion.div
                key={t("profile.familyDetails")}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <FormLabel className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500">
                  <LockOutlined
                    fontSize="small"
                    className="align-middle mr-1"
                  />
                  {t("profile.familyDetails")} ({t("profile.private")})
                </FormLabel>
              </motion.div>
            </AnimatePresence>
            <Textarea
              name="privateData.familyDetails"
              value={values.privateData.familyDetails || ""}
              onChange={handleChange}
              minRows={2}
              placeholder={t("profile.familyDetailsPlaceholder")}
            />
          </FormControl>

          <FormControl>
            <AnimatePresence mode="wait">
              <motion.div
                key={t("profile.partnerPreferences")}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <FormLabel className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500">
                  <LockOutlined
                    fontSize="small"
                    className="align-middle mr-1"
                  />
                  {t("profile.partnerPreferences")} ({t("profile.private")})
                </FormLabel>
              </motion.div>
            </AnimatePresence>
            <Textarea
              name="privateData.partnerPreferences"
              value={values.privateData.partnerPreferences || ""}
              onChange={handleChange}
              minRows={3}
              placeholder={t("profile.partnerPreferencesPlaceholder")}
            />
          </FormControl>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AboutPreferencesForm;
