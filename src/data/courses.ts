// All course facts come from docs/course-verification.md.
// Rule: change a fact here ONLY after re-checking the provider's official page,
// and update lastVerified at the same time.

export type Course = {
  id: string;
  order: number; // position in the learning path (1 = first)
  title: string;
  provider: string;
  url: string;
  description: string;
  language: string;
  subtitles: string;
  level: "beginner" | "intermediate" | "advanced";
  levelSource: "provider" | "our assessment"; // who decided the level
  duration: string;
  accountRequired: string;
  courseAccess: "free" | "free to audit" | "paid";
  rewardType: "certificate" | "award";
  rewardCost: "free" | "paid";
  lastVerified: string; // format: YYYY-MM-DD
};

export const courses: Course[] = [
  {
    id: "hubspot-digital-marketing",
    order: 1,
    title: "Digital Marketing Certification Course",
    provider: "HubSpot Academy",
    url: "https://academy.hubspot.com/courses/digital-marketing",
    description:
      "A broad introduction to digital marketing from HubSpot, built around its inbound approach.",
    language: "English",
    subtitles: "French",
    level: "beginner",
    levelSource: "our assessment",
    duration: "3 hours 24 minutes",
    accountRequired: "Free HubSpot account",
    courseAccess: "free",
    rewardType: "certificate",
    rewardCost: "free",
    lastVerified: "2026-11-21",
  },
  {
    id: "google-fundamentals-digital-marketing",
    order: 2,
    title: "Fundamentals of Digital Marketing",
    provider: "Google Skillshop",
    url: "https://skillshop.exceedlms.com/student/collection/1384851",
    description:
      "Google's training on current digital marketing topics, from AI tools to video marketing.",
    language: "English",
    subtitles: "No captions found in first video",
    level: "intermediate",
    levelSource: "provider",
    duration: "Not stated by provider (12 modules)",
    accountRequired: "Google account",
    courseAccess: "free",
    rewardType: "award",
    rewardCost: "free",
    lastVerified: "2026-11-21",
  },
];