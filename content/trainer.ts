export type Certification = {
  title: string;
  issuer: string;
  year: number;
};

export type Trainer = {
  name: string;
  title: string;
  photo: string;
  bio: string[];
  certifications: Certification[];
  experience: {
    role: string;
    organization: string;
    period: string;
    description: string;
  }[];
  specialties: string[];
};

export const trainer: Trainer = {
  name: "Alex Rivera",
  title: "Πιστοποιημένος Προπονητής Δύναμης & Φυσικής Κατάστασης",
  photo: "/placeholders/trainer-photo.svg",
  bio: [
    "Ο Alex έχει περάσει πάνω από μια δεκαετία καθοδηγώντας ανθρώπους μέσα από δομημένη, βιώσιμη προπόνηση — από απόλυτους αρχάριους που κάνουν τα πρώτα τους βήματα στο fitness, μέχρι προχωρημένους αθλητές που κυνηγούν συγκεκριμένους στόχους δύναμης.",
    "Αφού ξεκίνησε προπονώντας σε εμπορικά γυμναστήρια, ο Alex επικεντρώθηκε στο να κάνει τον υψηλής ποιότητας σχεδιασμό προπόνησης προσβάσιμο και εκτός γυμναστηρίου, κάτι που τον οδήγησε στη δημιουργία του TrainBase: έναν τρόπο να δίνει στον κόσμο τα ίδια δομημένα προγράμματα που χρησιμοποιεί με πελάτες δια ζώσης, όπου κι αν προπονούνται.",
    "Ο Alex δίνει επίσης ιδιαίτερη έμφαση στο προσαρμοσμένο fitness, συνεργαζόμενος με πελάτες που διαχειρίζονται τραυματισμούς, χρόνιες παθήσεις και περιορισμούς κινητικότητας, ώστε η έλλειψη ενός «τυπικού» προγράμματος να μην αποτελεί ποτέ εμπόδιο στη συνεπή προπόνηση.",
  ],
  certifications: [
    { title: "Certified Strength and Conditioning Specialist (CSCS)", issuer: "NSCA", year: 2015 },
    { title: "Certified Personal Trainer (CPT)", issuer: "NASM", year: 2013 },
    { title: "Adaptive & Inclusive Fitness Specialist", issuer: "ACE", year: 2019 },
  ],
  experience: [
    {
      role: "Επικεφαλής Προπονητής",
      organization: "TrainBase",
      period: "2022 — Σήμερα",
      description:
        "Σχεδιάζει και συντηρεί όλα τα προγράμματα του TrainBase, από προπονήσεις στο σπίτι μέχρι προγράμματα γυμναστηρίου, καλισθενικά και προσαρμοσμένο fitness.",
    },
    {
      role: "Προσωπικός Προπονητής",
      organization: "Ironclad Athletics",
      period: "2016 — 2022",
      description:
        "Καθοδήγησε πάνω από 200 πελάτες σε ατομική βάση μέσα από προγράμματα δύναμης, φυσικής κατάστασης και υποστηρικτικά αποκατάστασης.",
    },
    {
      role: "Βοηθός Προπονητή",
      organization: "City Fitness Club",
      period: "2013 — 2016",
      description: "Καθοδήγησε ομαδικά μαθήματα δύναμης και δημιούργησε εισαγωγικά προγράμματα για νέα μέλη του γυμναστηρίου.",
    },
  ],
  specialties: [
    "Προπόνηση δύναμης για αρχάριους",
    "Σχεδιασμός προπόνησης με μπάρα",
    "Προόδοι καλισθενικών",
    "Προσαρμοσμένο & συμπεριληπτικό fitness",
  ],
};
