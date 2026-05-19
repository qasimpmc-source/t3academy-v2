export type SubjectId = "english" | "maths" | "verbal" | "nvr";

export interface TopicMeta {
  label: string;
  icon: string;
}

export interface SubjectConfig {
  label: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  topics: Record<string, TopicMeta>;
}

export const SUBJECTS: Record<SubjectId, SubjectConfig> = {
  english: {
    label: "English",
    icon: "📖",
    color: "#7C3AED",
    bg: "var(--color-english-bg)",
    border: "rgba(124,58,237,0.25)",
    topics: {
      "Comprehension: Literal Retrieval": { label: "Literal Retrieval",    icon: "📄" },
      "Comprehension: Inference":         { label: "Inference",             icon: "🔍" },
      "Vocabulary in Context":            { label: "Vocabulary in Context", icon: "📝" },
      "Grammar & Word Classes":           { label: "Grammar & Word Classes",icon: "✏️" },
      "Punctuation":                      { label: "Punctuation",           icon: "❗" },
      "Spelling":                         { label: "Spelling",              icon: "🔤" },
    },
  },
  maths: {
    label: "Maths",
    icon: "🔢",
    color: "#1D6FDB",
    bg: "var(--color-maths-bg)",
    border: "rgba(29,111,219,0.25)",
    topics: {
      numberAndPlaceValue:          { label: "Number & Place Value",    icon: "🔢" },
      fractionsDecimalsPercentages: { label: "Fractions, Decimals & %", icon: "½"  },
      moneyAndMeasures:             { label: "Money & Measures",        icon: "💰" },
      shapesAndGeometry:            { label: "Shapes & Geometry",       icon: "📐" },
      dataAndGraphs:                { label: "Data & Graphs",           icon: "📊" },
      reasoningAndLogic:            { label: "Reasoning & Logic",       icon: "🧠" },
    },
  },
  verbal: {
    label: "Verbal Reasoning",
    icon: "💬",
    color: "#0F7D4B",
    bg: "var(--color-verbal-bg)",
    border: "rgba(15,125,75,0.25)",
    topics: {
      synonyms:        { label: "Synonyms",        icon: "🔄" },
      antonyms:        { label: "Antonyms",         icon: "↔️" },
      letterSequences: { label: "Letter Sequences", icon: "🔡" },
      hiddenWords:     { label: "Hidden Words",     icon: "🔎" },
      wordConnections: { label: "Word Connections", icon: "🔗" },
      wordAnalogies:   { label: "Word Analogies",   icon: "⚖️" },
      logicPuzzles:    { label: "Logic Puzzles",    icon: "🧩" },
    },
  },
  nvr: {
    label: "Non-Verbal Reasoning",
    icon: "🔷",
    color: "#C2720A",
    bg: "var(--color-nvr-bg)",
    border: "rgba(194,114,10,0.25)",
    topics: {
      series:       { label: "Series",       icon: "➡️" },
      analogies:    { label: "Analogies",    icon: "🔀" },
      similarities: { label: "Similarities", icon: "👥" },
      oddOneOut:    { label: "Odd One Out",  icon: "❌" },
      codes:        { label: "Codes",        icon: "🔐" },
      matrices:     { label: "Matrices",     icon: "⊞"  },
      reflections:  { label: "Reflections",  icon: "🪞" },
      rotations:    { label: "Rotations",    icon: "🔁" },
    },
  },
};

export function isValidSubject(s: string): s is SubjectId {
  return s in SUBJECTS;
}
