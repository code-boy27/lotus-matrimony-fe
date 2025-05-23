import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Keep sidebar closed on initial load and resize
      setIsSidebarOpen(false);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl transform rotate-12" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-3xl transform -rotate-12" />
      </div>

      {/* Header - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header onMenuClick={toggleSidebar} showMenu={isMobile} />
      </div>

      <div className="flex h-screen pt-16">
        {" "}
        {/* Added pt-16 for header height */}
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || !isMobile) && (
            <>
              {/* Overlay for mobile */}
              {isSidebarOpen && isMobile && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black z-40"
                  onClick={toggleSidebar}
                />
              )}

              {/* Sidebar */}
              <motion.div
                initial={isMobile ? { x: -256 } : { width: 64 }}
                animate={{
                  x: 0,
                  width: isSidebarOpen ? 256 : 64,
                }}
                exit={isMobile ? { x: -256 } : { width: 64 }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed lg:relative inset-y-0 left-0 z-50 border-r border-gray-100 bg-white/80 backdrop-blur-lg"
                onMouseEnter={() => !isMobile && setIsSidebarOpen(true)}
                onMouseLeave={() => !isMobile && setIsSidebarOpen(false)}
              >
                <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-4 lg:p-6">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-white/20 p-4 lg:p-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
