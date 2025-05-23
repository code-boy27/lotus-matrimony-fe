import {
  Box,
  Button,
  Typography,
  Avatar,
  AspectRatio,
  Chip,
  CircularProgress,
} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import { DashboardCard } from "./DashboardCard";
import { Edit, LocationOn, Email } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

interface Profile {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  bio: string;
  location: string;
  interests: string[];
  preferences: {
    ageRange: [number, number];
    location: string;
    distance: number;
  };
}

interface ProfileSectionProps {
  profile: Profile | null;
  loading: boolean;
}

export function ProfileSection({ profile, loading }: ProfileSectionProps) {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  if (loading) {
    return (
      <Box className="text-center p-4">
        <CircularProgress />
        <AnimatePresence mode="wait">
          <motion.div
            key={language}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Typography level="body-md" className="mt-2">
              {t("dashboard.loadingProfile")}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box className="text-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={language}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Typography level="body-md" className="text-red-600">
              {t("dashboard.profileNotFound")}
            </Typography>
            <Button
              variant="solid"
              className="mt-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate("/profile-setup")}
            >
              {t("dashboard.completeProfile")}
            </Button>
          </motion.div>
        </AnimatePresence>
      </Box>
    );
  }

  return (
    <DashboardCard title={t("dashboard.profile")}>
      <Box className="flex-1 flex flex-col">
        {/* Cover Image */}
        <AspectRatio ratio="16/9" maxHeight={200} objectFit="cover">
          <Box className="w-full h-full rounded-t-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500" />
        </AspectRatio>

        {/* Profile Content */}
        <Box className="flex flex-col items-center relative -mt-16 pb-4 px-4">
          {/* Profile Picture */}
          <Box className="relative">
            <Avatar
              src={profile.photoURL}
              className="w-32 h-32 border-4 border-white shadow-xl"
              sx={{
                "--Avatar-size": "8rem",
                "--Avatar-radius": "1rem",
              }}
            >
              {profile.name[0]}
            </Avatar>
            <Button
              variant="solid"
              color="primary"
              size="sm"
              startDecorator={<Edit />}
              className="absolute bottom-0 right-0 rounded-full shadow-lg"
              onClick={() => navigate("/profile-setup")}
            >
              {t("dashboard.editProfile")}
            </Button>
          </Box>

          {/* Profile Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={language}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center mt-4 w-full"
            >
              <Typography
                level="h3"
                className="font-bold text-xl text-gray-800 text-center"
              >
                {profile.name}
              </Typography>

              {/* Location and Email */}
              <Box className="flex flex-col items-center gap-1 mt-2">
                {profile.location && (
                  <Box className="flex items-center gap-1 text-gray-600">
                    <LocationOn fontSize="small" />
                    <Typography level="body-sm">{profile.location}</Typography>
                  </Box>
                )}
                <Box className="flex items-center gap-1 text-gray-600">
                  <Email fontSize="small" />
                  <Typography level="body-sm">{profile.email}</Typography>
                </Box>
              </Box>

              {/* Bio */}
              {profile.bio && (
                <Typography
                  level="body-md"
                  className="mt-4 text-gray-600 text-center max-w-[90%]"
                >
                  {profile.bio}
                </Typography>
              )}

              {/* Interests */}
              {profile.interests?.length > 0 && (
                <Box className="mt-4 flex flex-wrap gap-2 justify-center">
                  {profile.interests.map((interest, index) => (
                    <Chip
                      key={index}
                      size="sm"
                      variant="soft"
                      color="primary"
                      className="text-sm"
                    >
                      {interest}
                    </Chip>
                  ))}
                </Box>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </DashboardCard>
  );
}
