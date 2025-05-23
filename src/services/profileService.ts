import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/config";
import type { ProfileFormValues, ProfileImageData } from "../types/profile";

interface SaveProfileResult {
  success: boolean;
  error?: string;
}

interface UploadImageParams {
  userId: string;
  file: File;
  prefix?: string;
}

interface DashboardOverview {
  profileCompleteness: number;
  sectionCompletion: {
    basicInfo: number;
    contactInfo: number;
    education: number;
    about: number;
    preferences: number;
    gallery: number;
  };
}

export const profileService = {
  async fetchPublicData(userId: string) {
    try {
      const publicRef = doc(db, "profiles", userId, "publicData", "main");
      const publicSnap = await getDoc(publicRef);

      if (publicSnap.exists()) {
        return publicSnap.data();
      } else {
        console.log("No public data found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching public data:", error);
      throw error;
    }
  },

  async fetchPrivateData(userId: string) {
    try {
      const privateRef = doc(db, "profiles", userId, "privateData", "main");
      const privateSnap = await getDoc(privateRef);

      if (privateSnap.exists()) {
        return privateSnap.data();
      } else {
        console.log("No private data found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching private data:", error);
      throw error;
    }
  },

  // UPLOAD IMAGE AND GET URLS
  async uploadImage({
    userId,
    file,
    prefix = "profileImages",
  }: UploadImageParams): Promise<string> {
    try {
      // Check if file is defined
      if (!file) {
        throw new Error("File is required");
      }

      const timestamp = new Date().getTime();
      const filename = `${userId}_${prefix}_${timestamp}`;
      const storageRef = ref(storage, `${userId}/${prefix}/${filename}`);
      await uploadBytes(storageRef, file);

      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  async profileImageUpload(
    userId: string,
    image: ProfileImageData
  ): Promise<string | null> {
    if (!image.file) {
      return null;
    }

    return await this.uploadImage({
      userId,
      file: image.file as File,
    });
  },

  async galleryImagesUpload(
    userId: string,
    images: ProfileImageData[]
  ): Promise<string[]> {
    const uploadPromises = images
      .filter((img) => img.file !== null)
      .map((img) =>
        this.uploadImage({
          userId,
          file: img.file as File,
          prefix: "galleryImages",
        })
      );

    return await Promise.all(uploadPromises);
  },

  calculateDashboardMetrics(
    publicData: any,
    privateData: any
  ): DashboardOverview {
    const calculateSectionProgress = (
      ...fields: (string | undefined | null)[]
    ): number => {
      const totalFields = fields.length;
      const completedFields = fields.filter(Boolean).length;
      return Math.round((completedFields / totalFields) * 100);
    };

    const sectionCompletion = {
      basicInfo: calculateSectionProgress(
        publicData.name,
        publicData.gender,
        publicData.birthDate
      ),
      contactInfo: calculateSectionProgress(
        privateData?.phone,
        publicData.location
      ),
      education: calculateSectionProgress(
        publicData.education,
        publicData.occupation
      ),
      about: calculateSectionProgress(
        publicData.about,
        privateData?.hobbies,
        privateData?.familyDetails
      ),
      preferences: calculateSectionProgress(privateData?.partnerPreferences),
      gallery: calculateSectionProgress(
        publicData.photoURL,
        publicData.galleryURLs && publicData.galleryURLs.length > 0
          ? publicData.galleryURLs[0]
          : null
      ),
    };

    // Calculate overall profile completeness with weights
    const weights = {
      basicInfo: 20,
      contactInfo: 15,
      education: 15,
      about: 15,
      preferences: 20,
      gallery: 15,
    };

    const totalWeight = Object.values(weights).reduce(
      (sum, weight) => sum + weight,
      0
    );
    const weightedSum = Object.entries(sectionCompletion).reduce(
      (sum, [key, progress]) =>
        sum + progress * weights[key as keyof typeof weights],
      0
    );

    const profileCompleteness = Math.round(weightedSum / totalWeight);

    return {
      profileCompleteness,
      sectionCompletion,
    };
  },

  async saveDashboardOverview(
    userId: string,
    overview: DashboardOverview
  ): Promise<void> {
    try {
      const overviewRef = doc(db, "dashboard-overview", userId);
      await setDoc(overviewRef, {
        ...overview,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error saving dashboard overview:", error);
      throw error;
    }
  },

  async getDashboardOverview(
    userId: string
  ): Promise<DashboardOverview | null> {
    try {
      const overviewRef = doc(db, "dashboard-overview", userId);
      const overviewSnap = await getDoc(overviewRef);

      if (overviewSnap.exists()) {
        return overviewSnap.data() as DashboardOverview;
      }
      return null;
    } catch (error) {
      console.error("Error fetching dashboard overview:", error);
      throw error;
    }
  },

  async saveProfile(
    userId: string,
    profileData: ProfileFormValues,
    mainImage: ProfileImageData,
    galleryImages: ProfileImageData[]
  ): Promise<SaveProfileResult> {
    try {
      const metadata = {
        userId,
        updatedAt: new Date(),
      };

      // Upload main profile image if needed
      let photoURL = profileData.publicData.photoURL;
      if (mainImage.file) {
        photoURL = await this.uploadImage({
          userId,
          file: mainImage.file,
        });
      }

      // Upload gallery images if needed
      const galleryURLs = await this.galleryImagesUpload(userId, galleryImages);

      // Update the photoURL in the form values
      profileData.publicData.photoURL = photoURL;

      // Save public data
      const publicRef = doc(db, "profiles", userId, "publicData", "main");
      await setDoc(
        publicRef,
        {
          ...profileData.publicData,
          galleryURLs,
          ...metadata,
        },
        { merge: true }
      );

      // Save private data
      const privateRef = doc(db, "profiles", userId, "privateData", "main");
      await setDoc(
        privateRef,
        {
          ...profileData.privateData,
          ...metadata,
        },
        { merge: true }
      );

      // Calculate and save dashboard metrics
      const dashboardMetrics = this.calculateDashboardMetrics(
        profileData.publicData,
        profileData.privateData
      );
      await this.saveDashboardOverview(userId, dashboardMetrics);

      return { success: true };
    } catch (error) {
      console.error("Error saving profile:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  },
};
