export type Stage = 'ttc' | 'pregnancy' | 'postpartum';

export type FunnelStep = 
  | 'splash'
  | 'stage-selection'
  | 'ttc-congratulations'
  | 'ttc-claim-offer'
  | 'ttc-choose-plan'
  | 'ttc-confirmation'
  | 'ttc-app-download'
  | 'know-program'
  | 'program-knowledge'
  | 'program-selection'
  | 'quiz-landing'
  | 'quiz-flow'
  | 'quiz-results'
  | 'pregnancy-quiz'
  | 'postpartum-quiz'
  | 'paywall'
  | 'success';

export type Program = {
  id: string;
  name: string;
  code: string;
  stage: 'pregnancy' | 'postpartum';
};

export type UserData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  stage?: Stage;
  dueDate?: string;
  hadCSection?: boolean;
  selectedPrograms: string[];
  quizAnswers: Record<string, any>;
  quizCompleted: boolean;
};

export type FunnelState = {
  currentStep: FunnelStep;
  userData: UserData;
  knowsProgram?: boolean;
  showProgressIndicator: boolean;
  showBreadcrumbs: boolean;
};

export type FunnelAction = 
  | { type: 'SET_STEP'; step: FunnelStep }
  | { type: 'UPDATE_USER_DATA'; data: Partial<UserData> }
  | { type: 'SET_KNOWS_PROGRAM'; knows: boolean }
  | { type: 'TOGGLE_PROGRESS_INDICATOR' }
  | { type: 'TOGGLE_BREADCRUMBS' }
  | { type: 'RESET_FUNNEL' };

export const PREGNANCY_PROGRAMS: Program[] = [
  {
    id: 'ea-1t',
    name: 'Expecting Athletes First Trimester',
    code: 'EA-1T',
    stage: 'pregnancy'
  },
  {
    id: 'ea-2t',
    name: 'Expecting Athletes Second Trimester',
    code: 'EA-2T',
    stage: 'pregnancy'
  },
  {
    id: 'ea-3t',
    name: 'Expecting Athletes Third Trimester',
    code: 'EA-3T',
    stage: 'pregnancy'
  },
  {
    id: 'beginner-bump',
    name: 'Beginner Bump',
    code: 'BB',
    stage: 'pregnancy'
  },
  {
    id: 'ab-prehab',
    name: 'Ab Prehab',
    code: 'AP',
    stage: 'pregnancy'
  },
  {
    id: 'labor-prep',
    name: 'Labor Prep',
    code: 'LP',
    stage: 'pregnancy'
  }
];

export const POSTPARTUM_PROGRAMS: Program[] = [
  {
    id: 'ab-rehab',
    name: 'Ab Rehab',
    code: 'AR',
    stage: 'postpartum'
  },
  {
    id: 'bod-squad',
    name: 'Bod Squad',
    code: 'BS',
    stage: 'postpartum'
  },
  {
    id: 'ab-rehab-plus',
    name: 'Ab Rehab PLUS',
    code: 'AR+',
    stage: 'postpartum'
  },
  {
    id: 'c-section-recovery',
    name: 'C-Section Recovery',
    code: 'CS',
    stage: 'postpartum'
  },
  {
    id: 'prolapse',
    name: 'Prolapse',
    code: 'PRO',
    stage: 'postpartum'
  },
  {
    id: 'early-postpartum',
    name: 'Early Postpartum',
    code: 'EPP',
    stage: 'postpartum'
  },
  {
    id: '30-day-slim-down',
    name: '30 Day Slim Down',
    code: '30D',
    stage: 'postpartum'
  },
  {
    id: 'easy-eats',
    name: 'Easy Eats',
    code: 'EE',
    stage: 'postpartum'
  }
];
