export type Level = "beginner" | "intermediate" | "advanced";

export type Exercise = {
  name: string;
  sets: number;
  reps: string;
  demoVideo?: string;
  demoImage: string;
  notes?: string;
};

export type Workout = {
  title: string;
  exercises: Exercise[];
};

export type Program = {
  slug: string;
  title: string;
  categorySlug: string;
  level: Level;
  summary: string;
  description: string;
  durationWeeks: number;
  sessionsPerWeek: number;
  equipment: string[];
  coverImage: string;
  workouts: Workout[];
  // Only set for categories that offer both an equipment-free and an
  // equipment-based track (currently home-workouts); used to split the
  // category page into two sections.
  requiresEquipment?: boolean;
};

const placeholderExerciseImage = "/placeholders/exercise-demo.svg";

export const programs: Program[] = [
  {
    slug: "beginner-home-strength",
    title: "Δύναμη στο Σπίτι για Αρχάριους",
    categorySlug: "home-workouts",
    level: "beginner",
    summary:
      "Μια τετράβδομη εισαγωγή στην προπόνηση δύναμης όλου του σώματος, χρησιμοποιώντας μόνο το σωματικό σου βάρος και ένα σετ λάστιχων αντίστασης.",
    description:
      "Το πρόγραμμα «Δύναμη στο Σπίτι για Αρχάριους» είναι φτιαγμένο για όποιον ξεκινάει από το μηδέν. Κάθε εβδομάδα προσθέτει σταδιακά όγκο και νέα πρότυπα κίνησης, ώστε το σώμα σου να προσαρμόζεται χωρίς εξάντληση. Δεν απαιτείται εξοπλισμός πέρα από ένα προαιρετικό λάστιχο αντίστασης, οπότε μπορείς να το ακολουθήσεις οπουδήποτε έχεις λίγα τετραγωνικά μέτρα ελεύθερου χώρου.",
    durationWeeks: 4,
    sessionsPerWeek: 3,
    equipment: ["Λάστιχο αντίστασης (προαιρετικό)", "Στρώμα γυμναστικής"],
    coverImage: "/placeholders/program-cover.svg",
    requiresEquipment: false,
    workouts: [
      {
        title: "Εβδομάδα 1 — Όλο το Σώμα",
        exercises: [
          { name: "Καθίσματα με Σωματικό Βάρος", sets: 3, reps: "12-15", demoImage: placeholderExerciseImage },
          { name: "Κάμψεις με Κλίση", sets: 3, reps: "8-12", demoImage: placeholderExerciseImage },
          { name: "Γέφυρα Γλουτών", sets: 3, reps: "15", demoImage: placeholderExerciseImage },
          { name: "Κωπηλατική με Λάστιχο", sets: 3, reps: "12-15", demoImage: placeholderExerciseImage },
          { name: "Πλάγκ", sets: 3, reps: "20-30 δευτ.", demoImage: placeholderExerciseImage },
        ],
      },
      {
        title: "Εβδομάδα 2 — Όλο το Σώμα",
        exercises: [
          { name: "Καθίσματα με Σωματικό Βάρος", sets: 3, reps: "15-18", demoImage: placeholderExerciseImage },
          { name: "Κάμψεις", sets: 3, reps: "8-10", demoImage: placeholderExerciseImage },
          { name: "Γέφυρα Γλουτών με Ένα Πόδι", sets: 3, reps: "10 ανά πλευρά", demoImage: placeholderExerciseImage },
          { name: "Κωπηλατική με Λάστιχο", sets: 3, reps: "15", demoImage: placeholderExerciseImage },
          { name: "Πλάγιο Πλάγκ", sets: 3, reps: "15-20 δευτ. ανά πλευρά", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "home-hiit-conditioning",
    title: "HIIT Φυσική Κατάσταση στο Σπίτι",
    categorySlug: "home-workouts",
    level: "intermediate",
    summary:
      "Σύντομες, έντονες διαλειμματικές συνεδρίες που χτίζουν φυσική κατάσταση σε 25 λεπτά ή λιγότερο, χωρίς εξοπλισμό.",
    description:
      "Το «HIIT Φυσική Κατάσταση στο Σπίτι» συμπυκνώνει πλήρες καρδιαγγειακό και μυϊκό ερέθισμα αντοχής σε σύντομες συνεδρίες. Είναι φτιαγμένο για ανθρώπους με περιορισμένο χρόνο που θέλουν παρόλα αυτά μια δύσκολη, αποτελεσματική προπόνηση. Κάθε συνεδρία εναλλάσσει διαστήματα δουλειάς και ξεκούρασης που κλιμακώνονται ανάλογα με το επίπεδό σου.",
    durationWeeks: 6,
    sessionsPerWeek: 4,
    equipment: ["Στρώμα γυμναστικής", "Χρονόμετρο / εφαρμογή διαλειμμάτων"],
    coverImage: "/placeholders/program-cover.svg",
    requiresEquipment: false,
    workouts: [
      {
        title: "Εβδομάδα 1 — Διαλειμματικά Κάτω Σώματος",
        exercises: [
          { name: "Άλμα με Κάθισμα", sets: 4, reps: "30 δευτ. δουλειά / 30 δευτ. ξεκούραση", demoImage: placeholderExerciseImage },
          { name: "Ορειβάτης", sets: 4, reps: "30 δευτ. δουλειά / 30 δευτ. ξεκούραση", demoImage: placeholderExerciseImage },
          { name: "Αντίστροφη Πρόβασμα", sets: 4, reps: "30 δευτ. δουλειά / 30 δευτ. ξεκούραση", demoImage: placeholderExerciseImage },
          { name: "Ψηλά Γόνατα", sets: 4, reps: "30 δευτ. δουλειά / 30 δευτ. ξεκούραση", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "home-bodyweight-total-body",
    title: "Πλήρες Σώμα Χωρίς Εξοπλισμό",
    categorySlug: "home-workouts",
    level: "intermediate",
    summary:
      "Ένα έντονο πρόγραμμα πλήρους σώματος που στηρίζεται αποκλειστικά στο σωματικό σου βάρος — τίποτα άλλο δεν χρειάζεται.",
    description:
      "Το «Πλήρες Σώμα Χωρίς Εξοπλισμό» χτίζει δύναμη, εκρηκτικότητα και αντοχή χρησιμοποιώντας μόνο το βάρος του σώματός σου. Ιδανικό για ταξίδια, μικρούς χώρους ή όποτε δεν έχεις καθόλου εξοπλισμό διαθέσιμο, αλλά δεν θέλεις να κάνεις καμία έκπτωση στην ένταση της προπόνησης.",
    durationWeeks: 5,
    sessionsPerWeek: 3,
    equipment: ["Δεν απαιτείται εξοπλισμός"],
    coverImage: "/placeholders/program-cover.svg",
    requiresEquipment: false,
    workouts: [
      {
        title: "Εβδομάδα 1 — Έντονο Πλήρες Σώμα",
        exercises: [
          { name: "Burpee", sets: 4, reps: "8-10", demoImage: placeholderExerciseImage },
          { name: "Άλμα με Κάθισμα", sets: 4, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Κάμψεις", sets: 4, reps: "10-15", demoImage: placeholderExerciseImage },
          { name: "Αντίστροφη Πρόβασμα", sets: 3, reps: "12 ανά πόδι", demoImage: placeholderExerciseImage },
          { name: "Πλάγκ με Άγγιγμα Ώμου", sets: 3, reps: "16 ανά πλευρά", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "home-dumbbell-strength",
    title: "Δύναμη στο Σπίτι με Αλτήρες",
    categorySlug: "home-workouts",
    level: "beginner",
    summary:
      "Ένα πρόγραμμα δύναμης όλου του σώματος για το σπίτι, βασισμένο σε ένα απλό ζευγάρι αλτήρων.",
    description:
      "Το «Δύναμη στο Σπίτι με Αλτήρες» φέρνει τα βασικά της προπόνησης με βάρη στο σαλόνι σου. Με ένα μόνο ζευγάρι αλτήρων, χτίζεις δύναμη σε όλο το σώμα ακολουθώντας κινήσεις που κλιμακώνονται εύκολα καθώς δυναμώνεις, αυξάνοντας απλά το βάρος.",
    durationWeeks: 6,
    sessionsPerWeek: 3,
    equipment: ["Ζευγάρι αλτήρων", "Στρώμα γυμναστικής"],
    coverImage: "/placeholders/program-cover.svg",
    requiresEquipment: true,
    workouts: [
      {
        title: "Εβδομάδα 1 — Όλο το Σώμα με Αλτήρες",
        exercises: [
          { name: "Κάθισμα με Αλτήρες", sets: 4, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Πίεση Πάγκου στο Πάτωμα", sets: 3, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Κωπηλατική με Αλτήρα", sets: 3, reps: "12 ανά πλευρά", demoImage: placeholderExerciseImage },
          { name: "Πίεση Ώμων με Αλτήρες", sets: 3, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Ρουμανική Άρση Θανάτου με Αλτήρες", sets: 3, reps: "12", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "home-resistance-band-circuit",
    title: "Κύκλωμα στο Σπίτι με Λάστιχα Αντίστασης",
    categorySlug: "home-workouts",
    level: "beginner",
    summary:
      "Ένα πλήρες κύκλωμα δύναμης που χρησιμοποιεί μόνο λάστιχα αντίστασης — φθηνά, φορητά και φιλικά προς τις αρθρώσεις.",
    description:
      "Το «Κύκλωμα στο Σπίτι με Λάστιχα Αντίστασης» χτίζει δύναμη και μυϊκή αντοχή με σταθερή ένταση σε όλο το εύρος κίνησης. Τα λάστιχα είναι φορητά και φθηνά, οπότε αυτό το πρόγραμμα ταιριάζει εξίσου καλά σε σπίτι, ξενοδοχείο ή πάρκο.",
    durationWeeks: 4,
    sessionsPerWeek: 3,
    equipment: ["Σετ λάστιχων αντίστασης", "Άγκιστρο πόρτας (προαιρετικό)"],
    coverImage: "/placeholders/program-cover.svg",
    requiresEquipment: true,
    workouts: [
      {
        title: "Εβδομάδα 1 — Κύκλωμα Λάστιχων",
        exercises: [
          { name: "Κάθισμα με Λάστιχο", sets: 3, reps: "15", demoImage: placeholderExerciseImage },
          { name: "Πίεση Στήθους με Λάστιχο", sets: 3, reps: "12-15", demoImage: placeholderExerciseImage },
          { name: "Κωπηλατική με Λάστιχο", sets: 3, reps: "15", demoImage: placeholderExerciseImage },
          { name: "Πλάγιο Βήμα με Λάστιχο", sets: 3, reps: "12 ανά πλευρά", demoImage: placeholderExerciseImage },
          { name: "Πίεση Ώμων με Λάστιχο", sets: 3, reps: "12-15", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "home-kettlebell-conditioning",
    title: "Φυσική Κατάσταση στο Σπίτι με Kettlebell",
    categorySlug: "home-workouts",
    level: "advanced",
    summary:
      "Απαιτητικές συνεδρίες φυσικής κατάστασης και δύναμης με ένα μόνο kettlebell.",
    description:
      "Το «Φυσική Κατάσταση στο Σπίτι με Kettlebell» συνδυάζει δύναμη, καρδιαγγειακή αντοχή και σταθερότητα κορμού μέσα από κλασικές κινήσεις kettlebell. Απαιτεί ήδη κάποια εξοικείωση με βασικές κινήσεις δύναμης, καθώς η τεχνική είναι κρίσιμη σε κινήσεις όπως το swing.",
    durationWeeks: 6,
    sessionsPerWeek: 3,
    equipment: ["Kettlebell", "Στρώμα γυμναστικής"],
    coverImage: "/placeholders/program-cover.svg",
    requiresEquipment: true,
    workouts: [
      {
        title: "Εβδομάδα 1 — Δύναμη & Φυσική Κατάσταση",
        exercises: [
          { name: "Kettlebell Swing", sets: 5, reps: "15", demoImage: placeholderExerciseImage },
          { name: "Goblet Squat", sets: 4, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Clean & Press", sets: 4, reps: "6 ανά πλευρά", demoImage: placeholderExerciseImage },
          { name: "Κωπηλατική με Kettlebell", sets: 3, reps: "10 ανά πλευρά", demoImage: placeholderExerciseImage },
          { name: "Turkish Get-Up", sets: 3, reps: "3 ανά πλευρά", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "five-by-five-strength",
    title: "5x5 Δύναμη Γυμναστηρίου",
    categorySlug: "gym-programs",
    level: "intermediate",
    summary:
      "Ένα κλασικό γραμμικό πρόγραμμα προόδου βασισμένο σε καθίσματα με μπάρα, πιέσεις πάγκου και άρσεις θανάτου.",
    description:
      "Το «5x5 Δύναμη Γυμναστηρίου» είναι μια απλή, δοκιμασμένη προσέγγιση για την οικοδόμηση ωμής δύναμης. Τρεις συνεδρίες την εβδομάδα εναλλάσσονται μεταξύ δύο προπονήσεων όλου του σώματος, προσθέτοντας βάρος στη μπάρα όσο συνεχίζεις να πετυχαίνεις τις επαναλήψεις σου. Ιδανικό για όσους θέλουν ένα απλό πλάνο και μια μπάρα.",
    durationWeeks: 12,
    sessionsPerWeek: 3,
    equipment: ["Μπάρα", "Σταντ καθισμάτων", "Πάγκος"],
    coverImage: "/placeholders/program-cover.svg",
    workouts: [
      {
        title: "Προπόνηση Α",
        exercises: [
          { name: "Κάθισμα με Μπάρα", sets: 5, reps: "5", demoImage: placeholderExerciseImage },
          { name: "Πίεση Πάγκου", sets: 5, reps: "5", demoImage: placeholderExerciseImage },
          { name: "Κωπηλατική με Μπάρα", sets: 5, reps: "5", demoImage: placeholderExerciseImage },
        ],
      },
      {
        title: "Προπόνηση Β",
        exercises: [
          { name: "Κάθισμα με Μπάρα", sets: 5, reps: "5", demoImage: placeholderExerciseImage },
          { name: "Πίεση Ώμων", sets: 5, reps: "5", demoImage: placeholderExerciseImage },
          { name: "Άρση Θανάτου", sets: 1, reps: "5", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "hypertrophy-upper-lower",
    title: "Υπερτροφία: Split Άνω/Κάτω Σώματος",
    categorySlug: "gym-programs",
    level: "advanced",
    summary:
      "Ένα τετραήμερο split άνω/κάτω σώματος με στόχο τη μυϊκή ανάπτυξη μέσω προοδευτικής υπερφόρτωσης και μεγαλύτερου όγκου προπόνησης.",
    description:
      "Αυτό το πρόγραμμα χωρίζει την προπόνηση σε ημέρες άνω και κάτω σώματος, δύο φορές την εβδομάδα η καθεμία, δίνοντας σε κάθε μυϊκή ομάδα αρκετό όγκο και συχνότητα για να αναπτυχθεί, επιτρέποντας παράλληλα επαρκή αποκατάσταση. Κατάλληλο για όσους έχουν ήδη μια βάση εμπειρίας στην προπόνηση δύναμης.",
    durationWeeks: 8,
    sessionsPerWeek: 4,
    equipment: ["Πλήρης πρόσβαση σε γυμναστήριο", "Μπάρα", "Αλτήρες", "Τροχαλίες"],
    coverImage: "/placeholders/program-cover.svg",
    workouts: [
      {
        title: "Άνω Σώμα Α",
        exercises: [
          { name: "Πίεση Πάγκου", sets: 4, reps: "8-10", demoImage: placeholderExerciseImage },
          { name: "Έλξεις στην Τροχαλία", sets: 4, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Καθιστή Πίεση με Αλτήρες", sets: 3, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Κωπηλατική στην Τροχαλία", sets: 3, reps: "10-12", demoImage: placeholderExerciseImage },
        ],
      },
      {
        title: "Κάτω Σώμα Α",
        exercises: [
          { name: "Κάθισμα με Μπάρα", sets: 4, reps: "8-10", demoImage: placeholderExerciseImage },
          { name: "Ρουμανική Άρση Θανάτου", sets: 3, reps: "10", demoImage: placeholderExerciseImage },
          { name: "Προβολή Βάδισης", sets: 3, reps: "12 ανά πόδι", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "calisthenics-foundations",
    title: "Θεμέλια Καλισθενικών",
    categorySlug: "calisthenics",
    level: "beginner",
    summary:
      "Χτίσε τη βασική δύναμη που χρειάζεσαι για κάμψεις, έλξεις και βυθίσεις, με κλιμακούμενες προόδους σωματικού βάρους.",
    description:
      "Τα «Θεμέλια Καλισθενικών» αναλύουν τις βασικές κινήσεις σωματικού βάρους σε προόδους, ώστε να χτίσεις πραγματική δύναμη ακόμα κι αν δεν μπορείς ακόμα να κάνεις ούτε μία έλξη ή βύθιση. Κάθε εβδομάδα δοκιμάζεσαι και προχωράς στην επόμενη παραλλαγή καθώς δυναμώνεις.",
    durationWeeks: 6,
    sessionsPerWeek: 3,
    equipment: ["Μπάρα έλξεων", "Παράλληλες μπάρες ή σταθερές καρέκλες"],
    coverImage: "/placeholders/program-cover.svg",
    workouts: [
      {
        title: "Εβδομάδα 1 — Θεμέλια Ώθησης & Έλξης",
        exercises: [
          { name: "Κάμψεις με Κλίση", sets: 3, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Αρνητική Έλξη", sets: 4, reps: "3-5", demoImage: placeholderExerciseImage },
          { name: "Βύθιση σε Πάγκο", sets: 3, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Έλξη Ωμοπλάτης", sets: 3, reps: "10", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "calisthenics-skills",
    title: "Δεξιότητες Καλισθενικών: Προετοιμασία για Muscle-Up",
    categorySlug: "calisthenics",
    level: "advanced",
    summary:
      "Ένα εστιασμένο πρόγραμμα ανάπτυξης δεξιοτήτων για όσους κυνηγούν το πρώτο τους strict muscle-up.",
    description:
      "Η «Προετοιμασία για Muscle-Up» στοχεύει τα συγκεκριμένα κενά δύναμης και τεχνικής που εμποδίζουν τους περισσότερους από το να κάνουν το πρώτο τους muscle-up: δύναμη έλξης, δύναμη μετάβασης και κλείδωμα βύθισης. Απαιτεί υπάρχουσα βάση αρκετών strict έλξεων και βυθίσεων.",
    durationWeeks: 8,
    sessionsPerWeek: 3,
    equipment: ["Μπάρα έλξεων", "Κρίκοι (προτείνεται)"],
    coverImage: "/placeholders/program-cover.svg",
    workouts: [
      {
        title: "Εβδομάδα 1 — Δύναμη Έλξης",
        exercises: [
          { name: "Έλξη με Επιβάρυνση", sets: 4, reps: "5", demoImage: placeholderExerciseImage },
          { name: "Ψηλή Έλξη", sets: 4, reps: "3-5", demoImage: placeholderExerciseImage },
          { name: "Στήριξη σε Κρίκους", sets: 3, reps: "20-30 δευτ.", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "adaptive-seated-strength",
    title: "Καθιστή Δύναμη & Κινητικότητα",
    categorySlug: "adaptive-fitness",
    level: "beginner",
    summary:
      "Ένα πλήρες πρόγραμμα καθιστής δύναμης και κινητικότητας για χρήστες αναπηρικού αμαξιδίου και όποιον προπονείται από καθιστή θέση.",
    description:
      "Η «Καθιστή Δύναμη & Κινητικότητα» χτίζει λειτουργική δύναμη άνω σώματος, έλεγχο κορμού και κινητικότητα αρθρώσεων εξ ολοκλήρου από καθιστή θέση. Οι κινήσεις επιλέγονται για την προσαρμοστικότητά τους, με σημειώσεις τροποποίησης παντού, ώστε το πλάνο να μπορεί να προσαρμοστεί στις δικές σου ανάγκες και τον εξοπλισμό σου.",
    durationWeeks: 6,
    sessionsPerWeek: 3,
    equipment: ["Αλτήρες ή λάστιχα αντίστασης", "Σταθερή καρέκλα ή αναπηρικό αμαξίδιο"],
    coverImage: "/placeholders/program-cover.svg",
    workouts: [
      {
        title: "Εβδομάδα 1 — Άνω Σώμα & Κορμός",
        exercises: [
          { name: "Καθιστή Πίεση με Αλτήρες", sets: 3, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Καθιστή Κωπηλατική", sets: 3, reps: "12-15", demoImage: placeholderExerciseImage },
          { name: "Καθιστή Στροφή Κορμού", sets: 3, reps: "12 ανά πλευρά", demoImage: placeholderExerciseImage },
          { name: "Εξωτερική Στροφή Ώμου", sets: 3, reps: "12-15", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
  {
    slug: "adaptive-low-impact-conditioning",
    title: "Χαμηλής Έντασης Προσαρμοσμένη Φυσική Κατάσταση",
    categorySlug: "adaptive-fitness",
    level: "intermediate",
    summary:
      "Φιλική προς τις αρθρώσεις προπόνηση φυσικής κατάστασης που χτίζει καρδιαγγειακή αντοχή χωρίς κινήσεις υψηλής κρούσης.",
    description:
      "Σχεδιασμένο για όποιον διαχειρίζεται πόνο στις αρθρώσεις, παλιούς τραυματισμούς ή περιορισμούς κινητικότητας, αυτό το πρόγραμμα χτίζει καρδιαγγειακή φυσική κατάσταση μέσα από διαλείμματα χαμηλής κρούσης και ελεγχόμενο ρυθμό. Κάθε άσκηση περιλαμβάνει σημείωση τροποποίησης, ώστε η ένταση να μπορεί να προσαρμοστεί στο τρέχον επίπεδό σου.",
    durationWeeks: 6,
    sessionsPerWeek: 3,
    equipment: ["Στρώμα γυμναστικής", "Καρέκλα (για στήριξη, προαιρετικό)"],
    coverImage: "/placeholders/program-cover.svg",
    workouts: [
      {
        title: "Εβδομάδα 1 — Κύκλωμα Χαμηλής Κρούσης",
        exercises: [
          { name: "Όρθιο Βάδισμα", sets: 3, reps: "45 δευτ.", demoImage: placeholderExerciseImage },
          { name: "Κάμψη στον Τοίχο", sets: 3, reps: "10-12", demoImage: placeholderExerciseImage },
          { name: "Καθιστή Έκταση Ποδιού", sets: 3, reps: "12-15", demoImage: placeholderExerciseImage },
          { name: "Όρθιο Πλάγιο Βήμα", sets: 3, reps: "45 δευτ.", demoImage: placeholderExerciseImage },
        ],
      },
    ],
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}

export function getProgramsByCategory(categorySlug: string): Program[] {
  return programs.filter((program) => program.categorySlug === categorySlug);
}
