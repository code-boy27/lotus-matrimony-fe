import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import { useAppSelector } from "../store/hooks";
import type { ProfileFormValues, ProfileImageData } from "../types/profile";
import { profileService } from "../services/profileService";
import type { RootStateType } from "../store/store";

interface UseProfileFormResult {
  initialValues: ProfileFormValues;
  loading: boolean;
  mainImage: ProfileImageData;
  galleryImages: ProfileImageData[];
  handleMainImageChange: (file: File) => void;
  handleAddGalleryImage: (file: File) => void;
  handleRemoveGalleryImage: (index: number) => void;
  handleSetMainImage: (index: number) => void;
  handleSubmit: (
    values: ProfileFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => Promise<void>;
}

export const useProfileForm = (): UseProfileFormResult => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = useAppSelector((state: RootStateType) => state.auth.user);

  const [loading, setLoading] = useState<boolean>(false);
  const [mainImage, setMainImage] = useState<ProfileImageData>({
    file: null,
    url: "",
  });
  const [galleryImages, setGalleryImages] = useState<ProfileImageData[]>([]);

  // Initial form values
  const [initialValues, setInitialValues] = useState<ProfileFormValues>({
    publicData: {
      name: "",
      gender: "",
      birthDate: "",
      photoURL: "",
      religion: "",
      motherTongue: "",
      maritalStatus: "",
      education: "",
      occupation: "",
      location: "",
      about: "",
    },
    privateData: {
      email: user?.email || "",
      phone: "",
      height: "",
      caste: "",
      income: "",
      hobbies: "",
      familyDetails: "",
      partnerPreferences: "",
    },
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const [publicData, privateData] = await Promise.all([
          profileService.fetchPublicData(user.uid),
          profileService.fetchPrivateData(user.uid),
        ]);

        if (publicData) {
          // Set main image URL if it exists
          if (publicData.photoURL) {
            setMainImage({
              file: null,
              url: publicData.photoURL,
            });
          }

          // Set gallery images if they exist
          if (publicData.galleryURLs && Array.isArray(publicData.galleryURLs)) {
            setGalleryImages(
              publicData.galleryURLs.map((url: string) => ({ file: null, url }))
            );
          }

          // Update form values with fetched data, ensuring all fields are strings
          setInitialValues((prevValues) => ({
            ...prevValues,
            publicData: {
              ...prevValues.publicData,
              ...publicData,
              birthDate: publicData.birthDate || "",
            },
            privateData: {
              ...prevValues.privateData,
              ...(privateData || {}),
              height: privateData?.height?.toString() || "",
              income: privateData?.income?.toString() || "",
            },
          }));
        }
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

    fetchUserProfile();
  }, [user, navigate, toast]);

  const handleMainImageChange = (file: File) => {
    setMainImage({
      file,
      url: URL.createObjectURL(file),
    });
  };

  const handleAddGalleryImage = (file: File) => {
    setGalleryImages([
      ...galleryImages,
      { file, url: URL.createObjectURL(file) },
    ]);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const handleSetMainImage = (index: number) => {
    // Get the selected image
    const selectedImage = galleryImages[index];

    // If we had a main image before, add it to the gallery
    if (mainImage.url) {
      setGalleryImages([
        ...galleryImages.filter((_, i) => i !== index),
        mainImage,
      ]);
    } else {
      setGalleryImages(galleryImages.filter((_, i) => i !== index));
    }

    // Set the selected image as main
    setMainImage(selectedImage);
  };

  const handleSubmit = async (
    values: ProfileFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setSubmitting(true);
    setLoading(true);

    try {
      const result = await profileService.saveProfile(
        user.uid,
        values,
        mainImage,
        galleryImages
      );

      if (result.success) {
        toast({
          title: "Success",
          description: "Profile updated successfully!",
        });
        navigate("/dashboard");
      } else {
        throw new Error(result.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return {
    initialValues,
    loading,
    mainImage,
    galleryImages,
    handleMainImageChange,
    handleAddGalleryImage,
    handleRemoveGalleryImage,
    handleSetMainImage,
    handleSubmit,
  };
};
