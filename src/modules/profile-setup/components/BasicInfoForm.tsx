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
  Select,
  Option,
} from "@mui/joy";
import { PublicOutlined } from "@mui/icons-material";
import type { FormikProps } from "formik";
import type { ProfileFormValues } from "../../../types/profile";
import { useLanguage } from "../../../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface BasicInfoFormProps {
  formik: FormikProps<ProfileFormValues>;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ formik }) => {
  const { values, errors, touched, handleChange, handleBlur } = formik;
  const { t } = useLanguage();

  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <PublicOutlined className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500" />
          <Typography
            level="title-md"
            className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
          >
            {t("profile.basicInfo")}
          </Typography>
        </div>

        <Grid container spacing={2}>
          <Grid xs={12} sm={4}>
            <FormControl
              error={
                touched.publicData?.firstName &&
                Boolean(errors.publicData?.firstName)
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={t("profile.firstName")}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormLabel>{t("profile.firstName")}</FormLabel>
                </motion.div>
              </AnimatePresence>
              <Input
                name="publicData.firstName"
                value={values.publicData.firstName || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t("profile.firstNamePlaceholder")}
              />
              {touched.publicData?.firstName &&
                errors.publicData?.firstName && (
                  <Typography level="body-sm" color="danger">
                    {errors.publicData.firstName}
                  </Typography>
                )}
            </FormControl>
          </Grid>

          <Grid xs={12} sm={4}>
            <FormControl
              error={
                touched.publicData?.middleName &&
                Boolean(errors.publicData?.middleName)
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={t("profile.middleName")}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormLabel>{t("profile.middleName")}</FormLabel>
                </motion.div>
              </AnimatePresence>
              <Input
                name="publicData.middleName"
                value={values.publicData.middleName || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t("profile.middleNamePlaceholder")}
              />
              {touched.publicData?.middleName &&
                errors.publicData?.middleName && (
                  <FormHelperText>
                    {errors.publicData.middleName}
                  </FormHelperText>
                )}
            </FormControl>
          </Grid>

          <Grid xs={12} sm={4}>
            <FormControl
              error={
                touched.publicData?.lastName &&
                Boolean(errors.publicData?.lastName)
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={t("profile.lastName")}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormLabel>{t("profile.lastName")}</FormLabel>
                </motion.div>
              </AnimatePresence>
              <Input
                name="publicData.lastName"
                value={values.publicData.lastName || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t("profile.lastNamePlaceholder")}
              />
              {touched.publicData?.lastName && errors.publicData?.lastName && (
                <Typography level="body-sm" color="danger">
                  {errors.publicData.lastName}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl
              error={
                touched.publicData?.gender && Boolean(errors.publicData?.gender)
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={t("profile.selectGender")}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormLabel>{t("profile.selectGender")}</FormLabel>
                </motion.div>
              </AnimatePresence>
              <Select
                name="publicData.gender"
                value={values.publicData.gender || ""}
                onChange={(_, value) =>
                  handleChange({
                    target: { name: "publicData.gender", value },
                  })
                }
                onBlur={handleBlur}
                placeholder={t("profile.selectGender")}
              >
                <Option value="male">{t("profile.gender.male")}</Option>
                <Option value="female">{t("profile.gender.female")}</Option>
                <Option value="other">{t("profile.gender.other")}</Option>
              </Select>
              {touched.publicData?.gender && errors.publicData?.gender && (
                <Typography level="body-sm" color="danger">
                  {errors.publicData.gender}
                </Typography>
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={t("profile.birthDate")}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormLabel>{t("profile.birthDate")}</FormLabel>
                </motion.div>
              </AnimatePresence>
              <Input
                name="publicData.birthDate"
                type="date"
                value={values.publicData.birthDate || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.publicData?.birthDate &&
                errors.publicData?.birthDate && (
                  <Typography level="body-sm" color="danger">
                    {errors.publicData.birthDate}
                  </Typography>
                )}
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl
              error={
                touched.publicData?.maritalStatus &&
                Boolean(errors.publicData?.maritalStatus)
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={t("profile.maritalStatus")}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormLabel>{t("profile.maritalStatus")}</FormLabel>
                </motion.div>
              </AnimatePresence>
              <Select
                name="publicData.maritalStatus"
                value={values.publicData.maritalStatus || ""}
                onChange={(_, value) =>
                  handleChange({
                    target: { name: "publicData.maritalStatus", value },
                  })
                }
                onBlur={handleBlur}
                placeholder={t("profile.selectMaritalStatus")}
              >
                <Option value="neverMarried">
                  {t("profile.maritalStatus.neverMarried")}
                </Option>
                <Option value="divorced">
                  {t("profile.maritalStatus.divorced")}
                </Option>
                <Option value="widowed">
                  {t("profile.maritalStatus.widowed")}
                </Option>
                <Option value="awaitingDivorce">
                  {t("profile.maritalStatus.awaitingDivorce")}
                </Option>
              </Select>
              {touched.publicData?.maritalStatus &&
                errors.publicData?.maritalStatus && (
                  <FormHelperText>
                    {errors.publicData.maritalStatus}
                  </FormHelperText>
                )}
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl
              error={
                touched.publicData?.motherTongue &&
                Boolean(errors.publicData?.motherTongue)
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={t("profile.motherTongue")}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormLabel>{t("profile.motherTongue")}</FormLabel>
                </motion.div>
              </AnimatePresence>
              <Input
                name="publicData.motherTongue"
                value={values.publicData.motherTongue || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t("profile.motherTonguePlaceholder")}
              />
              {touched.publicData?.motherTongue &&
                errors.publicData?.motherTongue && (
                  <FormHelperText>
                    {errors.publicData.motherTongue}
                  </FormHelperText>
                )}
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl
              error={
                touched.publicData?.location &&
                Boolean(errors.publicData?.location)
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={t("profile.location")}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormLabel>{t("profile.location")}</FormLabel>
                </motion.div>
              </AnimatePresence>
              <Input
                name="publicData.location"
                value={values.publicData.location || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t("profile.locationPlaceholder")}
              />
              {touched.publicData?.location && errors.publicData?.location && (
                <FormHelperText>{errors.publicData.location}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BasicInfoForm;
