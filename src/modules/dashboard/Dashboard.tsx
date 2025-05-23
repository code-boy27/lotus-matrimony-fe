import { useState, useEffect } from "react";
import { Grid } from "@mui/joy";
import { PersonSearch, Message, Notifications } from "@mui/icons-material";
import MainLayout from "../../components/layout/MainLayout";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { profileService } from "../../services/profileService";
import { useToast } from "../../components/ui/use-toast";
import { useLanguage } from "../../contexts/LanguageContext";
import { ProfileProgress } from "./components/ProfileProgress";
import { RecentVisitors } from "./components/RecentVisitors";
import { RecentMatches } from "./components/RecentMatches";
import { ProfileSection } from "./components/ProfileSection";
import { DashboardCards } from "./components/DashboardCards";

interface Match {
  uid: string;
  name: string;
  age: number;
  location: string;
  photoURL: string;
}

interface Profile {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  bio: string;
  location: string;
  interests: string[];
  preferences: {
    ageRange: [number, number];
    location: string;
    distance: number;
  };
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const user = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [recentVisitors, setRecentVisitors] = useState<Match[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const messageCount = 7;
  const notificationCount = 3;
  const matchesCount = 15;

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const [publicData, privateData] = await Promise.all([
          profileService.fetchPublicData(user.uid),
          profileService.fetchPrivateData(user.uid),
        ]);

        if (publicData) {
          setProfile({
            id: user.uid,
            name: publicData.name || "",
            email: user.email || "",
            photoURL: publicData.photoURL || "",
            bio: publicData.about || "",
            location: publicData.location || "",
            interests: publicData.hobbies ? publicData.hobbies.split(",") : [],
            preferences: {
              ageRange: [
                privateData?.partnerPreferences?.minAge || 25,
                privateData?.partnerPreferences?.maxAge || 35,
              ],
              location:
                privateData?.partnerPreferences?.location ||
                publicData.location ||
                "",
              distance: privateData?.partnerPreferences?.distance || 50,
            },
          });
        }

        // Mock data for demonstration
        const mockMatches: Match[] = [
          {
            uid: "1",
            name: "Priya Sharma",
            age: 28,
            location: "Mumbai",
            photoURL: "https://randomuser.me/api/portraits/women/33.jpg",
          },
          {
            uid: "2",
            name: "Kavita Desai",
            age: 26,
            location: "Pune",
            photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
          },
          {
            uid: "3",
            name: "Deepika Patel",
            age: 29,
            location: "Nagpur",
            photoURL: "https://randomuser.me/api/portraits/women/55.jpg",
          },
        ];

        const mockVisitors: Match[] = [
          {
            uid: "4",
            name: "Anjali Gupta",
            age: 27,
            location: "Pune",
            photoURL: "https://randomuser.me/api/portraits/women/66.jpg",
          },
          {
            uid: "5",
            name: "Pooja Verma",
            age: 28,
            location: "Mumbai",
            photoURL: "https://randomuser.me/api/portraits/women/77.jpg",
          },
        ];

        setRecentMatches(mockMatches);
        setRecentVisitors(mockVisitors);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, navigate, toast]);

  const dashboardCards = [
    {
      title: t("dashboard.browseMatches"),
      icon: (
        <div className="relative">
          <PersonSearch
            className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
            style={{ fontSize: "32px" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-pink-500/20 blur-sm" />
        </div>
      ),
      count: matchesCount,
      color: "primary",
      route: "/matches",
      description: t("dashboard.findPerfectMatch"),
    },
    {
      title: t("dashboard.messages"),
      icon: (
        <div className="relative">
          <Message
            className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"
            style={{ fontSize: "32px" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400/20 via-blue-500/20 to-indigo-500/20 blur-sm" />
        </div>
      ),
      count: messageCount,
      color: "success",
      route: "/messages",
      description: t("dashboard.viewConversations"),
    },
    {
      title: t("dashboard.notifications"),
      icon: (
        <div className="relative">
          <Notifications
            className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500"
            style={{ fontSize: "32px" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-teal-500/20 to-cyan-500/20 blur-sm" />
        </div>
      ),
      count: notificationCount,
      color: "warning",
      route: "/notifications",
      description: t("dashboard.stayUpdated"),
    },
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      messageCount={messageCount}
      notificationCount={notificationCount}
      matchesCount={matchesCount}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={2}>
          {/* Profile Section (Left Side) */}
          <Grid xs={12} sm={12} md={4} lg={4}>
            <ProfileSection profile={profile} loading={loading} />
          </Grid>

          {/* Right Side Dashboard Cards */}
          <Grid xs={12} sm={12} md={8} lg={8} container spacing={2}>
            {/* Top Row - Dashboard Cards */}
            <DashboardCards cards={dashboardCards} />

            {/* Second Row */}
            <Grid xs={12} sm={8} md={8} lg={8}>
              <ProfileProgress />
            </Grid>
            <Grid xs={12} sm={4} md={4} lg={4}>
              <RecentVisitors visitors={recentVisitors} />
            </Grid>
          </Grid>

          {/* Recent Matches Section */}
          <Grid xs={12}>
            <RecentMatches matches={recentMatches} />
          </Grid>
        </Grid>
      </motion.div>
    </MainLayout>
  );
}
