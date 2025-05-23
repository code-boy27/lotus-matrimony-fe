import { Menu, Language } from "@mui/icons-material";
import { Button, ButtonGroup } from "@mui/joy";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAppSelector } from "../../store/hooks";
import { motion } from "framer-motion";
import { useState } from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { language, setLanguage } = useLanguage();
  const user = useAppSelector((state) => state.auth.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "mr", name: "मराठी" },
  ] as const;

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm"
    >
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left Section - Menu and Logo */}
        <div className="flex items-center gap-4">
          <Button
            variant="plain"
            color="neutral"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
              L
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Lotus
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            {/* PC View - Button Group */}
            <div className="hidden lg:block">
              <ButtonGroup
                variant="outlined"
                size="sm"
                className="rounded-xl w-[140px] h-[32px]"
              >
                <Button
                  variant={language === "en" ? "solid" : "outlined"}
                  onClick={() => setLanguage("en")}
                  className="w-[70px] h-[32px]"
                >
                  English
                </Button>
                <Button
                  variant={language === "mr" ? "solid" : "outlined"}
                  onClick={() => setLanguage("mr")}
                  className="w-[70px] h-[32px]"
                >
                  मराठी
                </Button>
              </ButtonGroup>
            </div>

            {/* Mobile View - Dropdown */}
            <div className="lg:hidden">
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2"
              >
                <Language />
                <span>{currentLanguage?.name}</span>
              </Button>

              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        language === lang.code
                          ? "text-purple-600 bg-purple-50"
                          : "text-gray-700"
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* User Avatar */}
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
              <img
                src={user?.photoURL || "/default-avatar.png"}
                alt={user?.displayName || "User"}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
