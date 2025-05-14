import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  IconButton,
} from "@mui/joy";
import {
  Logout,
  Settings,
  Person,
  Favorite,
  Message,
  Notifications,
} from "@mui/icons-material";
import { logout } from "../store/slices/authSlice";
import { useToast } from "../components/ui/use-toast";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useGetUserProfileQuery } from "../store/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const user = useAppSelector((state) => state.auth.user);
  const { data: profile } = useGetUserProfileQuery(user?.uid || "", {
    skip: !user?.uid,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      toast({
        title: "Success",
        description: "Logged out successfully!",
      });
      navigate("/login");
    } catch (error) {
      const firebaseError = error as Error;
      toast({
        title: "Error",
        description: firebaseError.message,
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography level="title-lg">Dashboard</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton variant="plain" color="neutral">
            <Notifications />
          </IconButton>
          <IconButton variant="plain" color="neutral">
            <Message />
          </IconButton>
          <IconButton variant="plain" color="neutral">
            <Settings />
          </IconButton>
          <Button
            variant="plain"
            color="danger"
            startDecorator={<Logout />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Box sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={profile?.photoURL || user?.photoURL || undefined}
                  >
                    {profile?.name?.[0] ||
                      user?.displayName?.[0] ||
                      user?.email?.[0]}
                  </Avatar>
                  <Typography level="title-md">
                    {profile?.name || user?.displayName}
                  </Typography>
                  <Typography level="body-sm" color="neutral">
                    {profile?.email || user?.email}
                  </Typography>
                  {profile?.bio && (
                    <Typography level="body-sm" color="neutral">
                      {profile.bio}
                    </Typography>
                  )}
                  {profile?.location && (
                    <Typography level="body-sm" color="neutral">
                      {profile.location}
                    </Typography>
                  )}
                  <Button
                    variant="outlined"
                    startDecorator={<Person />}
                    fullWidth
                  >
                    Edit Profile
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Favorite color="primary" />
                      <Box>
                        <Typography level="title-md">Matches</Typography>
                        <Typography level="body-sm" color="neutral">
                          View your matches
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Message color="primary" />
                      <Box>
                        <Typography level="title-md">Messages</Typography>
                        <Typography level="body-sm" color="neutral">
                          Check your messages
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid xs={12}>
                <Card>
                  <CardContent>
                    <Typography level="title-md" sx={{ mb: 2 }}>
                      Recent Activity
                    </Typography>
                    <Typography level="body-sm" color="neutral">
                      No recent activity
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}
