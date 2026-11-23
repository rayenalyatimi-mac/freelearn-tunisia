const en = {
  nav: {
    pathFull: "Digital Marketing path",
    pathShort: "Path",
    account: "Account",
    language: "Language",
  },
  footer: {
    line1: "A free, non-profit student project by",
    about: "About",
    line2:
      "Not affiliated with the course providers. Always confirm prices and conditions on the provider's own page.",
  },
  home: {
    eyebrow: "A free project for Tunisian university students",
    title: "Learn one free course at a time, in the right order.",
    subtitle:
      "Every course is checked on its official page, so you know whether the course and the certificate are really free.",
    cta: "Start the Digital Marketing path",
    howLink: "How we check courses",
    check1: "Course and certificate are checked separately",
    check2: "The last-verified date is shown on every course",
    check3: "No account needed to start",
    openNow: "Open now",
    unlocksAfter: (n: number) => `Unlocks after course ${n}`,
    moreComing: "More courses are being verified.",
    how1Title: "Checked on the official page",
    how1Text:
      "Every course shows the date we last verified it, so you know how fresh the information is.",
    how2Title: "Course and certificate, priced separately",
    how2Text:
      "A course can be free while its certificate is not. We say which, using the provider's own word, such as certificate or award.",
    how3Title: "You confirm your own progress",
    how3Text:
      "We cannot see what you do on other websites. When you finish a course, you tell us, and the next one opens.",
  },
};

export type Dict = typeof en;
export type Lang = "en" | "fr";

const fr: Dict = {
  nav: {
    pathFull: "Parcours Marketing digital",
    pathShort: "Parcours",
    account: "Compte",
    language: "Langue",
  },
  footer: {
    line1: "Un projet étudiant gratuit et sans but lucratif, créé par",
    about: "À propos",
    line2:
      "Non affilié aux fournisseurs de cours. Vérifiez toujours les prix et les conditions sur la page officielle du fournisseur.",
  },
  home: {
    eyebrow: "Un projet gratuit pour les étudiants universitaires tunisiens",
    title: "Suivez un cours gratuit à la fois, dans le bon ordre.",
    subtitle:
      "Chaque cours est vérifié sur sa page officielle, pour que vous sachiez si le cours et le certificat sont vraiment gratuits.",
    cta: "Commencer le parcours Marketing digital",
    howLink: "Comment nous vérifions les cours",
    check1: "Le cours et le certificat sont vérifiés séparément",
    check2: "La date de dernière vérification est affichée sur chaque cours",
    check3: "Aucun compte nécessaire pour commencer",
    openNow: "Disponible",
    unlocksAfter: (n: number) => `Se débloque après le cours ${n}`,
    moreComing: "D'autres cours sont en cours de vérification.",
    how1Title: "Vérifié sur la page officielle",
    how1Text:
      "Chaque cours indique la date de sa dernière vérification, pour que vous sachiez à quel point l'information est récente.",
    how2Title: "Cours et certificat, indiqués séparément",
    how2Text:
      "Un cours peut être gratuit alors que son certificat ne l'est pas. Nous l'indiquons, avec le mot employé par le fournisseur : certificat ou award (récompense).",
    how3Title: "Vous confirmez vous-même votre progression",
    how3Text:
      "Nous ne pouvons pas voir ce que vous faites sur d'autres sites. Quand vous terminez un cours, vous nous le dites, et le suivant s'ouvre.",
  },
};

export const dict: Record<Lang, Dict> = { en, fr };