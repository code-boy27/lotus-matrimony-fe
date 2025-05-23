import React, { createContext, useContext, useState } from "react";

type Language = "en" | "mr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.profile": "Profile",
    "dashboard.browseMatches": "Browse Matches",
    "dashboard.messages": "Messages",
    "dashboard.notifications": "Notifications",
    "dashboard.profileCompleteness": "Profile Completeness",
    "dashboard.sectionCompletion": "Section Completion",
    "dashboard.recentMatches": "Recent Matches",
    "dashboard.recentVisitors": "Recent Visitors",
    "dashboard.completeProfile": "Complete Profile",
    "dashboard.editProfile": "Edit Profile",
    "dashboard.viewAll": "View All",
    "dashboard.noMatches": "No matches yet",
    "dashboard.noVisitors": "No visitors yet",
    "dashboard.browse": "Browse",
    "dashboard.browseProfiles": "Browse Profiles",
    "dashboard.findPerfectMatch": "Find your perfect match",
    "dashboard.viewConversations": "View your conversations",
    "dashboard.stayUpdated": "Stay updated with activities",
    "dashboard.completeProfileMessage":
      "Complete your profile to find your perfect match",
    "dashboard.profileComplete": "Your profile is complete!",
    "dashboard.loadingProfile": "Loading profile...",
    "dashboard.profileNotFound":
      "Profile not found. Please complete your profile setup.",

    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.profile": "Profile",
    "nav.messages": "Messages",
    "nav.matches": "Matches",
    "nav.logout": "Logout",

    // Profile Sections
    "profile.basicInfo": "Basic Information",
    "profile.contactInfo": "Contact Information (Private)",
    "profile.education": "Education",
    "profile.about": "About Me",
    "profile.preferences": "Preferences",
    "profile.gallery": "Gallery",
    "profile.location": "Location",
    "profile.interests": "Interests",
    "profile.bio": "Bio",
    "profile.photoGallery": "Photo Gallery",
    "profile.aboutMePreferences": "About Me & Preferences",
    "profile.educationCareer": "Education & Career (Public)",
    "profile.uploadPhotoMessage":
      "Upload a clear profile photo to increase your profile visibility",
    "profile.dataVisibility": "Data Visibility:",
    "profile.public": "Public - Visible to all",
    "profile.private": "Private - Visible to subscribers",
    "profile.height": "Height",
    "profile.email": "Email",
    "profile.phone": "Phone Number",
    "profile.firstName": "First Name",
    "profile.middleName": "Middle Name",
    "profile.lastName": "Last Name",
    "profile.fullName": "Full Name",
    "profile.fullNamePlaceholder": "Your full name",
    "profile.firstNamePlaceholder": "Your first name",
    "profile.middleNamePlaceholder": "Your middle name (optional)",
    "profile.lastNamePlaceholder": "Your last name",
    "profile.emailPlaceholder": "Your email address",
    "profile.phonePlaceholder": "Your phone number",
    "profile.heightPlaceholder": "Your height in centimeters",
    "profile.castePlaceholder": "Your caste/community",
    "profile.educationPlaceholder": "Highest qualification",
    "profile.occupationPlaceholder": "Your occupation",
    "profile.incomePlaceholder": "Your annual income",
    "profile.aboutMePlaceholder": "Write something about yourself...",
    "profile.interestsPlaceholder": "Your hobbies and interests...",
    "profile.familyDetailsPlaceholder": "About your family background...",
    "profile.partnerPreferencesPlaceholder":
      "What you're looking for in a partner...",
    "profile.caste": "Caste/Community",
    "profile.income": "Annual Income",
    "profile.aboutMe": "About Me",
    "profile.partnerPreferences": "Partner Preferences",
    "profile.familyDetails": "Family Details",
    "profile.occupation": "Occupation",
    "profile.casteReligion": "Caste/Religion",
    "profile.casteReligionPlaceholder": "Your caste and religion",
    "profile.saveProfile": "Save Profile",
    "profile.editProfile": "Edit Profile",
    "profile.selectGender": "Select Gender",
    "profile.gender.male": "Male",
    "profile.gender.female": "Female",
    "profile.gender.other": "Other",
    "profile.birthDate": "Birth Date",
    "profile.locationPlaceholder": "City, Country",
    "profile.religion": "Religion",
    "profile.religionPlaceholder": "Your religion",
    "profile.motherTongue": "Mother Tongue",
    "profile.motherTonguePlaceholder": "Your mother tongue",
    "profile.maritalStatus": "Marital Status",
    "profile.selectMaritalStatus": "Select Status",
    "profile.maritalStatus.neverMarried": "Never Married",
    "profile.maritalStatus.divorced": "Divorced",
    "profile.maritalStatus.widowed": "Widowed",
    "profile.maritalStatus.awaitingDivorce": "Awaiting Divorce",
    "profile.uploadPhoto": "Upload Photo",
    "profile.changePhoto": "Change Photo",
    "profile.addGalleryImage": "Add Gallery Image",
    "profile.removeImage": "Remove Image",
    "profile.setAsMain": "Set as Main Photo",
    "profile.addPhoto": "Add Photo",
    "profile.noImage": "No Image",
  },
  mr: {
    // Dashboard
    "dashboard.title": "डॅशबोर्ड",
    "dashboard.profile": "प्रोफाइल",
    "dashboard.browseMatches": "जुळवा शोधा",
    "dashboard.messages": "संदेश",
    "dashboard.notifications": "सूचना",
    "dashboard.profileCompleteness": "प्रोफाइल पूर्णता",
    "dashboard.sectionCompletion": "विभाग पूर्णता",
    "dashboard.recentMatches": "अलीकडील जुळवा",
    "dashboard.recentVisitors": "अलीकडील भेट देणारे",
    "dashboard.completeProfile": "प्रोफाइल पूर्ण करा",
    "dashboard.editProfile": "प्रोफाइल संपादित करा",
    "dashboard.viewAll": "सर्व पहा",
    "dashboard.noMatches": "अजून कोणतेही जुळवा नाहीत",
    "dashboard.noVisitors": "अजून कोणी भेट दिले नाही",
    "dashboard.browse": "ब्राउज करा",
    "dashboard.browseProfiles": "प्रोफाइल ब्राउज करा",
    "dashboard.findPerfectMatch": "आपला परिपूर्ण जुळवा शोधा",
    "dashboard.viewConversations": "आपली संभाषणे पहा",
    "dashboard.stayUpdated": "क्रियाकलापांसह अद्यतन रहा",
    "dashboard.completeProfileMessage":
      "आपला परिपूर्ण जोडीदार शोधण्यासाठी आपली प्रोफाइल पूर्ण करा",
    "dashboard.profileComplete": "आपला प्रोफाइल पूर्ण झाला आहे!",
    "dashboard.loadingProfile": "प्रोफाइल लोड होत आहे...",
    "dashboard.profileNotFound":
      "प्रोफाइल सापडला नाही. कृपया आपला प्रोफाइल सेटअप पूर्ण करा.",

    // Navigation
    "nav.dashboard": "डॅशबोर्ड",
    "nav.profile": "माझा प्रोफाइल",
    "nav.messages": "संदेश",
    "nav.matches": "जुळवा शोधा",
    "nav.logout": "लॉगआउट",

    // Profile Sections
    "profile.basicInfo": "मूलभूत माहिती",
    "profile.contactInfo": "संपर्क माहिती (खाजगी)",
    "profile.education": "शिक्षण",
    "profile.about": "माझ्याबद्दल",
    "profile.preferences": "प्राधान्ये",
    "profile.gallery": "गॅलरी",
    "profile.location": "स्थान",
    "profile.interests": "छंद आणि आवडी",
    "profile.bio": "बायो",
    "profile.photoGallery": "फोटो गॅलरी",
    "profile.aboutMePreferences": "माझ्याबद्दल आणि प्राधान्ये",
    "profile.educationCareer": "शिक्षण आणि कारकीर्द (सार्वजनिक)",
    "profile.uploadPhotoMessage":
      "आपल्या प्रोफाइल दृश्यमानता वाढवण्यासाठी स्पष्ट प्रोफाइल फोटो अपलोड करा",
    "profile.dataVisibility": "माहितीची दृश्यमानता:",
    "profile.public": "सार्वजनिक - सर्वांना दृश्यमान",
    "profile.private": "खाजगी - सदस्यांना दृश्यमान",
    "profile.height": "उंची",
    "profile.email": "ईमेल",
    "profile.phone": "फोन नंबर",
    "profile.firstName": "पहिले नाव",
    "profile.middleName": "मधले नाव",
    "profile.lastName": "आडनाव",
    "profile.fullName": "पूर्ण नाव",
    "profile.fullNamePlaceholder": "आपले पूर्ण नाव",
    "profile.firstNamePlaceholder": "आपले पहिले नाव",
    "profile.middleNamePlaceholder": "आपले मधले नाव (पर्यायी)",
    "profile.lastNamePlaceholder": "आपले आडनाव",
    "profile.emailPlaceholder": "आपला ईमेल पत्ता",
    "profile.phonePlaceholder": "आपला फोन नंबर",
    "profile.heightPlaceholder": "सेंटीमीटरमध्ये उंची",
    "profile.castePlaceholder": "आपली जात/समुदाय",
    "profile.educationPlaceholder": "सर्वोच्च पात्रता",
    "profile.occupationPlaceholder": "आपले व्यवसाय",
    "profile.incomePlaceholder": "आपले वार्षिक उत्पन्न",
    "profile.aboutMePlaceholder": "स्वतःबद्दल काहीतरी लिहा...",
    "profile.interestsPlaceholder": "आपले छंद आणि आवडी...",
    "profile.familyDetailsPlaceholder": "आपल्या कुटुंबीय पार्श्वभूमीबद्दल...",
    "profile.partnerPreferencesPlaceholder": "जोडीदारामध्ये काय शोधत आहात...",
    "profile.caste": "जात/समुदाय",
    "profile.income": "वार्षिक उत्पन्न",
    "profile.aboutMe": "माझ्याबद्दल",
    "profile.partnerPreferences": "जोडीदार प्राधान्ये",
    "profile.familyDetails": "कुटुंबीय माहिती",
    "profile.occupation": "व्यवसाय",
    "profile.casteReligion": "जात/धर्म",
    "profile.casteReligionPlaceholder": "आपली जात आणि धर्म",
    "profile.saveProfile": "प्रोफाइल जतन करा",
    "profile.editProfile": "प्रोफाइल संपादित करा",
    "profile.selectGender": "लिंग निवडा",
    "profile.gender.male": "पुरुष",
    "profile.gender.female": "स्त्री",
    "profile.gender.other": "इतर",
    "profile.birthDate": "जन्मतारीख",
    "profile.locationPlaceholder": "शहर, देश",
    "profile.religion": "धर्म",
    "profile.religionPlaceholder": "आपला धर्म",
    "profile.motherTongue": "मातृभाषा",
    "profile.motherTonguePlaceholder": "आपली मातृभाषा",
    "profile.maritalStatus": "वैवाहिक स्थिती",
    "profile.selectMaritalStatus": "स्थिती निवडा",
    "profile.maritalStatus.neverMarried": "अविवाहित",
    "profile.maritalStatus.divorced": "घटस्फोटित",
    "profile.maritalStatus.widowed": "विधवा/विधुर",
    "profile.maritalStatus.awaitingDivorce": "घटस्फोट प्रक्रियेत",
    "profile.uploadPhoto": "फोटो अपलोड करा",
    "profile.changePhoto": "फोटो बदला",
    "profile.addGalleryImage": "गॅलरी फोटो जोडा",
    "profile.removeImage": "फोटो काढा",
    "profile.setAsMain": "मुख्य फोटो म्हणून सेट करा",
    "profile.addPhoto": "फोटो जोडा",
    "profile.noImage": "फोटो नाही",
  },
} as const;

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
