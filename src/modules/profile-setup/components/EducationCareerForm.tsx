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
import { useLanguage } from "../../../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface EducationCareerFormProps {
  formik: FormikProps<ProfileFormValues>;
}

const EducationCareerForm: React.FC<EducationCareerFormProps> = ({
  formik,
}) => {
  const { values, handleChange } = formik;
  const { t } = useLanguage();

  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <PublicOutlined className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500" />
          <Typography
            level="title-md"
            className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500"
          >
            {t("profile.educationCareer")}
          </Typography>
        </div>

        <Grid container spacing={2}>
          <Grid xs={12} sm={6}>
            <FormControl>
              <AnimatePresence mode="wait">
                <motion.div
                  key={t("profile.education")}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormLabel>{t("profile.education")}</FormLabel>
                </motion.div>
              </AnimatePresence>
              <Input
                name="publicData.education"
                value={values.publicData.education || ""}
                onChange={handleChange}
                placeholder={t("profile.educationPlaceholder")}
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <AnimatePresence mode="wait">
                <motion.div
                  key={t("profile.occupation")}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormLabel>{t("profile.occupation")}</FormLabel>
                </motion.div>
              </AnimatePresence>
              <Input
                name="publicData.occupation"
                value={values.publicData.occupation || ""}
                onChange={handleChange}
                placeholder={t("profile.occupationPlaceholder")}
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <AnimatePresence mode="wait">
                <motion.div
                  key={t("profile.income")}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormLabel>{t("profile.income")}</FormLabel>
                </motion.div>
              </AnimatePresence>
              <Input
                name="privateData.income"
                value={values.privateData.income || ""}
                onChange={handleChange}
                placeholder={t("profile.incomePlaceholder")}
              />
              <Typography level="body-sm" className="text-gray-500 mt-1">
                <LockOutlined fontSize="small" className="align-middle mr-1" />
                {t("profile.private")}
              </Typography>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EducationCareerForm;
