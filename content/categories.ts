export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: "home" | "dumbbell" | "bodyweight" | "adaptive";
  image: string;
};

export const categories: Category[] = [
  {
    slug: "home-workouts",
    name: "Προπονήσεις στο Σπίτι",
    description:
      "Χωρίς γυμναστήριο, κανένα πρόβλημα. Δομημένες συνεδρίες δύναμης και φυσικής κατάστασης με ελάχιστο εξοπλισμό, ώστε να προπονείσαι στο σαλόνι σου.",
    icon: "home",
    image: "/images/categories/home-workouts.png",
  },
  {
    slug: "gym-programs",
    name: "Προγράμματα Γυμναστηρίου",
    description:
      "Προοδευτικά προγράμματα δύναμης με μπάρες, αλτήρες και μηχανήματα, για όσους θέλουν δομημένο πλάνο μέσα στο γυμναστήριο.",
    icon: "dumbbell",
    image: "/images/categories/gym-programs.jpg",
  },
  {
    slug: "calisthenics",
    name: "Καλισθενικά",
    description:
      "Προόδοι δεξιοτήτων και δύναμης με το σωματικό βάρος, από την πρώτη σου κάμψη μέχρι έλξεις, βυθίσεις και πέρα.",
    icon: "bodyweight",
    image: "/images/categories/calisthenics.jpg",
  },
  {
    slug: "adaptive-fitness",
    name: "Προσαρμοσμένο Fitness",
    description:
      "Προγράμματα σχεδιασμένα να προσαρμόζονται σε τραυματισμούς, περιορισμούς κινητικότητας και ατομικές ανάγκες, ώστε η προπόνηση να παραμένει σταθερή και ασφαλής.",
    icon: "adaptive",
    image: "/images/categories/adaptive-fitness.jpg",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
