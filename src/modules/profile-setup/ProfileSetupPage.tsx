import { Save } from "@mui/icons-material";
import { Button, Grid } from "@mui/joy";
import type { FormikProps } from "formik";
import { Formik } from "formik";
import { motion } from "framer-motion";
import { useRef } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { useProfileForm } from "../../hooks/useProfileForm";
import type { ProfileFormValues } from "../../types/profile";
import { ProfileSchema } from "../../validations/profileSchema";
import AboutPreferencesForm from "./components/AboutPreferencesForm";
import BasicInfoForm from "./components/BasicInfoForm";
import ContactInfoForm from "./components/ContactInfoForm";
import EducationCareerForm from "./components/EducationCareerForm";
import GalleryImageUpload from "./components/GalleryImageUpload";
import ProfileImageUpload from "./components/ProfileImageUpload";
import { useLanguage } from "../../contexts/LanguageContext";

const ProfileSetupPage = () => {
  const formikRef = useRef<FormikProps<ProfileFormValues> | null>(null);
  const { t } = useLanguage();

  const {
    initialValues,
    loading,
    mainImage,
    galleryImages,
    handleMainImageChange,
    handleAddGalleryImage,
    handleRemoveGalleryImage,
    handleSetMainImage,
    handleSubmit,
  } = useProfileForm();

  return (
    <MainLayout title={t("profile.editProfile")}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-background"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={(values, { setSubmitting }) =>
            handleSubmit(values, setSubmitting)
          }
          innerRef={formikRef}
          enableReinitialize
          validateOnMount={false}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                {/* Profile Image Section */}
                <Grid xs={12} md={4}>
                  <div className="h-full flex flex-col">
                    <ProfileImageUpload
                      profileImage={mainImage}
                      onImageChange={handleMainImageChange}
                      className="max-h-[300px]"
                    />
                  </div>
                </Grid>

                {/* Basic Information - Public Data */}
                <Grid xs={12} md={8}>
                  <BasicInfoForm formik={formik} />
                  <div className="mt-6">
                    <ContactInfoForm formik={formik} />
                  </div>
                </Grid>

                {/* Gallery Images */}
                <Grid xs={12}>
                  <GalleryImageUpload
                    galleryImages={galleryImages}
                    onAddImage={handleAddGalleryImage}
                    onRemoveImage={handleRemoveGalleryImage}
                    onSetMainImage={handleSetMainImage}
                  />
                </Grid>

                {/* Education & Career */}
                <Grid xs={12}>
                  <EducationCareerForm formik={formik} />
                </Grid>

                {/* About Me & Preferences */}
                <Grid xs={12}>
                  <AboutPreferencesForm formik={formik} />
                </Grid>
              </Grid>

              <div className="mt-8 flex justify-center">
                <Button
                  type="submit"
                  variant="solid"
                  color="primary"
                  size="lg"
                  startDecorator={<Save />}
                  loading={loading}
                  className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 text-white"
                >
                  {t("profile.saveProfile")}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </motion.div>
    </MainLayout>
  );
};

export default ProfileSetupPage;
