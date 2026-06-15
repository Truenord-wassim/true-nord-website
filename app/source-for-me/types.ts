export const COUNTRY_OPTIONS = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Jordan",
  "Egypt",
  "Other",
] as const;

export type FormState = {
  status: "idle" | "success" | "error";
  errors?: {
    fullName?: string[];
    email?: string[];
    companyName?: string[];
    country?: string[];
    phone?: string[];
    sourcingDetails?: string[];
    productPhoto?: string[];
    consent?: string[];
  };
  message?: string;
};

export const initialFormState: FormState = { status: "idle" };
