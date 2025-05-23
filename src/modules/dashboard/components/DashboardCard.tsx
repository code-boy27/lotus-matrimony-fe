import { Card, CardContent, Typography, Box, Button } from "@mui/joy";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../../contexts/LanguageContext";

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  actionButton?: {
    text: string;
    onClick: () => void;
    icon?: ReactNode;
  };
  children: ReactNode;
  className?: string;
}

export function DashboardCard({
  title,
  icon,
  actionButton,
  children,
  className = "",
}: DashboardCardProps) {
  const { language } = useLanguage();

  return (
    <Card
      className={`shadow-lg rounded-2xl border border-gray-100 h-[calc(100%-4px)] ${className}`}
    >
      <CardContent className="p-3 flex flex-col h-full">
        <Box className="flex justify-between items-center mb-2">
          {/* TITLE  */}
          <Box className="flex items-center gap-2">
            {icon}
            <AnimatePresence mode="wait">
              <motion.div
                key={language}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Typography
                  level="title-md"
                  className="text-gray-800 text-base font-semibold"
                >
                  {title}
                </Typography>
              </motion.div>
            </AnimatePresence>
          </Box>
          {actionButton && (
            <AnimatePresence mode="wait">
              <motion.div
                key={language}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="plain"
                  size="sm"
                  className="text-blue-600 hover:bg-blue-50 text-xs"
                  endDecorator={actionButton.icon}
                  onClick={actionButton.onClick}
                >
                  {actionButton.text}
                </Button>
              </motion.div>
            </AnimatePresence>
          )}
        </Box>

        <AnimatePresence mode="wait">
          <motion.div
            key={language}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
