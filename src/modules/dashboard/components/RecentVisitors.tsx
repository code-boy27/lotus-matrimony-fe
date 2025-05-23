import { Typography, Box, Button, Avatar, Stack } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import { motion } from "framer-motion";
import { Visibility, ArrowForward, Search } from "@mui/icons-material";
import { DashboardCard } from "./DashboardCard";

interface Visitor {
  uid: string;
  name: string;
  age: number;
  location: string;
  photoURL: string;
}

interface RecentVisitorsProps {
  visitors: Visitor[];
}

export function RecentVisitors({ visitors }: RecentVisitorsProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <DashboardCard
      title={t("dashboard.recentVisitors")}
      icon={
        <div className="relative">
          <Visibility className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-lg" />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400/20 via-blue-500/20 to-indigo-500/20 blur-sm" />
        </div>
      }
      actionButton={{
        text: t("dashboard.viewAll"),
        onClick: () => navigate("/visitors"),
        icon: <ArrowForward fontSize="small" />,
      }}
    >
      {visitors.length > 0 ? (
        <Stack spacing={1}>
          {visitors.map((visitor, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Box
                className="cursor-pointer shadow-sm hover:shadow-md rounded-xl border border-gray-100 p-3"
                onClick={() => navigate(`/profile/${visitor.uid}`)}
              >
                <Box className="flex items-center gap-2">
                  <Avatar src={visitor.photoURL} className="w-10 h-10">
                    {visitor.name[0]}
                  </Avatar>
                  <Box className="flex-1">
                    <Typography
                      level="title-sm"
                      className="text-gray-800 font-semibold text-sm"
                    >
                      {visitor.name}
                    </Typography>
                    <Typography
                      level="body-xs"
                      className="text-gray-600 text-xs"
                    >
                      {visitor.age} yrs, {visitor.location}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Stack>
      ) : (
        <Box className="flex-1 flex flex-col items-center justify-center text-center">
          <Typography level="body-md" className="text-gray-800 text-sm">
            {t("dashboard.noVisitors")}
          </Typography>
          <Button
            variant="solid"
            size="sm"
            className="mt-2 rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 hover:from-sky-500 hover:via-blue-600 hover:to-indigo-600 text-white text-xs"
            startDecorator={<Search fontSize="small" />}
            onClick={() => navigate("/matches")}
          >
            {t("dashboard.browse")}
          </Button>
        </Box>
      )}
    </DashboardCard>
  );
}
