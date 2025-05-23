import { CircularProgress } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { useEffect, useState } from "react";
import { profileService } from "../../../services/profileService";
import { useLanguage } from "../../../contexts/LanguageContext";
import { DashboardCard } from "./DashboardCard";
import { Assessment, ArrowForward } from "@mui/icons-material";

export const ProfileProgress = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const user = useAppSelector((state) => state.auth.user);
  const [completeness, setCompleteness] = useState<number>(0);
  const [sectionCompletion, setSectionCompletion] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const overview = await profileService.getDashboardOverview(user.uid);
          if (overview) {
            setCompleteness(overview.profileCompleteness);
            setSectionCompletion(overview.sectionCompletion);
          }
        } catch (error) {
          console.error("Error fetching profile progress:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80)
      return "bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500";
    if (percentage >= 50)
      return "bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500";
    return "bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500";
  };

  const sections = [
    { key: "basicInfo", label: t("profile.basicInfo") },
    { key: "contactInfo", label: t("profile.contactInfo") },
    { key: "education", label: t("profile.education") },
    { key: "about", label: t("profile.about") },
    { key: "preferences", label: t("profile.preferences") },
    { key: "gallery", label: t("profile.gallery") },
  ];

  return (
    <DashboardCard
      title={t("dashboard.profileCompleteness")}
      icon={
        <div className="relative">
          <Assessment className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-lg" />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-pink-500/20 blur-sm" />
        </div>
      }
      actionButton={{
        text: t("dashboard.completeProfile"),
        onClick: () => navigate("/profile-setup"),
        icon: <ArrowForward fontSize="small" />,
      }}
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Completeness */}
        <div className="flex flex-col items-center md:w-1/3 justify-center">
          <div className="flex flex-col items-center">
            <CircularProgress
              size="lg"
              determinate
              value={completeness}
              color={
                completeness >= 80
                  ? "success"
                  : completeness >= 50
                  ? "warning"
                  : "danger"
              }
              className="mb-4"
            >
              {completeness}%
            </CircularProgress>
            <p className="text-sm text-gray-600 text-center mt-2">
              {t("dashboard.completeProfileMessage")}
            </p>
          </div>
        </div>

        {/* Section Completion */}
        <div className="flex-1">
          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {section.label}
                  </span>
                  <span className="text-sm text-gray-500">
                    {sectionCompletion[section.key] || 0}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(
                      sectionCompletion[section.key] || 0
                    )} transition-all duration-300`}
                    style={{
                      width: `${sectionCompletion[section.key] || 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};
