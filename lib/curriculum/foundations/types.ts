export type FoundationsSubjectId = "maths" | "physics" | "chemistry" | "biology";

export interface FoundationsSubjectMeta {
  id: FoundationsSubjectId;
  label: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  /** Groups physics/chemistry/biology under one "Science" card on the Foundations home view. Maths has none. */
  group?: "science";
}

export interface FoundationsChapterMeta {
  id: string;
  subjectId: FoundationsSubjectId;
  title: string;
  order: number;
}

export interface FoundationsTopicMeta {
  id: string;
  chapterId: string;
  subjectId: FoundationsSubjectId;
  title: string;
  order: number;
}

export interface StarterQuestion {
  prompt: string;
  options: { label: string; correct: boolean; feedback: string }[];
}

export interface HookSegment {
  prompt: string;
  /** Present for science (predict-observe-explain); a maths hook may just be a teaser statement with no options. */
  options?: string[];
  /** Orbit's line after the hook is answered — never resolves the curiosity gap. */
  note: string;
}

export interface DiagramSpec {
  description: string;
  caption?: string;
}

export interface WorkedExampleStep {
  label: "Fully worked" | "One step blank" | "Two steps blank" | "Bare question";
  problem: string;
  steps: string[];
  /** Indices into `steps` that are blank for the student to fill in, empty for the fully-worked and bare stages. */
  blankIndices: number[];
  answer?: string;
}

export interface TeachSegment {
  body: string;
  diagram?: DiagramSpec;
  /** Faded worked example sequence — maths topics use this instead of (or alongside) a diagram. */
  worked?: WorkedExampleStep[];
}

export interface PracticeQuestion {
  q: string;
  options: string[];
  correct: number;
  /** Per-option response text. The correct-option entry is plain confirmation; wrong-option entries name the specific misconception. */
  feedback: string[];
}

export interface TeachBackSegment {
  prompt: string;
  checkFor: string[];
}

export interface FoundationsTopicContent {
  meta: FoundationsTopicMeta;
  mode: "science" | "maths";
  starter: StarterQuestion;
  hook: HookSegment;
  teach: TeachSegment;
  practice: PracticeQuestion[];
  teachBack: TeachBackSegment;
  closingLine: string;
  /** True for topics that don't have real content authored yet — the shell/gating/nav is live, the lesson isn't written. */
  placeholder?: boolean;
}
