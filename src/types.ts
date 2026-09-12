export type ConditionName =
  | "Paralysis"
  | "Stroke Recovery"
  | "Hemiplegia"
  | "Spinal Cord Injury"
  | "Sciatica"
  | "Slip Disc / Disc Bulge"
  | "Back Pain"
  | "Neck Pain"
  | "Knee Pain"
  | "Shoulder Pain"
  | "Arthritis"
  | "Sports Injury"
  | "Post-Surgery Rehabilitation"
  | "Cerebral Palsy"
  | "Pediatric Developmental Delay"
  | "Pediatric Motor & Gait Delay"
  | "Parkinson’s Rehabilitation"
  | "Balance / Walking Problem"
  | "Muscle Weakness"
  | "Joint Pain"
  | "Other";

export type SpecializationCategory =
  | "Neuro Rehabilitation"
  | "Ortho & Spine"
  | "Pediatric Physiotherapy"
  | "Rehabilitation & Mobility";

export interface ConditionInfo {
  name: ConditionName;
  category: SpecializationCategory;
  tagline: string;
  description: string;
  image: string;
  focusArea: string;
}

export interface PatientFormData {
  fullName: string;
  age: string;
  mobileNumber: string;
  address: string;
  city: string;
  state: string;
  problem: ConditionName | "";
  duration: string;
  description: string;
  previousTreatment: "Yes" | "No";
  reportName?: string;
  reportData?: string;
}

export interface BookingConfirmation {
  id: string;
  patientName: string;
  age: string;
  mobileNumber: string;
  address: string;
  city: string;
  state: string;
  problem: string;
  duration?: string;
  description?: string;
  previousTreatment?: string;
  reportName?: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  paymentMethod?: string;
  utrNumber?: string;
  orderId: string;
  paymentId: string;
  bookingDate: string;
  createdAt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
