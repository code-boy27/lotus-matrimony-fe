import * as Yup from "yup";

export const ProfileSchema = Yup.object().shape({
  publicData: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    gender: Yup.string().required("Gender is required"),
    birthDate: Yup.date()
      .required("Birth date is required")
      .max(new Date(), "Birth date cannot be in the future"),
    photoURL: Yup.string().notRequired(),
    religion: Yup.string().notRequired(),
    motherTongue: Yup.string().notRequired(),
    maritalStatus: Yup.string().notRequired(),
    education: Yup.string().notRequired(),
    occupation: Yup.string().notRequired(),
    location: Yup.string().notRequired(),
    about: Yup.string().notRequired(),
  }),
  privateData: Yup.object().shape({
    email: Yup.string().email("Invalid email format").notRequired(),
    phone: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number format")
      .notRequired(),
    height: Yup.string()
      .matches(/^\d*\.?\d*$/, "Height must be a valid number")
      .test("is-positive", "Height must be positive", (value) => {
        if (!value) return true; // Allow empty values
        const num = parseFloat(value);
        return !isNaN(num) && num > 0;
      }),
    caste: Yup.string().notRequired(),
    income: Yup.string().notRequired(),
    hobbies: Yup.string().notRequired(),
    familyDetails: Yup.string().notRequired(),
    partnerPreferences: Yup.string().notRequired(),
  }),
});
