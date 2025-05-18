import { ArrowBack, Save } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/joy";
import type { FormikProps } from "formik";
import { Formik } from "formik";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileForm } from "../../hooks/useProfileForm";
import type { ProfileFormValues } from "../../types/profile";
import { ProfileSchema } from "../../validations/profileSchema";
import AboutPreferencesForm from "./components/AboutPreferencesForm";
import BasicInfoForm from "./components/BasicInfoForm";
import ContactInfoForm from "./components/ContactInfoForm";
import EducationCareerForm from "./components/EducationCareerForm";
import GalleryImageUpload from "./components/GalleryImageUpload";
import ProfileImageUpload from "./components/ProfileImageUpload";

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<ProfileFormValues> | null>(null);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <div className="p-4 flex justify-between items-center border-b border-divider">
        <div className="flex items-center gap-2">
          <IconButton
            variant="plain"
            color="neutral"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowBack />
          </IconButton>
          <Typography level="title-lg">Edit Profile</Typography>
        </div>
        <Button
          variant="solid"
          color="primary"
          startDecorator={<Save />}
          loading={loading}
          onClick={() => {
            if (formikRef.current) {
              formikRef.current.handleSubmit();
            }
          }}
        >
          Save Profile
        </Button>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
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
                  <ProfileImageUpload
                    profileImage={mainImage}
                    onImageChange={handleMainImageChange}
                  />
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
                >
                  Save Profile
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};

export default ProfileSetupPage;
