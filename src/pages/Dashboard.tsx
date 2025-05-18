import { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  IconButton,
  AspectRatio,
  Chip,
  CircularProgress,
  Sheet,
  Stack,
  Drawer,
  Badge,
  List,
  ListItem,
  ListItemDecorator,
} from "@mui/joy";
import {
  Menu,
  Logout,
  Settings,
  Favorite,
  Message,
  Notifications,
  Search,
  ArrowForward,
  Edit,
  PersonSearch,
  Dashboard as DashboardIcon,
  Visibility,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";

// Mock data and functions
const navigate = (path) => console.log(`Navigating to: ${path}`);
const handleLogout = () => console.log("Logging out");

export default function Dashboard() {
  const [recentMatches, setRecentMatches] = useState([]);
  const [recentVisitors, setRecentVisitors] = useState([]);
  const [messageCount, setMessageCount] = useState(7);
  const [notificationCount, setNotificationCount] = useState(3);
  const [matchesCount, setMatchesCount] = useState(15);
  const [loadingContent, setLoadingContent] = useState(false);
  const [profileCompleteness, setProfileCompleteness] = useState(27);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const profile = useMemo(() => {
    return {
      id: "user_12345",
      name: "Shubham Patil",
      email: "shubham.patil@example.com",
      photoURL: "https://randomuser.me/api/portraits/men/75.jpg",
      bio: "Full-stack developer who loves building modern web apps and exploring new tech.",
      location: "Pune, Maharashtra",
      interests: ["coding", "trekking", "music", "AI", "coffee"],
      preferences: {
        ageRange: [25, 35],
        location: "Maharashtra",
        distance: 50,
      },
    };
  }, []);

  useEffect(() => {
    // Simulate data loading - in a real app this would fetch from a database
    const mockMatches = [
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

    const mockVisitors = [
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
  }, []);

  const dashboardCards = [
    {
      title: "Browse Matches",
      icon: <PersonSearch sx={{ fontSize: { xs: 28, sm: 32 } }} />,
      count: matchesCount,
      color: "primary",
      route: "/matches",
      description: "Find your perfect match",
    },
    {
      title: "Messages",
      icon: <Message sx={{ fontSize: { xs: 28, sm: 32 } }} />,
      count: messageCount,
      color: "success",
      route: "/messages",
      description: "View your conversations",
    },
    {
      title: "Notifications",
      icon: <Notifications sx={{ fontSize: { xs: 28, sm: 32 } }} />,
      count: notificationCount,
      color: "warning",
      route: "/notifications",
      description: "Stay updated with activities",
    },
  ];

  const sidebarItems = [
    { label: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
    {
      label: "Browse Matches",
      icon: <PersonSearch />,
      route: "/matches",
      badge: matchesCount,
    },
    {
      label: "Messages",
      icon: <Message />,
      route: "/messages",
      badge: messageCount,
    },
    {
      label: "Notifications",
      icon: <Notifications />,
      route: "/notifications",
      badge: notificationCount,
    },
    { label: "Settings", icon: <Settings />, route: "/settings" },
    { label: "Logout", icon: <Logout />, onClick: handleLogout },
  ];

  const renderProfileCompleteness = () => {
    let color = "danger";
    if (profileCompleteness >= 70) color = "success";
    else if (profileCompleteness >= 40) color = "warning";

    return (
      <Card
        sx={{
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.1)",
          mt: 2,
          height: "calc(100% - 8px)", // Maintain consistent height
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              level="title-lg"
              fontWeight="600"
              sx={{ color: "#333", fontSize: { xs: "1rem", sm: "1.1rem" } }}
            >
              Profile Completeness
            </Typography>
            <Button
              variant="plain"
              color="primary"
              endDecorator={<Edit />}
              onClick={() => navigate("/profile/edit")}
              sx={{
                color: "#0288D1",
                "&:hover": { bgcolor: "rgba(2,136,209,0.1)" },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              Complete
            </Button>
          </Box>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              my: 2,
            }}
          >
            <CircularProgress
              determinate
              value={profileCompleteness}
              color={color}
              size="lg"
              thickness={5}
              sx={{ "--CircularProgress-size": { xs: "70px", sm: "90px" } }}
            />
            <Typography
              level="h2"
              sx={{
                position: "absolute",
                fontSize: { xs: "1rem", sm: "1.25rem" },
                color: "#333",
                fontWeight: "600",
              }}
            >
              {profileCompleteness}%
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", mt: 1 }}>
            {profileCompleteness < 100 ? (
              <Typography
                level="body-sm"
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                Complete your profile to get better matches
              </Typography>
            ) : (
              <Typography
                level="body-sm"
                color="success"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Your profile is complete!
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  };

  const renderSectionCompletionOverview = () => {
    const sections = [
      {
        name: "Profile Summary",
        isComplete:
          profile?.name && profile?.email && profile?.photoURL ? true : false,
      },
      { name: "Browse Matches", isComplete: matchesCount > 0 },
      { name: "Messages", isComplete: messageCount > 0 },
      { name: "Notifications", isComplete: notificationCount > 0 },
      { name: "Profile Completeness", isComplete: profileCompleteness >= 100 },
      { name: "Recent Matches", isComplete: recentMatches.length > 0 },
      { name: "Recent Visitors", isComplete: recentVisitors.length > 0 },
    ];

    return (
      <Card
        sx={{
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.1)",
          mt: 2,
          height: "calc(100% - 8px)", // Maintain consistent height
        }}
      >
        <CardContent>
          <Typography
            level="title-lg"
            fontWeight="600"
            sx={{
              color: "#333",
              mb: 2,
              fontSize: { xs: "1rem", sm: "1.1rem" },
            }}
          >
            Section Completion
          </Typography>
          <List sx={{ "--ListItem-paddingY": "6px" }}>
            {sections.map((section, index) => (
              <ListItem key={index}>
                <ListItemDecorator>
                  {section.isComplete ? (
                    <CheckCircle sx={{ color: "#2E7D32", fontSize: 18 }} />
                  ) : (
                    <Cancel sx={{ color: "#D32F2F", fontSize: 18 }} />
                  )}
                </ListItemDecorator>
                <Typography
                  level="body-sm"
                  sx={{
                    color: "#333",
                    fontWeight: "500",
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  }}
                >
                  {section.name}
                </Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  };

  const renderRecentVisitors = () => (
    <Card
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "16px",
        border: "1px solid rgba(0,0,0,0.1)",
        mt: 2,
        height: "calc(100% - 8px)", // Consistent height
      }}
    >
      <CardContent sx={{ p: { xs: 1, sm: 1.5 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Visibility sx={{ color: "#0288D1", fontSize: 18 }} />
            <Typography
              level="title-md"
              fontWeight="600"
              sx={{
                color: "#333",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Recent Visitors
            </Typography>
          </Box>
          <Button
            variant="plain"
            size="sm"
            sx={{
              color: "#0288D1",
              "&:hover": { bgcolor: "rgba(2,136,209,0.1)" },
              fontSize: { xs: "0.65rem", sm: "0.75rem" },
            }}
            endDecorator={<ArrowForward fontSize="small" />}
            onClick={() => navigate("/visitors")}
          >
            View All
          </Button>
        </Box>

        {recentVisitors.length > 0 ? (
          <Stack spacing={1}>
            {recentVisitors.map((visitor, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.1)",
                }}
                onClick={() => navigate(`/profile/${visitor.uid}`)}
              >
                <CardContent sx={{ p: { xs: 1, sm: 1.5 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Avatar
                      src={visitor.photoURL}
                      sx={{
                        width: { xs: 30, sm: 40 },
                        height: { xs: 30, sm: 40 },
                      }}
                    >
                      {visitor?.name?.[0]}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        level="title-sm"
                        fontWeight="600"
                        sx={{
                          color: "#333",
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        }}
                      >
                        {visitor.name}
                      </Typography>
                      <Typography
                        level="body-xs"
                        sx={{
                          color: "#666",
                          fontSize: { xs: "0.65rem", sm: "0.75rem" },
                        }}
                      >
                        {visitor.age} yrs, {visitor.location}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          <Box sx={{ p: 1, textAlign: "center" }}>
            <Typography
              level="body-md"
              sx={{
                color: "#333",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              No visitors yet.
            </Typography>
            <Button
              variant="solid"
              size="sm"
              sx={{
                mt: 1,
                borderRadius: "12px",
                bgcolor: "#0288D1",
                color: "white",
                "&:hover": { bgcolor: "#0277BD" },
                fontSize: { xs: "0.65rem", sm: "0.75rem" },
              }}
              startDecorator={<Search fontSize="small" />}
              onClick={() => navigate("/matches")}
            >
              Browse
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const renderProfileSection = () => (
    <Card
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "16px",
        border: "1px solid rgba(0,0,0,0.1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1 }}>
        <AspectRatio
          ratio="5/2"
          maxHeight={{ xs: 150, sm: 200 }}
          objectFit="cover"
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "12px 12px 0 0",
              bgcolor: "#f0f0f0",
            }}
          />
        </AspectRatio>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            mt: { xs: -5, sm: -6 },
            pb: 2,
          }}
        >
          <Avatar
            src={profile?.photoURL}
            sx={{
              width: { xs: 90, sm: 120 },
              height: { xs: 90, sm: 120 },
              border: "3px solid white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            {profile?.name?.[0]}
          </Avatar>
          <Typography
            level="h4"
            sx={{
              mt: 2,
              fontWeight: "600",
              fontSize: { xs: "1.1rem", sm: "1.5rem" },
              color: "#333",
              textAlign: "center",
            }}
          >
            {profile?.name}
          </Typography>
          <Typography
            level="body-sm"
            sx={{ mt: 0.5, color: "#666", textAlign: "center" }}
          >
            {profile?.email}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: 1,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {profile?.location && (
              <Chip size="sm" variant="soft" sx={{ color: "#0288D1" }}>
                {profile.location}
              </Chip>
            )}
          </Box>
          {profile?.bio && (
            <Typography
              level="body-md"
              sx={{
                mt: 2,
                color: "#666",
                textAlign: "center",
                maxWidth: "90%",
              }}
            >
              {profile.bio}
            </Typography>
          )}
          {profile?.interests && (
            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "center",
              }}
            >
              {profile.interests.map((interest, index) => (
                <Chip
                  key={index}
                  size="sm"
                  variant="outlined"
                  sx={{ color: "#0288D1", borderColor: "#0288D1" }}
                >
                  {interest}
                </Chip>
              ))}
            </Box>
          )}
        </Box>
      </CardContent>
      <Box sx={{ p: { xs: 2, sm: 3 }, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
        <Button
          variant="solid"
          sx={{
            width: "100%",
            borderRadius: "12px",
            bgcolor: "#0288D1",
            color: "white",
            "&:hover": { bgcolor: "#0277BD" },
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
          onClick={() => navigate("/profile/edit")}
        >
          Edit Profile
        </Button>
      </Box>
    </Card>
  );

  const renderRecentMatches = () => (
    <Card
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "16px",
        border: "1px solid rgba(0,0,0,0.1)",
        mt: 2,
      }}
    >
      <CardContent sx={{ p: { xs: 1, sm: 1.5 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Favorite sx={{ color: "#D32F2F", fontSize: 18 }} />
            <Typography
              level="title-md"
              fontWeight="600"
              sx={{
                color: "#333",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Recent Matches
            </Typography>
          </Box>
          <Button
            variant="plain"
            size="sm"
            sx={{
              color: "#0288D1",
              "&:hover": { bgcolor: "rgba(2,136,209,0.1)" },
              fontSize: { xs: "0.65rem", sm: "0.75rem" },
            }}
            endDecorator={<ArrowForward fontSize="small" />}
            onClick={() => navigate("/matches")}
          >
            View All
          </Button>
        </Box>

        {recentMatches.length > 0 ? (
          <Stack spacing={1}>
            {recentMatches.map((match, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.1)",
                }}
                onClick={() => navigate(`/profile/${match.uid}`)}
              >
                <CardContent sx={{ p: { xs: 1, sm: 1.5 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Avatar
                      src={match.photoURL}
                      sx={{
                        width: { xs: 30, sm: 40 },
                        height: { xs: 30, sm: 40 },
                      }}
                    >
                      {match?.name?.[0]}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        level="title-sm"
                        fontWeight="600"
                        sx={{
                          color: "#333",
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        }}
                      >
                        {match.name}
                      </Typography>
                      <Typography
                        level="body-xs"
                        sx={{
                          color: "#666",
                          fontSize: { xs: "0.65rem", sm: "0.75rem" },
                        }}
                      >
                        {match.age} yrs, {match.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <IconButton
                        size="sm"
                        variant="soft"
                        sx={{
                          color: "#0288D1",
                          "&:hover": { bgcolor: "rgba(2,136,209,0.1)" },
                          p: 0.5,
                        }}
                      >
                        <Message fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="sm"
                        variant="soft"
                        sx={{
                          color: "#D32F2F",
                          "&:hover": { bgcolor: "rgba(211,47,47,0.1)" },
                          p: 0.5,
                        }}
                      >
                        <Favorite fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          <Box sx={{ p: 1, textAlign: "center" }}>
            <Typography
              level="body-md"
              sx={{
                color: "#333",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              No matches yet. Complete your profile to get better matches!
            </Typography>
            <Button
              variant="solid"
              size="sm"
              sx={{
                mt: 1,
                borderRadius: "12px",
                bgcolor: "#0288D1",
                color: "white",
                "&:hover": { bgcolor: "#0277BD" },
                fontSize: { xs: "0.65rem", sm: "0.75rem" },
              }}
              startDecorator={<Search fontSize="small" />}
              onClick={() => navigate("/matches")}
            >
              Browse Profiles
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  if (loadingContent) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar for Larger Screens */}
      <Sheet
        sx={{
          width: { xs: 0, md: 70 },
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          p: 1.5,
          display: { xs: "none", md: "block" },
          overflowY: "auto",
          zIndex: 1000,
          boxShadow: "md",
          borderRight: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Avatar
            src="/api/placeholder/40/40"
            alt="LoveMatch"
            sx={{ width: 36, height: 36 }}
          />
        </Box>
        <Stack spacing={2}>
          {sidebarItems.map((item, index) => (
            <IconButton
              key={index}
              color="neutral"
              onClick={item.route ? () => navigate(item.route) : item.onClick}
              sx={{
                borderRadius: "12px",
                color: "#333",
                "&:hover": { bgcolor: "rgba(0,0,0,0.05)" },
                position: "relative",
              }}
            >
              {item.badge > 0 && (
                <Badge
                  badgeContent={item.badge}
                  color="danger"
                  size="sm"
                  sx={{ position: "absolute", top: 0, right: 0 }}
                />
              )}
              {item.icon}
            </IconButton>
          ))}
        </Stack>
      </Sheet>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          ml: { xs: 0, md: "70px" },
          p: { xs: 2, sm: 3, md: 4 },
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {/* Header */}
        <Sheet
          sx={{
            p: { xs: 1, sm: 1.5 },
            position: "sticky",
            top: 0,
            zIndex: 1000,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "sm",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              color="neutral"
              onClick={() => setSidebarOpen(true)}
              size="sm"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <Menu sx={{ color: "#333" }} />
            </IconButton>
            <Typography
              level="h5"
              fontWeight="600"
              sx={{ color: "#333", fontSize: { xs: "1rem", sm: "1.2rem" } }}
            >
              LoveMatch
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton color="neutral" size="sm">
              <Badge badgeContent={notificationCount} color="danger">
                <Notifications fontSize="small" sx={{ color: "#333" }} />
              </Badge>
            </IconButton>
            <IconButton color="neutral" size="sm">
              <Badge badgeContent={messageCount} color="danger">
                <Message fontSize="small" sx={{ color: "#333" }} />
              </Badge>
            </IconButton>
          </Box>
        </Sheet>

        {/* Sidebar Drawer for Mobile/Tablet */}
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <Box
            sx={{
              width: 250,
              p: 2,
              height: "100%",
              borderRight: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}
            >
              <Avatar
                src="/api/placeholder/40/40"
                alt="LoveMatch"
                sx={{ width: 32, height: 32 }}
              />
              <Typography level="h5" fontWeight="600" sx={{ color: "#333" }}>
                LoveMatch
              </Typography>
            </Box>
            <Stack spacing={1}>
              {sidebarItems.map((item, index) => (
                <Button
                  key={index}
                  variant="plain"
                  color="neutral"
                  startDecorator={item.icon}
                  onClick={
                    item.route
                      ? () => {
                          navigate(item.route);
                          setSidebarOpen(false);
                        }
                      : () => {
                          item.onClick();
                          setSidebarOpen(false);
                        }
                  }
                  sx={{
                    justifyContent: "flex-start",
                    borderRadius: "12px",
                    px: 2,
                    py: 1.5,
                    "&:hover": { bgcolor: "rgba(0,0,0,0.05)" },
                    color: "#333",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Typography level="body-md" sx={{ color: "#333" }}>
                      {item.label}
                    </Typography>
                    {item.badge > 0 && (
                      <Badge
                        badgeContent={item.badge}
                        color="danger"
                        size="sm"
                      />
                    )}
                  </Box>
                </Button>
              ))}
            </Stack>
          </Box>
        </Drawer>

        {/* Main Grid Layout */}
        <Grid container spacing={2}>
          {/* Profile Section (Left Side) */}
          <Grid xs={12} sm={12} md={4} lg={4}>
            {renderProfileSection()}
          </Grid>

          {/* Right Side Dashboard Cards */}
          <Grid xs={12} sm={12} md={8} lg={8} container spacing={2}>
            {/* Top Row - Dashboard Cards */}
            {dashboardCards.map((card, index) => (
              <Grid xs={12} sm={4} md={4} lg={4} key={index}>
                <Card
                  sx={{
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    borderRadius: "16px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    height: "100%",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                    },
                  }}
                  onClick={() => navigate(card.route)}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box>
                        <Typography
                          level="title-lg"
                          fontWeight="600"
                          sx={{
                            color: "#333",
                            fontSize: { xs: "1rem", sm: "1.1rem" },
                          }}
                        >
                          {card.title}
                        </Typography>
                        <Typography
                          level="body-sm"
                          sx={{
                            color: "#666",
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          }}
                        >
                          {card.description}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: "50%",
                          bgcolor: `${card.color}.softBg`,
                          color: `${card.color}.solidBg`,
                        }}
                      >
                        {card.icon}
                      </Box>
                    </Box>
                    <Typography
                      level="h3"
                      sx={{
                        fontSize: { xs: "1.5rem", sm: "1.75rem" },
                        color: "#333",
                        fontWeight: "600",
                      }}
                    >
                      {card.count}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* Second Row */}
            <Grid xs={12} sm={4} md={4} lg={4}>
              {renderProfileCompleteness()}
            </Grid>
            <Grid xs={12} sm={4} md={4} lg={4}>
              {renderSectionCompletionOverview()}
            </Grid>
            <Grid xs={12} sm={4} md={4} lg={4}>
              {renderRecentVisitors()}
            </Grid>
          </Grid>

          {/* Recent Matches Section */}
          <Grid xs={12}>{renderRecentMatches()}</Grid>
        </Grid>
      </Box>
    </Box>
  );
}
