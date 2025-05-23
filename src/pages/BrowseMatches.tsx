import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Input,
  Select,
  Option,
  Chip,
  Stack,
  Slider,
  FormControl,
  FormLabel,
} from "@mui/joy";
import {
  FavoriteBorder,
  Message,
  Search,
  FilterList,
  LocationOn,
  Sort,
  Refresh,
  Visibility,
} from "@mui/icons-material";
import MainLayout from "../components/layout/MainLayout";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface Match {
  uid: string;
  name: string;
  age: number;
  location: string;
  photoURL: string;
  education?: string;
  occupation?: string;
  religion?: string;
  maritalStatus?: string;
  bio?: string;
  interests?: string[];
  isOnline?: boolean;
  compatibility?: number;
  distance?: number;
  lastActive?: string;
}

export default function BrowseMatches() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("relevance");
  const [filters, setFilters] = useState({
    ageRange: [18, 50],
    location: "",
    religion: "",
    maritalStatus: "",
  });

  useEffect(() => {
    const fetchMatches = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        // TODO: Replace with actual API call to fetch matches
        // For now using mock data
        const mockMatches: Match[] = [
          {
            uid: "1",
            name: "Priya Sharma",
            age: 28,
            location: "Mumbai",
            photoURL: "https://randomuser.me/api/portraits/women/33.jpg",
            education: "Masters in Computer Science",
            occupation: "Software Engineer",
            religion: "Hindu",
            maritalStatus: "Never Married",
            bio: "Software engineer who loves to travel and explore new cultures.",
            interests: ["coding", "traveling", "coffee", "music"],
            isOnline: true,
            compatibility: 85,
            distance: 120,
            lastActive: "Just now",
          },
          {
            uid: "2",
            name: "Kavita Desai",
            age: 26,
            location: "Pune",
            photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
            education: "Bachelors in Business",
            occupation: "Marketing Manager",
            religion: "Hindu",
            maritalStatus: "Never Married",
            bio: "UX designer passionate about creating meaningful digital experiences.",
            interests: ["design", "art", "yoga", "reading"],
            isOnline: false,
            compatibility: 92,
            distance: 5,
            lastActive: "2 hours ago",
          },
          {
            uid: "3",
            name: "Deepika Patel",
            age: 29,
            location: "Nagpur",
            photoURL: "https://randomuser.me/api/portraits/women/55.jpg",
            education: "Masters in Finance",
            occupation: "Financial Analyst",
            religion: "Hindu",
            maritalStatus: "Never Married",
            bio: "Marketing specialist with a love for music and photography.",
            interests: ["photography", "music", "marketing", "traveling"],
            isOnline: false,
            compatibility: 78,
            distance: 210,
            lastActive: "Yesterday",
          },
        ];

        setMatches(mockMatches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [user, navigate]);

  const filteredMatches = matches.filter((match) => {
    const matchesSearch = match.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesAge =
      match.age >= filters.ageRange[0] && match.age <= filters.ageRange[1];
    const matchesLocation = filters.location
      ? match.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;
    const matchesReligion = filters.religion
      ? match.religion === filters.religion
      : true;
    const matchesMaritalStatus = filters.maritalStatus
      ? match.maritalStatus === filters.maritalStatus
      : true;

    return (
      matchesSearch &&
      matchesAge &&
      matchesLocation &&
      matchesReligion &&
      matchesMaritalStatus
    );
  });

  const handleFilterReset = () => {
    setFilters({
      ageRange: [18, 50],
      location: "",
      religion: "",
      maritalStatus: "",
    });
    setSearchQuery("");
    setSortOption("relevance");
  };

  const renderMatchCard = (match: Match) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        variant="outlined"
        className="h-[400px] w-full rounded-xl transition-all duration-200 shadow-sm border border-gray-100 overflow-hidden hover:shadow-md"
      >
        <Box className="relative h-[240px]">
          <img
            src={match.photoURL}
            alt={match.name}
            className="w-full h-full object-cover"
          />
          <Box className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <Box className="absolute bottom-0 left-0 right-0 p-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 max-w-[80%]">
              <Typography
                level="title-md"
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500"
              >
                {match.name}, {match.age}
              </Typography>
              <Box className="flex items-center gap-1">
                <LocationOn fontSize="small" className="text-violet-600" />
                <Typography level="body-sm" className="text-gray-700">
                  {match.location}
                </Typography>
              </Box>
            </div>
          </Box>
        </Box>

        <CardContent className="p-4 flex flex-col h-[160px]">
          <Typography
            level="body-sm"
            className="mb-3 text-gray-600 h-12 overflow-hidden text-ellipsis line-clamp-2"
          >
            {match.bio}
          </Typography>

          <Box className="flex flex-wrap gap-1.5 mb-3">
            {match.interests?.slice(0, 3).map((interest, idx) => (
              <Chip
                key={idx}
                size="sm"
                variant="soft"
                className="text-xs font-medium bg-violet-50 text-violet-700"
              >
                {interest}
              </Chip>
            ))}
            {match.interests && match.interests.length > 3 && (
              <Chip
                size="sm"
                variant="outlined"
                className="text-xs font-medium border-violet-200 text-violet-600"
              >
                +{match.interests.length - 3}
              </Chip>
            )}
          </Box>

          <Box className="flex gap-2 mt-auto">
            <Button
              variant="solid"
              className="flex-1 rounded-lg font-medium bg-violet-600 text-white hover:bg-violet-700"
              startDecorator={<Visibility />}
              onClick={() => navigate(`/profile/${match.uid}`)}
            >
              View Profile
            </Button>
            <IconButton
              variant="soft"
              className="rounded-lg bg-violet-50 text-violet-600 hover:bg-violet-100"
              aria-label={`Like ${match.name}`}
            >
              <FavoriteBorder />
            </IconButton>
            <IconButton
              variant="soft"
              className="rounded-lg bg-violet-50 text-violet-600 hover:bg-violet-100"
              aria-label={`Message ${match.name}`}
            >
              <Message />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <MainLayout title="Browse Matches">
      <div className="px-2">
        {/* Header Section */}
        <div className="mb-6">
          <Typography
            level="h1"
            className="text-3xl font-semibold text-gray-900 mb-2"
          >
            Browse Matches
          </Typography>
          <Typography level="body-lg" className="text-gray-600">
            Discover meaningful connections with people who share your values
          </Typography>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-6 rounded-xl border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Search by name, location or interests..."
                startDecorator={<Search className="text-gray-400" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Select
                value={sortOption}
                onChange={(_, value) => setSortOption(value as string)}
                startDecorator={<Sort className="text-gray-400" />}
                className="w-full sm:w-[200px]"
              >
                <Option value="relevance">Most Relevant</Option>
                <Option value="compatibility">Highest Compatibility</Option>
                <Option value="distance">Nearest First</Option>
                <Option value="activity">Recently Active</Option>
              </Select>
              <Button
                variant="outlined"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
                startDecorator={<FilterList />}
                onClick={handleFilterReset}
              >
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="sticky top-4 rounded-xl border border-gray-100">
              <CardContent>
                <Typography
                  level="title-md"
                  className="mb-4 font-semibold text-gray-900"
                >
                  Quick Filters
                </Typography>

                <Stack spacing={3}>
                  <FormControl>
                    <FormLabel>Age Range</FormLabel>
                    <Slider
                      value={filters.ageRange}
                      onChange={(_, value) =>
                        setFilters({ ...filters, ageRange: value as number[] })
                      }
                      min={18}
                      max={50}
                      valueLabelDisplay="auto"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{filters.ageRange[0]} years</span>
                      <span>{filters.ageRange[1]} years</span>
                    </div>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Location</FormLabel>
                    <Input
                      value={filters.location}
                      onChange={(e) =>
                        setFilters({ ...filters, location: e.target.value })
                      }
                      placeholder="Enter location"
                      startDecorator={<LocationOn />}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Religion</FormLabel>
                    <Select
                      value={filters.religion}
                      onChange={(_, value) =>
                        setFilters({ ...filters, religion: value as string })
                      }
                      placeholder="Select religion"
                    >
                      <Option value="Hindu">Hindu</Option>
                      <Option value="Muslim">Muslim</Option>
                      <Option value="Christian">Christian</Option>
                      <Option value="Sikh">Sikh</Option>
                      <Option value="Buddhist">Buddhist</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </FormControl>

                  <Button
                    variant="plain"
                    className="text-violet-600 hover:text-violet-700 hover:bg-violet-50"
                    startDecorator={<Refresh />}
                    onClick={handleFilterReset}
                  >
                    Reset All Filters
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </div>

          {/* Match Cards Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Typography level="body-lg" className="text-gray-600">
                  Loading matches...
                </Typography>
              </div>
            ) : filteredMatches.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMatches.map((match) => (
                  <div key={match.uid}>{renderMatchCard(match)}</div>
                ))}
              </div>
            ) : (
              <Box className="flex flex-col items-center justify-center py-16">
                <Typography
                  level="title-md"
                  className="text-gray-600 mb-4 text-center"
                >
                  No matches found. Try adjusting your filters or search
                  criteria.
                </Typography>
                <Button
                  variant="outlined"
                  className="text-violet-600 border-violet-600 hover:bg-violet-50"
                  startDecorator={<Refresh />}
                  onClick={handleFilterReset}
                >
                  Reset Filters
                </Button>
              </Box>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
