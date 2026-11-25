type CourseText = {
  description: string;
  duration: string;
  subtitles: string;
  account: string;
};

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
  path: {
    title: "Digital Marketing",
    intro:
      "Follow the courses in order, one at a time. Each fact below was checked on the provider's official page on the date shown. Course access and rewards are checked separately.",
    note: "We cannot see your progress on other websites, so you confirm completion yourself.",
    moreComing:
      "More courses are being verified and will be added to this path soon.",
  },
  pathList: {
    loading: "Loading your progress...",
    progress: "Your progress",
    completedOf: (n: number, total: number) => `${n} of ${total} completed`,
    loggedIn: "You are logged in: your progress is saved to your account.",
    browserOnly: "Your progress is saved in this browser only.",
    loginLink: "Log in or create an account",
    loginSuffix: "to keep it on every device.",
    loadError: "Could not load your saved progress. Please reload the page.",
    saveFail: "Could not save. Check your connection and try again.",
    undoFail: "Could not undo. Check your connection and try again.",
    wellDone:
      "Well done! You have completed every course available so far. More courses are being verified and will be added soon.",
    locked: (n: number) => `Locked: complete course ${n} first.`,
    labelAccess: "Course access",
    labelReward: "Reward",
    labelLevel: "Level",
    labelDuration: "Duration",
    labelLanguage: "Language",
    labelSubtitles: "Subtitles",
    labelAccount: "Account needed",
    labelVerified: "Last verified",
    goTo: (provider: string) => `Go to course (opens ${provider})`,
    evidenceLabel: "Certificate or award link (optional)",
    invalidLink:
      "Please paste a full link starting with https:// (or leave the field empty).",
    markCompleted: "Mark as Completed",
    saving: "Saving...",
    openingNote:
      "Opening the course does not count as completion. Come back and confirm once you have really finished it. The link is optional and is not checked by FreeLearn.",
    completedOn: (d: string) => `Completed on ${d}`,
    evidenceNotVerified: "Your evidence link (not verified by FreeLearn):",
    open: "open",
    undo: "Undo",
    access: { free: "Free", "free to audit": "Free to audit", paid: "Paid" } as Record<string, string>,
    reward: (cost: string, type: string) =>
      `${cost === "free" ? "Free" : "Paid"} ${type}`,
    level: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    } as Record<string, string>,
    levelProvider: "stated by provider",
    levelOurs: "our assessment",
    courseText: {} as Record<string, CourseText>,
    languageNames: {} as Record<string, string>,
  },
  account: {
    loading: "Loading...",
    yourAccount: "Your account",
    loggedInAs: "You are logged in as",
    logout: "Log out",
    deleteTitle: "Delete my account",
    deleteText:
      "This permanently deletes your login, your nickname, your completed courses and everything else stored about you. It cannot be undone.",
    deleteLabel: "Type DELETE to confirm",
    deleteWord: "DELETE",
    deleteConfirmMsg: "Type DELETE (in capital letters) to confirm.",
    deleting: "Deleting...",
    deleteFail: "Could not delete the account. Please try again.",
    deleted: "Your account and all its data were deleted.",
    loginTitle: "Log in",
    signupTitle: "Create your account",
    nickname: "Nickname",
    email: "Email",
    password: "Password",
    notice:
      "We store your email, your nickname and your course progress. Your email is never shown to other students. You can delete your account and all your data at any time from this page. For now, a forgotten password cannot be reset, so choose one you will remember and do not reuse a password from another site.",
    agree: "I have read this notice.",
    wait: "Please wait...",
    createAccount: "Create account",
    noAccount: "No account yet? Create one",
    haveAccount: "Already have an account? Log in",
    nicknameRule:
      "Nickname: 3 to 20 characters, using letters, numbers, _ or - only.",
    passwordRule: "Password: at least 8 characters.",
    agreeRule: "Please tick the box to confirm you have read the notice.",
    nicknameTaken:
      "That nickname is probably already taken. Please try another one.",
    alreadyRegistered: "This email already has an account. Try logging in.",
    confirmOn:
      "Account created, but email confirmation is still switched on in Supabase. Tell the site owner.",
    wrongLogin: "Wrong email or password.",
  },
  about: {
    title: "About FreeLearn Tunisia",
    whyTitle: "Why I built it",
    whyText:
      "Good free courses exist, but they are scattered across many websites, and it is hard to know what is really free: the course, the certificate, or both. I am a Tunisian university student, and I built FreeLearn to put checked free courses in one clear path, one course at a time.",
    howTitle: "How courses are chosen",
    howText:
      "A course is added only after it is checked on the provider's official page. Course access and the certificate are checked separately, and each course shows the date it was last verified. FreeLearn does not copy any course content: every course links to its original provider, whose prices and conditions can change.",
    progressTitle: "Your progress",
    progressText:
      "FreeLearn cannot see what you do on other websites, so you confirm completion yourself. An account is optional: without one, your progress stays in your browser.",
    freeTitle: "Free and open",
    freeText:
      "FreeLearn is a free, non-profit project. You can read the code and the course verification notes on",
    github: "GitHub",
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
  path: {
    title: "Marketing digital",
    intro:
      "Suivez les cours dans l'ordre, un à la fois. Chaque information ci-dessous a été vérifiée sur la page officielle du fournisseur à la date indiquée. L'accès au cours et la récompense sont vérifiés séparément.",
    note: "Nous ne pouvons pas voir votre progression sur d'autres sites : c'est donc vous qui confirmez avoir terminé un cours.",
    moreComing:
      "D'autres cours sont en cours de vérification et seront bientôt ajoutés à ce parcours.",
  },
  pathList: {
    loading: "Chargement de votre progression...",
    progress: "Votre progression",
    completedOf: (n: number, total: number) => `${n} sur ${total} terminés`,
    loggedIn:
      "Vous êtes connecté(e) : votre progression est enregistrée dans votre compte.",
    browserOnly:
      "Votre progression est enregistrée dans ce navigateur uniquement.",
    loginLink: "Connectez-vous ou créez un compte",
    loginSuffix: "pour la retrouver sur tous vos appareils.",
    loadError:
      "Impossible de charger votre progression enregistrée. Veuillez recharger la page.",
    saveFail:
      "Enregistrement impossible. Vérifiez votre connexion et réessayez.",
    undoFail: "Annulation impossible. Vérifiez votre connexion et réessayez.",
    wellDone:
      "Bravo ! Vous avez terminé tous les cours disponibles pour le moment. D'autres cours sont en cours de vérification et seront bientôt ajoutés.",
    locked: (n: number) => `Verrouillé : terminez d'abord le cours ${n}.`,
    labelAccess: "Accès au cours",
    labelReward: "Récompense",
    labelLevel: "Niveau",
    labelDuration: "Durée",
    labelLanguage: "Langue",
    labelSubtitles: "Sous-titres",
    labelAccount: "Compte nécessaire",
    labelVerified: "Dernière vérification",
    goTo: (provider: string) => `Aller au cours (ouvre ${provider})`,
    evidenceLabel: "Lien du certificat ou de l'award (facultatif)",
    invalidLink:
      "Veuillez coller un lien complet commençant par https:// (ou laissez le champ vide).",
    markCompleted: "Marquer comme terminé",
    saving: "Enregistrement...",
    openingNote:
      "Ouvrir le cours ne vaut pas validation. Revenez confirmer quand vous l'avez vraiment terminé. Le lien est facultatif et n'est pas vérifié par FreeLearn.",
    completedOn: (d: string) => `Terminé le ${d}`,
    evidenceNotVerified: "Votre lien de preuve (non vérifié par FreeLearn) :",
    open: "ouvrir",
    undo: "Annuler",
    access: {
      free: "Gratuit",
      "free to audit": "Gratuit en auditeur libre",
      paid: "Payant",
    },
    reward: (cost: string, type: string) =>
      `${type === "certificate" ? "Certificat" : "Award"} ${
        cost === "free" ? "gratuit" : "payant"
      }`,
    level: {
      beginner: "Débutant",
      intermediate: "Intermédiaire",
      advanced: "Avancé",
    },
    levelProvider: "indiqué par le fournisseur",
    levelOurs: "notre évaluation",
    courseText: {
      "hubspot-digital-marketing": {
        description:
          "Une introduction générale au marketing digital par HubSpot, fondée sur son approche « inbound ».",
        duration: "3 h 24 min",
        subtitles: "Français",
        account: "Compte HubSpot gratuit",
      },
      "google-fundamentals-digital-marketing": {
        description:
          "La formation de Google sur les sujets actuels du marketing digital, des outils d'IA au marketing vidéo.",
        duration: "Non indiquée par le fournisseur (12 modules)",
        subtitles: "Aucun sous-titre trouvé dans la première vidéo",
        account: "Compte Google",
      },
    },
    languageNames: { English: "Anglais" },
  },
  account: {
    loading: "Chargement...",
    yourAccount: "Votre compte",
    loggedInAs: "Vous êtes connecté(e) en tant que",
    logout: "Se déconnecter",
    deleteTitle: "Supprimer mon compte",
    deleteText:
      "Cela supprime définitivement votre connexion, votre pseudo, vos cours terminés et tout ce qui est enregistré à votre sujet. Cette action est irréversible.",
    deleteLabel: "Tapez SUPPRIMER pour confirmer",
    deleteWord: "SUPPRIMER",
    deleteConfirmMsg: "Tapez SUPPRIMER (en majuscules) pour confirmer.",
    deleting: "Suppression...",
    deleteFail: "Impossible de supprimer le compte. Veuillez réessayer.",
    deleted: "Votre compte et toutes ses données ont été supprimés.",
    loginTitle: "Se connecter",
    signupTitle: "Créer votre compte",
    nickname: "Pseudo",
    email: "E-mail",
    password: "Mot de passe",
    notice:
      "Nous enregistrons votre e-mail, votre pseudo et votre progression. Votre e-mail n'est jamais montré aux autres étudiants. Vous pouvez supprimer votre compte et toutes vos données à tout moment depuis cette page. Pour le moment, un mot de passe oublié ne peut pas être réinitialisé : choisissez-en un dont vous vous souviendrez et n'en réutilisez pas un d'un autre site.",
    agree: "J'ai lu cette information.",
    wait: "Veuillez patienter...",
    createAccount: "Créer le compte",
    noAccount: "Pas encore de compte ? En créer un",
    haveAccount: "Vous avez déjà un compte ? Se connecter",
    nicknameRule:
      "Pseudo : 3 à 20 caractères, avec des lettres, des chiffres, _ ou - uniquement.",
    passwordRule: "Mot de passe : au moins 8 caractères.",
    agreeRule:
      "Veuillez cocher la case pour confirmer que vous avez lu l'information.",
    nicknameTaken:
      "Ce pseudo est probablement déjà pris. Essayez-en un autre.",
    alreadyRegistered:
      "Cet e-mail a déjà un compte. Essayez de vous connecter.",
    confirmOn:
      "Compte créé, mais la confirmation par e-mail est encore activée dans Supabase. Prévenez le propriétaire du site.",
    wrongLogin: "E-mail ou mot de passe incorrect.",
  },
  about: {
    title: "À propos de FreeLearn Tunisia",
    whyTitle: "Pourquoi je l'ai créé",
    whyText:
      "De bons cours gratuits existent, mais ils sont dispersés sur de nombreux sites, et il est difficile de savoir ce qui est vraiment gratuit : le cours, le certificat, ou les deux. Je suis étudiant tunisien et j'ai créé FreeLearn pour réunir des cours gratuits vérifiés dans un parcours clair, un cours à la fois.",
    howTitle: "Comment les cours sont choisis",
    howText:
      "Un cours n'est ajouté qu'après avoir été vérifié sur la page officielle du fournisseur. L'accès au cours et le certificat sont vérifiés séparément, et chaque cours indique la date de sa dernière vérification. FreeLearn ne copie aucun contenu de cours : chaque cours renvoie vers son fournisseur d'origine, dont les prix et les conditions peuvent changer.",
    progressTitle: "Votre progression",
    progressText:
      "FreeLearn ne peut pas voir ce que vous faites sur d'autres sites : c'est donc vous qui confirmez avoir terminé un cours. Un compte est facultatif : sans compte, votre progression reste dans votre navigateur.",
    freeTitle: "Gratuit et ouvert",
    freeText:
      "FreeLearn est un projet gratuit et sans but lucratif. Vous pouvez lire le code et les notes de vérification des cours sur",
    github: "GitHub",
  },
};

export const dict: Record<Lang, Dict> = { en, fr };