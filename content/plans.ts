import { PRICE_PLACEHOLDER } from "@/config/pricing";

export type PlanTierId = "program" | "coach" | "premium";

export type PlanFeature = {
  text: string;
  bold?: boolean;
};

export type PlanTier = {
  id: PlanTierId;
  name: string;
  price: string;
  tagline: string;
  features: PlanFeature[];
  cta: string;
  highlight?: boolean;
};

// Shared by the Gym, Home Gym, and Outdoor/Calisthenics categories — the
// three tiers are identical in structure across all of them.
export const standardPlanTiers: PlanTier[] = [
  {
    id: "program",
    name: "Program",
    price: PRICE_PLACEHOLDER,
    tagline: "Εξατομικευμένο πρόγραμμα προπόνησης",
    features: [
      { text: "Βίντεο ασκήσεων" },
      { text: "Σετ & επαναλήψεις" },
      { text: "Εβδομαδιαία εξέλιξη" },
      { text: "Καταγραφή προπονήσεων" },
    ],
    cta: "ΞΕΚΙΝΑ ΤΟ PROGRAM",
  },
  {
    id: "coach",
    name: "Coach",
    price: PRICE_PLACEHOLDER,
    tagline: "Ό,τι περιλαμβάνει το Program, και επιπλέον:",
    features: [
      { text: "1 online κλήση coaching / εβδομάδα", bold: true },
      { text: "Εβδομαδιαίος έλεγχος προόδου" },
      { text: "Feedback τεχνικής εκτέλεσης" },
      { text: "Προσαρμογές προγράμματος" },
    ],
    cta: "ΞΕΚΙΝΑ ΤΟ COACH",
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: PRICE_PLACEHOLDER,
    tagline: "Ό,τι περιλαμβάνει το Coaching, και επιπλέον:",
    features: [
      { text: "2 online κλήσεις coaching / εβδομάδα", bold: true },
      { text: "Εξατομικευμένο πλάνο διατροφής" },
      { text: "Παρακολούθηση διατροφής" },
      { text: "Πλήρης εβδομαδιαία καθοδήγηση" },
    ],
    cta: "ΞΕΚΙΝΑ ΤΟ PREMIUM",
  },
];

// Adaptive Fitness gets its own three tiers — same visual structure as
// standardPlanTiers, but every tier includes the initial assessment call.
export const adaptedPlanTiers: PlanTier[] = [
  {
    id: "program",
    name: "Adapted Program",
    price: PRICE_PLACEHOLDER,
    tagline: "Εξατομικευμένο πρόγραμμα προπόνησης",
    features: [
      { text: "Αρχική online αξιολόγηση", bold: true },
      { text: "Βίντεο ασκήσεων" },
      { text: "Εβδομαδιαία εξέλιξη" },
      { text: "Καταγραφή προπονήσεων" },
    ],
    cta: "ΞΕΚΙΝΑ ΤΟ ADAPTED PROGRAM",
  },
  {
    id: "coach",
    name: "Adapted Coach",
    price: PRICE_PLACEHOLDER,
    tagline: "Ό,τι περιλαμβάνει το Adapted Program, και επιπλέον:",
    features: [
      { text: "Αρχική online αξιολόγηση", bold: true },
      { text: "1 online κλήση coaching / εβδομάδα", bold: true },
      { text: "Feedback τεχνικής εκτέλεσης" },
      { text: "Προσαρμογές προγράμματος" },
    ],
    cta: "ΞΕΚΙΝΑ ΤΟ ADAPTED COACH",
    highlight: true,
  },
  {
    id: "premium",
    name: "Adapted Premium",
    price: PRICE_PLACEHOLDER,
    tagline: "Ό,τι περιλαμβάνει το Adapted Coach, και επιπλέον:",
    features: [
      { text: "Αρχική online αξιολόγηση", bold: true },
      { text: "2 online κλήσεις coaching / εβδομάδα", bold: true },
      { text: "Εξατομικευμένο πλάνο διατροφής" },
      { text: "Πλήρης εβδομαδιαία καθοδήγηση" },
    ],
    cta: "ΞΕΚΙΝΑ ΤΟ ADAPTED PREMIUM",
  },
];

export type EquipmentOption = {
  value: "none" | "bands" | "dumbbells" | "full-home-gym";
  label: string;
  description: string;
};

export const homeEquipmentOptions: EquipmentOption[] = [
  {
    value: "none",
    label: "Κανένας εξοπλισμός",
    description: "Προπονήσου μόνο με το σωματικό σου βάρος.",
  },
  {
    value: "bands",
    label: "Λάστιχα αντίστασης",
    description: "Ελαφρύ και φορητό, ιδανικό για μικρούς χώρους.",
  },
  {
    value: "dumbbells",
    label: "Αλτήρες",
    description: "Ένα ζευγάρι αλτήρων είναι αρκετό για να ξεκινήσεις.",
  },
  {
    value: "full-home-gym",
    label: "Πλήρες home gym",
    description: "Μπάρα, δίσκοι, τροχαλίες και άλλος εξοπλισμός.",
  },
];
