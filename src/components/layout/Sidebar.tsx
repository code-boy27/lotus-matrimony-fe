import {
  Dashboard,
  Person,
  Message,
  Favorite,
  Logout,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase/config";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  const menuItems = [
    {
      icon: <Dashboard sx={{ color: "rgb(236, 72, 153)" }} />,
      label: t("nav.dashboard"),
      path: "/dashboard",
    },
    {
      icon: <Person sx={{ color: "rgb(249, 115, 22)" }} />,
      label: t("nav.profile"),
      path: "/profile-setup",
    },
    {
      icon: <Message sx={{ color: "rgb(168, 85, 247)" }} />,
      label: t("nav.messages"),
      path: "/messages",
    },
    {
      icon: <Favorite sx={{ color: "rgb(236, 72, 153)" }} />,
      label: t("nav.matches"),
      path: "/browse-matches",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-100">
      {/* Navigation Menu */}
      <nav className="flex-1 p-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.button
              key={item.path}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 mb-1 ${
                isActive
                  ? "bg-gradient-to-r from-rose-400/10 via-pink-500/10 to-orange-400/10"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span
                className={`text-xl transition-colors duration-200 ${
                  isActive ? `text-[${item.activeColor}]` : "text-gray-500"
                }`}
              >
                {item.icon}
              </span>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive ? `text-[${item.activeColor}]` : "text-gray-600"
                  }`}
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-2 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 transition-all duration-200"
        >
          <Logout className="text-xl" />
          {isOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-medium"
            >
              {t("nav.logout")}
            </motion.span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;
