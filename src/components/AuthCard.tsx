import { motion } from "framer-motion";
import { Box, Typography } from "@mui/joy";
import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const AuthCard = ({
  title,
  subtitle,
  children,
}: AuthCardProps): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4 w-[95%] sm:w-[80%] md:w-[70%] lg:w-2/6 mx-auto"
    >
      <Box
        className="border"
        sx={{
          p: 4,
          borderRadius: "xl",
          boxShadow: "lg",
          backgroundColor: "background.surface",
          backgroundImage: `url('/green-bg.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maxWidth: "md",
          width: "100%",
        }}
      >
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-4"
        >
          <img
            src="/lotus-logo.png"
            alt="Lotus Logo"
            className="h-40 w-64 sm:h-48 sm:w-80 md:h-52 md:w-88 lg:h-56 lg:w-96"
          />
        </motion.div>
        <Typography level="h2" sx={{ mb: 2, textAlign: "center" }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography level="body-sm" sx={{ mb: 3, textAlign: "center" }}>
            {subtitle}
          </Typography>
        )}
        {children}
      </Box>
    </motion.div>
  );
};

export default AuthCard;
