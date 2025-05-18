export interface PublicProfileData {
  name: string;
  gender: string;
  birthDate: string;
  photoURL: string;
  religion: string;
  motherTongue: string;
  maritalStatus: string;
  education: string;
  occupation: string;
  location: string;
  about: string;
}

export interface PrivateProfileData {
  email: string;
  phone: string;
  height: string;
  caste: string;
  income: string;
  hobbies: string;
  familyDetails: string;
  partnerPreferences: string;
}

export interface ProfileFormValues {
  publicData: PublicProfileData;
  privateData: PrivateProfileData;
}

export interface ProfileImageData {
  file: File | null;
  url: string;
}

export interface ProfileImages {
  main: ProfileImageData;
  gallery: ProfileImageData[];
}
