import React from "react";
import { Typography, Button, Alert, Stack, Card, CardContent } from "@mui/joy";
import { CloudUpload, PublicOutlined, LockOutlined } from "@mui/icons-material";
import type { ProfileImageData } from "../../../types/profile";

interface ProfileImageUploadProps {
  profileImage: ProfileImageData;
  onImageChange: (file: File) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  profileImage,
  onImageChange,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-[200px] h-[200px] rounded-full overflow-hidden mb-4 border border-divider flex items-center justify-center bg-cover bg-center ${
              profileImage.url ? "" : "bg-gray-100"
            }`}
            style={
              profileImage.url
                ? { backgroundImage: `url(${profileImage.url})` }
                : undefined
            }
          >
            {!profileImage.url && (
              <Typography level="body-lg" color="neutral">
                No Image
              </Typography>
            )}
          </div>

          <Button
            component="label"
            variant="outlined"
            color="neutral"
            startDecorator={<CloudUpload />}
          >
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </Button>

          <Alert color="warning" size="sm">
            Upload a clear profile photo to increase your profile visibility
          </Alert>

          {/* Legend for public/private data */}
          <div className="mt-6 w-full">
            <Typography level="body-sm" className="mb-4">
              Data Visibility:
            </Typography>
            <Stack direction="row" spacing={2} className="mb-2">
              <div className="flex items-center gap-2">
                <PublicOutlined fontSize="small" />
                <Typography level="body-sm">Public - Visible to all</Typography>
              </div>
            </Stack>
            <Stack direction="row" spacing={2}>
              <div className="flex items-center gap-2">
                <LockOutlined fontSize="small" />
                <Typography level="body-sm">
                  Private - Visible to subscribers
                </Typography>
              </div>
            </Stack>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileImageUpload;
