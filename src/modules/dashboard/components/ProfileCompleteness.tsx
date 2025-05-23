import { CircularProgress } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { useEffect, useState } from "react";
import { profileService } from "../../../services/profileService";

export const ProfileCompleteness = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [completeness, setCompleteness] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompleteness = async () => {
      if (user) {
        try {
          const overview = await profileService.getDashboardOverview(user.uid);
          setCompleteness(overview?.profileCompleteness || 0);
        } catch (error) {
          console.error("Error fetching profile completeness:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCompleteness();
  }, [user]);

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "success";
    if (percentage >= 50) return "warning";
    return "danger";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col items-center">
        <CircularProgress
          size="lg"
          determinate
          value={completeness}
          color={getProgressColor(completeness)}
          className="mb-4"
        >
          {completeness}%
        </CircularProgress>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Profile Completeness
        </h3>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Complete your profile to increase your chances of finding a match
        </p>
        <button
          onClick={() => navigate("/profile-setup")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Complete Profile
        </button>
      </div>
    </div>
  );
};
