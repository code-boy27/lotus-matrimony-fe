import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from "@mui/joy";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAppSelector } from "../../store/hooks";
import { profileService } from "../../services/profileService";
import { useState, useEffect } from "react";

interface Section {
  name: string;
  key: string;
  weight: number;
  isComplete: boolean;
}

export const ProfileCompleteness = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const user = useAppSelector((state) => state.auth.user);
  const [completeness, setCompleteness] = useState(0);
  const [nextIncompleteSection, setNextIncompleteSection] =
    useState<Section | null>(null);

  useEffect(() => {
    const calculateCompleteness = async () => {
      if (!user) return;

      try {
        const [publicData, privateData] = await Promise.all([
          profileService.fetchPublicData(user.uid),
          profileService.fetchPrivateData(user.uid),
        ]);

        if (publicData) {
          const sectionList: Section[] = [
            {
              name: t("profile.basicInfo"),
              key: "basicInfo",
              weight: 20,
              isComplete: !!(
                publicData.name &&
                publicData.gender &&
                publicData.birthDate
              ),
            },
            {
              name: t("profile.contactInfo"),
              key: "contactInfo",
              weight: 15,
              isComplete: !!(privateData?.phone && publicData.location),
            },
            {
              name: t("profile.education"),
              key: "education",
              weight: 15,
              isComplete: !!(publicData.education && publicData.occupation),
            },
            {
              name: t("profile.about"),
              key: "about",
              weight: 15,
              isComplete: !!(publicData.about && publicData.interests),
            },
            {
              name: t("profile.preferences"),
              key: "preferences",
              weight: 20,
              isComplete: !!privateData?.partnerPreferences,
            },
            {
              name: t("profile.gallery"),
              key: "gallery",
              weight: 15,
              isComplete: !!(
                publicData.galleryURLs && publicData.galleryURLs.length > 0
              ),
            },
          ];

          const totalWeight = sectionList.reduce(
            (sum, section) => sum + section.weight,
            0
          );
          const completedWeight = sectionList.reduce(
            (sum, section) => sum + (section.isComplete ? section.weight : 0),
            0
          );
          const completenessPercentage = Math.round(
            (completedWeight / totalWeight) * 100
          );
          setCompleteness(completenessPercentage);

          // Find the next incomplete section
          const incomplete = sectionList.find((section) => !section.isComplete);
          setNextIncompleteSection(incomplete || null);
        }
      } catch (error) {
        console.error("Error calculating profile completeness:", error);
      }
    };

    calculateCompleteness();
  }, [user, t]);

  const getProgressColor = () => {
    if (completeness >= 70) return "#22c55e"; // green-500
    if (completeness >= 40) return "#f59e0b"; // amber-500
    return "#ef4444"; // red-500
  };

  const getMessage = () => {
    if (completeness >= 100) {
      return "Your profile is complete and ready to find matches!";
    }
    return language === "mr"
      ? "तुमच्या प्रोफाइलची पूर्तता करा आणि जोडीदार शोधण्याची संधी वाढवा"
      : "Complete your profile to increase your chances of finding a match";
  };

  return (
    <Card className="shadow-lg rounded-2xl border border-gray-100 mt-4 h-[calc(100%-8px)]">
      <CardContent className="p-4 h-full flex flex-col">
        <Box className="mb-6">
          <Typography
            level="title-lg"
            className="text-gray-800 text-lg font-semibold mb-4"
          >
            {t("dashboard.profileCompleteness")}
          </Typography>
          <Box className="flex justify-between items-center mb-2">
            <Typography
              level="h2"
              className="text-3xl font-bold"
              sx={{ color: getProgressColor() }}
            >
              {completeness}%
            </Typography>
            <Typography level="body-sm" className="text-gray-600">
              {completeness >= 70
                ? language === "mr"
                  ? "प्रोफाइल पूर्ण"
                  : "Profile Complete"
                : completeness >= 40
                ? language === "mr"
                  ? "जवळपास पूर्ण"
                  : "Almost There"
                : language === "mr"
                ? "सुरुवात"
                : "Getting Started"}
            </Typography>
          </Box>
          <LinearProgress
            determinate
            value={completeness}
            sx={{
              "--LinearProgress-radius": "8px",
              "--LinearProgress-thickness": "8px",
              "--LinearProgress-progressColor": getProgressColor(),
            }}
          />
        </Box>

        {nextIncompleteSection && (
          <Box className="bg-gray-50 rounded-xl p-4">
            <Typography level="body-sm" className="text-gray-600 mb-2">
              Next Step
            </Typography>
            <Box className="flex items-center justify-between">
              <Typography level="title-md" className="text-gray-800">
                {nextIncompleteSection.name}
              </Typography>
              <Button
                variant="soft"
                color="primary"
                size="sm"
                endDecorator={<ArrowForward />}
                onClick={() => navigate("/profile-setup")}
                className="text-blue-600 hover:bg-blue-50"
              >
                {language === "mr" ? "पूर्ण करा" : "Complete"}
              </Button>
            </Box>
          </Box>
        )}

        <Box className="mt-6 text-center">
          <Typography level="body-sm" className="text-gray-600">
            {getMessage()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
