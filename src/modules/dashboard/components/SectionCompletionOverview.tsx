import { useAppSelector } from "../../../store/hooks";
import { useEffect, useState } from "react";
import { profileService } from "../../../services/profileService";
import { useLanguage } from "../../../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const translations = {
  en: {
    title: "Section Completion",
    basicInfo: "Basic Info",
    contactInfo: "Contact Info",
    education: "Education & Career",
    about: "About Me",
    preferences: "Partner Preferences",
    gallery: "Gallery",
  },
  mr: {
    title: "विभाग पूर्णता",
    basicInfo: "मूलभूत माहिती",
    contactInfo: "संपर्क माहिती",
    education: "शिक्षण आणि कारकीर्द",
    about: "माझ्याबद्दल",
    preferences: "जोडीदार प्राधान्ये",
    gallery: "गॅलरी",
  },
};

export const SectionCompletionOverview = () => {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];
  const user = useAppSelector((state) => state.auth.user);
  const [sectionCompletion, setSectionCompletion] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const overview = await profileService.getDashboardOverview(user.uid);
        if (overview) {
          setSectionCompletion(overview.sectionCompletion);
        }
      } catch (error) {
        console.error("Error fetching section completion:", error);
      }
    };

    fetchData();
  }, [user]);

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const sections = [
    { key: "basicInfo", label: t.basicInfo },
    { key: "contactInfo", label: t.contactInfo },
    { key: "education", label: t.education },
    { key: "about", label: t.about },
    { key: "preferences", label: t.preferences },
    { key: "gallery", label: t.gallery },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <AnimatePresence mode="wait">
        <motion.h3
          key={language}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="text-lg font-semibold text-gray-800 mb-4"
        >
          {t.title}
        </motion.h3>
      </AnimatePresence>
      <div className="space-y-4">
        {sections.map((section) => (
          <AnimatePresence mode="wait" key={section.key}>
            <motion.div
              key={language + section.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {section.label}
                </span>
                <span className="text-sm text-gray-500">
                  {sectionCompletion[section.key] || 0}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${sectionCompletion[section.key] || 0}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`h-full ${getProgressColor(
                    sectionCompletion[section.key] || 0
                  )} transition-all duration-300`}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
};
