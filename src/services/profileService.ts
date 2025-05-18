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
        // If a new main image is provided, upload it

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
          galleryURLs, // Add gallery URLs to public data
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
