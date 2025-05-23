import React from "react";
import { Typography, Button, Card, CardContent, Alert, Box } from "@mui/joy";
import { CloudUpload, PublicOutlined, LockOutlined } from "@mui/icons-material";
import type { ProfileImageData } from "../../../types/profile";
import { useLanguage } from "../../../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileImageUploadProps {
  profileImage: ProfileImageData;
  onImageChange: (file: File) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  profileImage,
  onImageChange,
}) => {
  const { t } = useLanguage();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <Card>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={t("profile.photoGallery")}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Typography level="title-md" className="mb-4">
              {t("profile.photoGallery")}
            </Typography>
          </motion.div>
        </AnimatePresence>

        <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-divider bg-cover bg-center mb-4">
          {profileImage.url ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
              style={{ backgroundImage: `url(${profileImage.url})` }}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center h-full bg-background"
            >
              <Typography level="body-sm" textColor="neutral.500">
                {t("profile.noImage")}
              </Typography>
            </motion.div>
          )}
        </div>

        <label className="block w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <Button
            component="span"
            variant="outlined"
            color="neutral"
            startDecorator={<CloudUpload />}
            className="w-full"
          >
            {profileImage.url
              ? t("profile.changePhoto")
              : t("profile.uploadPhoto")}
          </Button>
        </label>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Alert
            variant="soft"
            color="neutral"
            className="mt-4"
            startDecorator={<CloudUpload />}
          >
            <Typography level="body-sm">
              {t("profile.uploadPhotoMessage")}
            </Typography>
          </Alert>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-4"
        >
          <Typography level="body-sm" className="mb-2">
            {t("profile.dataVisibility")}
          </Typography>
          <Box className="space-y-2">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="flex items-center gap-2"
            >
              <PublicOutlined fontSize="small" color="success" />
              <Typography level="body-sm">{t("profile.public")}</Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="flex items-center gap-2"
            >
              <LockOutlined fontSize="small" color="warning" />
              <Typography level="body-sm">{t("profile.private")}</Typography>
            </motion.div>
          </Box>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ProfileImageUpload;
