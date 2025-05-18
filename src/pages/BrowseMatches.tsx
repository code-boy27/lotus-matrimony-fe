import {
  CheckCircle,
  Close,
  FavoriteBorder,
  FilterList,
  LocationOn,
  Logout,
  Menu,
  Message,
  Notifications,
  Refresh,
  Search,
  Settings,
  Sort,
  Tune,
  Visibility,
} from "@mui/icons-material";
import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Input,
  ListItemButton,
  Option,
  Select,
  Sheet,
  Slider,
  Stack,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";

// Helper component for mobile sidebar
const DashboardIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm0 8h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm0-12h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1z"
      fill="currentColor"
    />
  </svg>
);

// Mock data and functions
const navigate = (path) => console.log(`Navigating to: ${path}`);
const handleLogout = () => console.log("Logging out");

export default function BrowseMatches() {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageCount, setMessageCount] = useState(7);
  const [notificationCount, setNotificationCount] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("relevance");
  const [filterParams, setFilterParams] = useState({
    ageRange: [22, 35],
    distance: 50,
    location: "anywhere",
    interests: [],
  });

  // Interests options for filters
  const interestOptions = [
    "coding",
    "trekking",
    "music",
    "AI",
    "coffee",
    "reading",
    "traveling",
    "yoga",
    "cooking",
    "photography",
    "dancing",
  ];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const mockMatches = [
        {
          uid: "1",
          name: "Priya Sharma",
          age: 28,
          location: "Mumbai",
          distance: 120,
          bio: "Software engineer who loves to travel and explore new cultures.",
          compatibility: 85,
          photoURL: "https://randomuser.me/api/portraits/women/33.jpg",
          interests: ["coding", "traveling", "coffee", "music"],
          lastActive: "Just now",
          isOnline: true,
        },
        {
          uid: "2",
          name: "Kavita Desai",
          age: 26,
          location: "Pune",
          distance: 5,
          bio: "UX designer passionate about creating meaningful digital experiences.",
          compatibility: 92,
          photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
          interests: ["design", "art", "yoga", "reading"],
          lastActive: "2 hours ago",
          isOnline: false,
        },
        {
          uid: "3",
          name: "Deepika Patel",
          age: 29,
          location: "Nagpur",
          distance: 210,
          bio: "Marketing specialist with a love for music and photography.",
          compatibility: 78,
          photoURL: "https://randomuser.me/api/portraits/women/55.jpg",
          interests: ["photography", "music", "marketing", "traveling"],
          lastActive: "Yesterday",
          isOnline: false,
        },
        {
          uid: "4",
          name: "Anjali Gupta",
          age: 27,
          location: "Pune",
          distance: 8,
          bio: "PhD student researching AI, love hiking and good coffee.",
          compatibility: 88,
          photoURL: "https://randomuser.me/api/portraits/women/66.jpg",
          interests: ["AI", "hiking", "coffee", "reading"],
          lastActive: "Online",
          isOnline: true,
        },
        {
          uid: "5",
          name: "Pooja Verma",
          age: 28,
          location: "Mumbai",
          distance: 125,
          bio: "Frontend developer who enjoys yoga and cooking in free time.",
          compatibility: 83,
          photoURL: "https://randomuser.me/api/portraits/women/77.jpg",
          interests: ["coding", "yoga", "cooking", "movies"],
          lastActive: "3 days ago",
          isOnline: false,
        },
        {
          uid: "6",
          name: "Neha Kumar",
          age: 25,
          location: "Pune",
          distance: 12,
          bio: "Graphic designer with a passion for sustainable living.",
          compatibility: 76,
          photoURL: "https://randomuser.me/api/portraits/women/17.jpg",
          interests: ["design", "nature", "sustainability", "art"],
          lastActive: "Online",
          isOnline: true,
        },
      ];

      setMatches(mockMatches);
      setFilteredMatches(mockMatches);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter matches based on search query and filter parameters
  useEffect(() => {
    let result = [...matches];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (match) =>
          match.name.toLowerCase().includes(query) ||
          match.location.toLowerCase().includes(query) ||
          match.interests.some((interest) =>
            interest.toLowerCase().includes(query)
          )
      );
    }

    // Apply age filter
    result = result.filter(
      (match) =>
        match.age >= filterParams.ageRange[0] &&
        match.age <= filterParams.ageRange[1]
    );

    // Apply distance filter
    if (filterParams.distance < 200) {
      result = result.filter(
        (match) => match.distance <= filterParams.distance
      );
    }

    // Apply location filter
    if (filterParams.location !== "anywhere") {
      result = result.filter(
        (match) => match.location === filterParams.location
      );
    }

    // Apply interests filter
    if (filterParams.interests.length > 0) {
      result = result.filter((match) =>
        filterParams.interests.some((interest) =>
          match.interests.includes(interest)
        )
      );
    }

    // Apply sorting
    if (sortOption === "compatibility") {
      result.sort((a, b) => b.compatibility - a.compatibility);
    } else if (sortOption === "distance") {
      result.sort((a, b) => a.distance - b.distance);
    } else if (sortOption === "activity") {
      const activityScore = (match) => {
        if (match.isOnline) return 0;
        if (match.lastActive === "Just now") return 1;
        if (match.lastActive === "Today") return 2;
        if (match.lastActive === "Yesterday") return 3;
        return 4;
      };
      result.sort((a, b) => activityScore(a) - activityScore(b));
    }

    setFilteredMatches(result);
  }, [searchQuery, filterParams, sortOption, matches]);

  const handleFilterReset = () => {
    setFilterParams({
      ageRange: [22, 35],
      distance: 50,
      location: "anywhere",
      interests: [],
    });
    setSearchQuery("");
    setSortOption("relevance");
  };

  const sidebarItems = [
    { label: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
    {
      label: "Browse Matches",
      icon: <Search />,
      route: "/matches",
      badge: matches.length,
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

  const renderFilterDrawer = () => (
    <Drawer
      anchor="right"
      open={filterDrawerOpen}
      onClose={() => setFilterDrawerOpen(false)}
      size="sm"
    >
      <Box className="p-6 w-[280px] sm:w-[350px]">
        <Box className="flex justify-between items-center mb-6">
          <Typography
            level="title-lg"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Tune />
            Filters
          </Typography>
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => setFilterDrawerOpen(false)}
            aria-label="Close filter drawer"
          >
            <Close />
          </IconButton>
        </Box>

        <Stack spacing={3}>
          {/* Age Range Filter */}
          <Box>
            <Typography level="title-sm" className="mb-3 font-medium">
              Age Range: {filterParams.ageRange[0]} - {filterParams.ageRange[1]}
            </Typography>
            <Slider
              value={filterParams.ageRange}
              onChange={(_, newValue) =>
                setFilterParams({ ...filterParams, ageRange: newValue })
              }
              min={18}
              max={50}
              valueLabelDisplay="auto"
            />
          </Box>

          {/* Distance Filter */}
          <Box>
            <Typography level="title-sm" className="mb-3 font-medium">
              Distance:{" "}
              {filterParams.distance === 200
                ? "Any"
                : `${filterParams.distance} km`}
            </Typography>
            <Slider
              value={filterParams.distance}
              onChange={(_, newValue) =>
                setFilterParams({ ...filterParams, distance: newValue })
              }
              min={5}
              max={200}
              step={5}
              marks={[
                { value: 5, label: "5km" },
                { value: 50, label: "50km" },
                { value: 200, label: "Any" },
              ]}
              valueLabelDisplay="auto"
            />
          </Box>

          {/* Location Filter */}
          <Box>
            <Typography level="title-sm" className="mb-3 font-medium">
              Location
            </Typography>
            <Select
              value={filterParams.location}
              onChange={(_, newValue) =>
                setFilterParams({ ...filterParams, location: newValue })
              }
              placeholder="Select location"
              className="w-full"
            >
              <Option value="anywhere">Anywhere</Option>
              <Option value="Pune">Pune</Option>
              <Option value="Mumbai">Mumbai</Option>
              <Option value="Nagpur">Nagpur</Option>
            </Select>
          </Box>

          {/* Interests Filter */}
          <Box>
            <Typography level="title-sm" className="mb-3 font-medium">
              Interests
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => {
                const isSelected = filterParams.interests.includes(interest);
                return (
                  <Chip
                    key={interest}
                    variant={isSelected ? "solid" : "outlined"}
                    color={isSelected ? "primary" : "neutral"}
                    onClick={() => {
                      if (isSelected) {
                        setFilterParams({
                          ...filterParams,
                          interests: filterParams.interests.filter(
                            (i) => i !== interest
                          ),
                        });
                      } else {
                        setFilterParams({
                          ...filterParams,
                          interests: [...filterParams.interests, interest],
                        });
                      }
                    }}
                    className={`cursor-pointer hover:border-primary ${
                      isSelected ? "bg-primary text-white" : "border-gray-300"
                    }`}
                  >
                    {interest}
                  </Chip>
                );
              })}
            </Box>
          </Box>

          <Stack direction="row" spacing={2} className="mt-4">
            <Button
              variant="outlined"
              color="neutral"
              startDecorator={<Refresh />}
              onClick={handleFilterReset}
              className="flex-1"
            >
              Reset
            </Button>
            <Button
              variant="solid"
              color="primary"
              endDecorator={<CheckCircle />}
              onClick={() => setFilterDrawerOpen(false)}
              className="flex-1"
            >
              Apply
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box className="flex">
      {/* Sidebar for Larger Screens */}
      <Sheet className="w-0 md:w-[70px] h-screen fixed top-0 left-0 p-3 hidden md:block overflow-y-auto z-[1000] shadow-md border-r border-gray-200">
        <Box className="flex justify-center mb-8">
          <Avatar
            src="/api/placeholder/40/40"
            alt="LoveMatch Logo"
            className="w-9 h-9"
          />
        </Box>
        <Stack spacing={2}>
          {sidebarItems.map((item, index) => (
            <IconButton
              key={index}
              color="neutral"
              onClick={item.route ? () => navigate(item.route) : item.onClick}
              className="rounded-xl text-gray-800 hover:bg-gray-100 relative"
              aria-label={item.label}
            >
              {item.badge > 0 && (
                <Badge
                  badgeContent={item.badge}
                  color="danger"
                  size="sm"
                  className="absolute top-0 right-0"
                />
              )}
              {item.icon}
            </IconButton>
          ))}
        </Stack>
      </Sheet>

      {/* Main Content */}
      <Box className="flex-1 p-4 sm:p-6 md:p-8 w-full">
        {/* Header */}
        <Sheet className="p-2 sm:p-3 sticky top-0 z-[1000] flex justify-between items-center shadow-sm border-b border-gray-200 mb-4">
          <Box className="flex items-center gap-2">
            <IconButton
              color="neutral"
              onClick={() => setSidebarOpen(true)}
              size="sm"
              className="flex md:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="text-gray-800" />
            </IconButton>
            <Typography
              level="h5"
              className="font-semibold text-gray-800 text-base sm:text-lg"
            >
              LoveMatch
            </Typography>
          </Box>
          <Box className="flex gap-1">
            <IconButton color="neutral" size="sm" aria-label="Notifications">
              <Badge badgeContent={notificationCount} color="danger">
                <Notifications className="text-gray-800 text-sm" />
              </Badge>
            </IconButton>
            <IconButton color="neutral" size="sm" aria-label="Messages">
              <Badge badgeContent={messageCount} color="danger">
                <Message className="text-gray-800 text-sm" />
              </Badge>
            </IconButton>
          </Box>
        </Sheet>

        {/* Sidebar Drawer for Mobile/Tablet */}
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          className="block md:hidden"
        >
          <Box className="w-[250px] p-4 h-full border-r border-gray-200">
            <Box className="flex items-center gap-3 mb-8">
              <Avatar
                src="/api/placeholder/40/40"
                alt="LoveMatch Logo"
                className="w-9 h-9"
              />
              <Typography level="h5" className="font-semibold text-gray-800">
                LoveMatch
              </Typography>
            </Box>
            <Stack spacing={1}>
              {sidebarItems.map((item, index) => (
                <ListItemButton
                  key={index}
                  variant="soft"
                  color={index === 1 ? "primary" : "neutral"}
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
                  className="justify-start rounded-xl px-4 py-3"
                >
                  <Box className="flex gap-4 items-center w-full">
                    {item.icon}
                    <Typography
                      level="body-md"
                      className={index === 1 ? "text-white" : "text-gray-800"}
                    >
                      {item.label}
                    </Typography>
                    {item.badge > 0 && (
                      <Badge
                        badgeContent={item.badge}
                        color="danger"
                        size="sm"
                        className="ml-auto"
                      />
                    )}
                  </Box>
                </ListItemButton>
              ))}
            </Stack>
          </Box>
        </Drawer>

        {/* Search and Filter Card */}
        <Card
          variant="outlined"
          className="mb-8 rounded-2xl shadow-lg bg-white/90 backdrop-blur"
        >
          <Box className="p-4">
            <Typography
              level="h4"
              className="font-semibold text-gray-800 text-2xl sm:text-3xl flex items-center gap-2"
            >
              <Search fontSize="large" /> Browse Matches
            </Typography>
            <Typography
              level="body-lg"
              className="text-gray-600 mb-2 text-sm sm:text-base"
            >
              Discover potential matches based on your preferences
            </Typography>
          </Box>

          <CardContent>
            {/* Search and Filter Bar */}
            <Box className="flex flex-col sm:flex-row gap-4 mb-4">
              <Input
                placeholder="Search by name, location or interests..."
                startDecorator={<Search />}
                endDecorator={
                  searchQuery ? (
                    <IconButton
                      variant="plain"
                      color="neutral"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                    >
                      <Close />
                    </IconButton>
                  ) : null
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />

              <Select
                value={sortOption}
                onChange={(_, value) => setSortOption(value)}
                startDecorator={<Sort />}
                className="w-full sm:w-[200px]"
              >
                <Option value="relevance">Most Relevant</Option>
                <Option value="compatibility">Highest Compatibility</Option>
                <Option value="distance">Nearest First</Option>
                <Option value="activity">Recently Active</Option>
              </Select>

              <Button
                variant="outlined"
                color={
                  filterParams.ageRange[0] !== 22 ||
                  filterParams.ageRange[1] !== 35 ||
                  filterParams.distance !== 50 ||
                  filterParams.location !== "anywhere" ||
                  filterParams.interests.length > 0
                    ? "primary"
                    : "neutral"
                }
                startDecorator={<FilterList />}
                onClick={() => setFilterDrawerOpen(true)}
                className="w-full sm:w-auto"
              >
                Filters
                {filterParams.interests.length > 0 && (
                  <Chip
                    size="sm"
                    variant="solid"
                    color="primary"
                    className="ml-2"
                  >
                    {filterParams.interests.length}
                  </Chip>
                )}
              </Button>
            </Box>

            {/* Results Stats */}
            <Box className="flex justify-between items-center">
              <Typography level="body-md" className="text-gray-600">
                {filteredMatches.length} potential matches found
              </Typography>
              {(filterParams.ageRange[0] !== 22 ||
                filterParams.ageRange[1] !== 35 ||
                filterParams.distance !== 50 ||
                filterParams.location !== "anywhere" ||
                filterParams.interests.length > 0 ||
                searchQuery) && (
                <Button
                  variant="plain"
                  color="neutral"
                  size="sm"
                  startDecorator={<Refresh />}
                  onClick={handleFilterReset}
                >
                  Reset Filters
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Match Cards Grid */}
        {filteredMatches.length > 0 ? (
          <Grid container spacing={2}>
            {filteredMatches.map((match) => (
              <Grid key={match.uid} xs={12} sm={6} md={4} lg={3}>
                <Card
                  variant="outlined"
                  className="h-full rounded-2xl transition-all duration-200 shadow-md border border-gray-200 overflow-hidden hover:-translate-y-1 hover:shadow-xl"
                >
                  <Box className="relative">
                    <AspectRatio ratio="3/4" maxHeight={320}>
                      <img
                        src={match.photoURL}
                        alt={match.name}
                        className="object-cover w-full"
                      />
                    </AspectRatio>
                    {match.isOnline && (
                      <Chip
                        size="sm"
                        variant="solid"
                        color="success"
                        className="absolute top-2 right-2 text-xs"
                      >
                        Online
                      </Chip>
                    )}
                    <Box className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                      <Box className="flex justify-between items-center">
                        <Typography
                          level="title-lg"
                          className="text-white font-semibold"
                        >
                          {match.name}, {match.age}
                        </Typography>
                        <Chip
                          size="sm"
                          color="primary"
                          variant="solid"
                          className="font-bold"
                        >
                          {match.compatibility}%
                        </Chip>
                      </Box>
                      <Box className="flex items-center gap-1 mb-2">
                        <LocationOn fontSize="small" />
                        <Typography level="body-sm" className="text-white">
                          {match.location} • {match.distance} km
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <CardContent>
                    <Typography
                      level="body-sm"
                      className="mb-4 text-gray-600 h-10 overflow-hidden text-ellipsis"
                    >
                      {match.bio}
                    </Typography>

                    <Box className="flex flex-wrap gap-1 mb-4">
                      {match.interests.slice(0, 3).map((interest, idx) => (
                        <Chip
                          key={idx}
                          size="sm"
                          variant="soft"
                          color="neutral"
                          className="text-xs"
                        >
                          {interest}
                        </Chip>
                      ))}
                      {match.interests.length > 3 && (
                        <Chip
                          size="sm"
                          variant="outlined"
                          color="neutral"
                          className="text-xs"
                        >
                          +{match.interests.length - 3}
                        </Chip>
                      )}
                    </Box>

                    <Box className="flex gap-2">
                      <Button
                        variant="solid"
                        color="primary"
                        startDecorator={<Visibility />}
                        onClick={() => navigate(`/profile/${match.uid}`)}
                        className="flex-1 rounded-xl"
                      >
                        View
                      </Button>
                      <IconButton
                        variant="soft"
                        color="danger"
                        className="rounded-xl"
                        aria-label={`Like ${match.name}`}
                      >
                        <FavoriteBorder />
                      </IconButton>
                      <IconButton
                        variant="soft"
                        color="primary"
                        className="rounded-xl"
                        aria-label={`Message ${match.name}`}
                      >
                        <Message />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box className="flex flex-col items-center justify-center py-16">
            <Typography level="h6" className="text-gray-600 mb-4 text-center">
              No matches found. Try adjusting your filters or search criteria.
            </Typography>
            <Button
              variant="outlined"
              color="neutral"
              startDecorator={<Refresh />}
              onClick={handleFilterReset}
            >
              Reset Filters
            </Button>
          </Box>
        )}

        {/* Render Filter Drawer */}
        {renderFilterDrawer()}
      </Box>
    </Box>
  );
}
