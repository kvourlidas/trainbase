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
  title: "Certified Strength & Conditioning Coach",
  photo: "/placeholders/trainer-photo.svg",
  bio: [
    "Alex has spent over a decade coaching people through structured, sustainable training — from complete beginners taking their first steps into fitness to advanced lifters chasing specific strength goals.",
    "After starting out coaching in commercial gyms, Alex became focused on making high-quality programming accessible outside the gym floor, which is what led to building TrainBase: a way to hand people the same structured programs used with in-person clients, wherever they train.",
    "Alex also has a particular focus on adaptive fitness, working with clients managing injuries, chronic conditions, and mobility limitations to make sure a lack of a 'standard' program is never a barrier to training consistently.",
  ],
  certifications: [
    { title: "Certified Strength and Conditioning Specialist (CSCS)", issuer: "NSCA", year: 2015 },
    { title: "Certified Personal Trainer (CPT)", issuer: "NASM", year: 2013 },
    { title: "Adaptive & Inclusive Fitness Specialist", issuer: "ACE", year: 2019 },
  ],
  experience: [
    {
      role: "Head Trainer",
      organization: "TrainBase",
      period: "2022 — Present",
      description:
        "Designs and maintains all TrainBase programs across home workouts, gym programming, calisthenics, and adaptive fitness.",
    },
    {
      role: "Personal Trainer",
      organization: "Ironclad Athletics",
      period: "2016 — 2022",
      description:
        "Coached over 200 one-on-one clients through strength, conditioning, and rehab-adjacent programming.",
    },
    {
      role: "Assistant Coach",
      organization: "City Fitness Club",
      period: "2013 — 2016",
      description: "Led group strength classes and built entry-level programming for new gym members.",
    },
  ],
  specialties: [
    "Beginner strength training",
    "Barbell programming",
    "Calisthenics progressions",
    "Adaptive & inclusive fitness",
  ],
};
