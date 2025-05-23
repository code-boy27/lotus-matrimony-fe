import { Box, Card, CardContent, Stack, Typography } from "@mui/joy";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAppSelector } from "../../store/hooks";
import { profileService } from "../../services/profileService";
import { useState, useEffect } from "react";

interface Section {
  name: string;
  key: string;
  isComplete: boolean;
}

export const SectionCompletionOverview = () => {
  const { t } = useLanguage();
  const user = useAppSelector((state) => state.auth.user);
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const fetchSectionStatus = async () => {
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
              isComplete: !!(
                publicData.name &&
                publicData.gender &&
                publicData.birthDate
              ),
            },
            {
              name: t("profile.contactInfo"),
              key: "contactInfo",
              isComplete: !!(privateData?.phone && publicData.location),
            },
            {
              name: t("profile.education"),
              key: "education",
              isComplete: !!(publicData.education && publicData.occupation),
            },
            {
              name: t("profile.about"),
              key: "about",
              isComplete: !!(publicData.about && publicData.interests),
            },
            {
              name: t("profile.preferences"),
              key: "preferences",
              isComplete: !!privateData?.partnerPreferences,
            },
            {
              name: t("profile.gallery"),
              key: "gallery",
              isComplete: !!(
                publicData.galleryURLs && publicData.galleryURLs.length > 0
              ),
            },
          ];

          setSections(sectionList);
        }
      } catch (error) {
        console.error("Error fetching section status:", error);
      }
    };

    fetchSectionStatus();
  }, [user, t]);

  return (
    <Card className="shadow-lg rounded-2xl border border-gray-100 mt-4 h-[calc(100%-8px)]">
      <CardContent className="p-4 h-full flex flex-col">
        <Typography
          level="title-lg"
          className="text-gray-800 text-lg font-semibold mb-2"
        >
          {t("dashboard.sectionCompletion")}
        </Typography>

        <Box className="flex-1">
          <Stack spacing={1}>
            {sections.map((section, index) => (
              <Box key={index} className="flex items-center gap-2 py-1">
                {section.isComplete ? (
                  <CheckCircle className="text-green-600 text-lg" />
                ) : (
                  <Cancel className="text-red-600 text-lg" />
                )}
                <Typography
                  level="body-sm"
                  className="text-gray-800 font-medium text-sm"
                >
                  {section.name}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
