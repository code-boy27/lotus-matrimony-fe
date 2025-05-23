import { Button, ButtonGroup } from "@mui/joy";
import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageChange = (newLang: "en" | "mr") => {
    if (newLang === language || isChanging) return;

    setIsChanging(true);
    setLanguage(newLang);

    // Reset changing state after a short delay to prevent rapid toggling
    setTimeout(() => {
      setIsChanging(false);
    }, 300);
  };

  return (
    <ButtonGroup
      variant="outlined"
      size="sm"
      className="rounded-xl w-[140px] h-[32px] overflow-hidden border border-gray-200 shadow-sm"
      disabled={isChanging}
    >
      <Button
        variant={language === "en" ? "solid" : "outlined"}
        onClick={() => handleLanguageChange("en")}
        className={`w-[70px] h-[32px] transition-all duration-300 ${
          language === "en"
            ? "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
            : "hover:bg-gray-50"
        }`}
      >
        English
      </Button>
      <Button
        variant={language === "mr" ? "solid" : "outlined"}
        onClick={() => handleLanguageChange("mr")}
        className={`w-[70px] h-[32px] transition-all duration-300 ${
          language === "mr"
            ? "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
            : "hover:bg-gray-50"
        }`}
      >
        मराठी
      </Button>
    </ButtonGroup>
  );
};
