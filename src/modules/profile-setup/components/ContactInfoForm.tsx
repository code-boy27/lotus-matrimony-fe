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
import { useLanguage } from "../../../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface ContactInfoFormProps {
  formik: FormikProps<ProfileFormValues>;
}

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ formik }) => {
  const { values, errors, touched, handleChange, handleBlur } = formik;
  const { t } = useLanguage();

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit to 3 digits
    if (/^\d{0,3}$/.test(value)) {
      handleChange(e);
    }
  };

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
          <LockOutlined className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500" />
          <Typography
            level="title-md"
            className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"
          >
            {t("profile.contactInfo")}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid xs={12} sm={6}>
            <FormControl
              error={
                touched.privateData?.phone && Boolean(errors.privateData?.phone)
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={t("profile.phone")}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormLabel>{t("profile.phone")}</FormLabel>
                </motion.div>
              </AnimatePresence>
              <Input
                name="privateData.phone"
                value={values.privateData.phone || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t("profile.phonePlaceholder")}
              />
              {touched.privateData?.phone && errors.privateData?.phone && (
                <Typography level="body-sm" color="danger">
                  {errors.privateData.phone}
                </Typography>
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={t("profile.height")}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormLabel>{t("profile.height")}</FormLabel>
                </motion.div>
              </AnimatePresence>
              <Input
                name="privateData.height"
                type="text"
                inputMode="numeric"
                value={values.privateData.height || ""}
                onChange={handleHeightChange}
                onBlur={handleBlur}
                placeholder={t("profile.heightPlaceholder")}
                endDecorator="cm"
              />
              {touched.privateData?.height && errors.privateData?.height && (
                <Typography level="body-sm" color="danger">
                  {errors.privateData.height}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl
              error={
                touched.publicData?.casteReligion &&
                Boolean(errors.publicData?.casteReligion)
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={t("profile.casteReligion")}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormLabel>{t("profile.casteReligion")}</FormLabel>
                </motion.div>
              </AnimatePresence>
              <Input
                name="publicData.casteReligion"
                value={values.publicData.casteReligion || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t("profile.casteReligionPlaceholder")}
              />
              {touched.publicData?.casteReligion &&
                errors.publicData?.casteReligion && (
                  <Typography level="body-sm" color="danger">
                    {errors.publicData.casteReligion}
                  </Typography>
                )}
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ContactInfoForm;
