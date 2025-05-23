import React from "react";
import {
  Typography,
  Button,
  Grid,
  IconButton,
  Card,
  CardContent,
} from "@mui/joy";
import { AddPhotoAlternate, Delete } from "@mui/icons-material";
import type { ProfileImageData } from "../../../types/profile";
import { useLanguage } from "../../../contexts/LanguageContext";

interface GalleryImageUploadProps {
  galleryImages: ProfileImageData[];
  onAddImage: (file: File) => void;
  onRemoveImage: (index: number) => void;
  onSetMainImage: (index: number) => void;
}

const GalleryImageUpload: React.FC<GalleryImageUploadProps> = ({
  galleryImages,
  onAddImage,
  onRemoveImage,
  onSetMainImage,
}) => {
  const { t } = useLanguage();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAddImage(e.target.files[0]);
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <Typography level="title-md">{t("profile.photoGallery")}</Typography>
        </div>

        <Grid container spacing={2}>
          {galleryImages.map((image, index) => (
            <Grid key={index} xs={6} sm={4} md={3}>
              <div
                className="relative w-full h-[150px] rounded overflow-hidden border border-divider bg-cover bg-center"
                style={{ backgroundImage: `url(${image.url})` }}
              >
                <div className="absolute top-0 right-0 flex gap-1">
                  <IconButton
                    size="sm"
                    variant="solid"
                    color="danger"
                    onClick={() => onRemoveImage(index)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
                <Button
                  size="sm"
                  variant="soft"
                  color="primary"
                  className="absolute bottom-0 left-0 right-0 rounded-none"
                  onClick={() => onSetMainImage(index)}
                >
                  {t("profile.setAsMain")}
                </Button>
              </div>
            </Grid>
          ))}

          <Grid xs={6} sm={4} md={3}>
            <label className="flex items-center justify-center w-full h-[150px] rounded border border-dashed border-divider cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="text-center">
                <AddPhotoAlternate className="text-4xl mb-2" />
                <Typography level="body-sm">{t("profile.addPhoto")}</Typography>
              </div>
            </label>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GalleryImageUpload;
