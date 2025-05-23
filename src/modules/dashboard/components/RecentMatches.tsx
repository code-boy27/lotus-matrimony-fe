import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  Stack,
  IconButton,
} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import { motion } from "framer-motion";
import { Favorite, ArrowForward, Search, Message } from "@mui/icons-material";

interface Match {
  uid: string;
  name: string;
  age: number;
  location: string;
  photoURL: string;
}

interface RecentMatchesProps {
  matches: Match[];
}

export const RecentMatches = ({ matches }: RecentMatchesProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Card className="shadow-lg rounded-2xl border border-gray-100 mt-4">
      <CardContent className="p-4">
        <Box className="flex justify-between items-center mb-2">
          <Box className="flex items-center gap-2">
            <div className="relative">
              <Favorite className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-orange-400 text-lg" />
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 via-pink-500/20 to-orange-400/20 blur-sm" />
            </div>
            <Typography
              level="title-md"
              className="text-gray-800 text-base font-semibold"
            >
              {t("dashboard.recentMatches")}
            </Typography>
          </Box>
          <Button
            variant="plain"
            size="sm"
            className="text-blue-600 hover:bg-blue-50 text-xs"
            endDecorator={<ArrowForward fontSize="small" />}
            onClick={() => navigate("/matches")}
          >
            {t("dashboard.viewAll")}
          </Button>
        </Box>

        {matches.length > 0 ? (
          <Stack spacing={1}>
            {matches.map((match, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card
                  variant="outlined"
                  className="cursor-pointer shadow-sm hover:shadow-md rounded-xl border border-gray-100"
                  onClick={() => navigate(`/profile/${match.uid}`)}
                >
                  <CardContent className="p-3">
                    <Box className="flex items-center gap-2">
                      <Avatar src={match.photoURL} className="w-10 h-10">
                        {match.name[0]}
                      </Avatar>
                      <Box className="flex-1">
                        <Typography
                          level="title-sm"
                          className="text-gray-800 font-semibold text-sm"
                        >
                          {match.name}
                        </Typography>
                        <Typography
                          level="body-xs"
                          className="text-gray-600 text-xs"
                        >
                          {match.age} yrs, {match.location}
                        </Typography>
                      </Box>
                      <Box className="flex gap-1">
                        <IconButton
                          size="sm"
                          variant="soft"
                          className="text-blue-600 hover:bg-blue-50 p-1"
                        >
                          <Message fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="sm"
                          variant="soft"
                          className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-orange-400 hover:from-rose-500 hover:via-pink-600 hover:to-orange-500 p-1"
                        >
                          <Favorite fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Stack>
        ) : (
          <Box className="p-4 text-center">
            <Typography level="body-md" className="text-gray-800 text-sm">
              {t("dashboard.noMatches")}
            </Typography>
            <Button
              variant="solid"
              size="sm"
              className="mt-2 rounded-xl bg-gradient-to-r from-rose-400 via-pink-500 to-orange-400 hover:from-rose-500 hover:via-pink-600 hover:to-orange-500 text-white text-xs"
              startDecorator={<Search fontSize="small" />}
              onClick={() => navigate("/matches")}
            >
              {t("dashboard.browseProfiles")}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
