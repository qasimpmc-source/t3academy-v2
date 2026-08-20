import type { FoundationsChapterMeta, FoundationsSubjectId, FoundationsSubjectMeta, FoundationsTopicMeta } from "./types";

/**
 * The full KS3 Year 7 topic map, mapped from the two syllabus contents pages
 * (Maths Year 7, Science Year 7 Part 1). Chapter 6 of the science book ("Reactions")
 * had its header cut off in the scanned photo — the title is inferred from its two
 * sections (Acids and alkalis, Metals and non-metals), everything else is exact.
 */

export const FOUNDATIONS_SUBJECTS: Record<FoundationsSubjectId, FoundationsSubjectMeta> = {
  maths: {
    id: "maths", label: "Maths", icon: "📐",
    color: "#1D6FDB", bg: "rgba(29,111,219,0.08)", border: "rgba(29,111,219,0.25)",
  },
  physics: {
    id: "physics", label: "Physics", icon: "⚡",
    color: "#6D28D9", bg: "rgba(109,40,217,0.08)", border: "rgba(109,40,217,0.25)",
    group: "science",
  },
  chemistry: {
    id: "chemistry", label: "Chemistry", icon: "🧪",
    color: "#C2410C", bg: "rgba(194,65,12,0.08)", border: "rgba(194,65,12,0.25)",
    group: "science",
  },
  biology: {
    id: "biology", label: "Biology", icon: "🌱",
    color: "#0F7D4B", bg: "rgba(15,125,75,0.08)", border: "rgba(15,125,75,0.25)",
    group: "science",
  },
};

interface ChapterSeed {
  id: string;
  title: string;
  topics: { id: string; title: string }[];
}

function buildChapters(subjectId: FoundationsSubjectId, seeds: ChapterSeed[]): {
  chapters: FoundationsChapterMeta[];
  topics: FoundationsTopicMeta[];
} {
  const chapters: FoundationsChapterMeta[] = [];
  const topics: FoundationsTopicMeta[] = [];
  seeds.forEach((seed, chapterIndex) => {
    chapters.push({ id: seed.id, subjectId, title: seed.title, order: chapterIndex });
    seed.topics.forEach((t, topicIndex) => {
      topics.push({ id: t.id, chapterId: seed.id, subjectId, title: t.title, order: topicIndex });
    });
  });
  return { chapters, topics };
}

const MATHS = buildChapters("maths", [
  { id: "analysing-and-displaying-data", title: "Analysing and displaying data", topics: [
    { id: "mode-median-and-range", title: "Mode, median and range" },
    { id: "displaying-data", title: "Displaying data" },
    { id: "grouping-data", title: "Grouping data" },
    { id: "averages-and-comparing-data", title: "Averages and comparing data" },
    { id: "line-graphs-and-more-bar-charts", title: "Line graphs and more bar charts" },
  ]},
  { id: "number-skills", title: "Number skills", topics: [
    { id: "mental-maths", title: "Mental maths" },
    { id: "addition-and-subtraction", title: "Addition and subtraction" },
    { id: "multiplication", title: "Multiplication" },
    { id: "division", title: "Division" },
    { id: "money-and-time", title: "Money and time" },
    { id: "negative-numbers", title: "Negative numbers" },
    { id: "factors-multiples-and-primes", title: "Factors, multiples and primes" },
    { id: "square-numbers", title: "Square numbers" },
  ]},
  { id: "expressions-functions-and-formulae", title: "Expressions, functions and formulae", topics: [
    { id: "functions", title: "Functions" },
    { id: "simplifying-expressions-1", title: "Simplifying expressions 1" },
    { id: "simplifying-expressions-2", title: "Simplifying expressions 2" },
    { id: "writing-expressions", title: "Writing expressions" },
    { id: "substituting-into-formulae", title: "Substituting into formulae" },
    { id: "writing-formulae", title: "Writing formulae" },
  ]},
  { id: "decimals-and-measures", title: "Decimals and measures", topics: [
    { id: "decimals-and-rounding", title: "Decimals and rounding" },
    { id: "length-mass-and-capacity", title: "Length, mass and capacity" },
    { id: "scales-and-measures", title: "Scales and measures" },
    { id: "working-with-decimals-mentally", title: "Working with decimals mentally" },
    { id: "working-with-decimals", title: "Working with decimals" },
    { id: "perimeter", title: "Perimeter" },
    { id: "area", title: "Area" },
    { id: "more-units-of-measure", title: "More units of measure" },
  ]},
  { id: "fractions-and-percentages", title: "Fractions and percentages", topics: [
    { id: "comparing-fractions", title: "Comparing fractions" },
    { id: "simplifying-fractions", title: "Simplifying fractions" },
    { id: "working-with-fractions", title: "Working with fractions" },
    { id: "fractions-and-decimals", title: "Fractions and decimals" },
    { id: "understanding-percentages", title: "Understanding percentages" },
    { id: "percentages-of-amounts", title: "Percentages of amounts" },
  ]},
  { id: "probability", title: "Probability", topics: [
    { id: "the-language-of-probability", title: "The language of probability" },
    { id: "calculating-probability", title: "Calculating probability" },
    { id: "more-probability-calculations", title: "More probability calculations" },
    { id: "experimental-probability", title: "Experimental probability" },
    { id: "expected-outcomes", title: "Expected outcomes" },
  ]},
  { id: "ratio-and-proportion", title: "Ratio and proportion", topics: [
    { id: "direct-proportion", title: "Direct proportion" },
    { id: "writing-ratios", title: "Writing ratios" },
    { id: "using-ratios", title: "Using ratios" },
    { id: "ratios-proportions-and-fractions", title: "Ratios, proportions and fractions" },
    { id: "proportions-and-percentages", title: "Proportions and percentages" },
  ]},
  { id: "lines-and-angles", title: "Lines and angles", topics: [
    { id: "measuring-and-drawing-angles", title: "Measuring and drawing angles" },
    { id: "lines-angles-and-triangles", title: "Lines, angles and triangles" },
    { id: "drawing-triangles-accurately", title: "Drawing triangles accurately" },
    { id: "calculating-angles", title: "Calculating angles" },
    { id: "angles-in-a-triangle", title: "Angles in a triangle" },
    { id: "quadrilaterals", title: "Quadrilaterals" },
  ]},
  { id: "sequences-and-graphs", title: "Sequences and graphs", topics: [
    { id: "sequences", title: "Sequences" },
    { id: "pattern-sequences", title: "Pattern sequences" },
    { id: "coordinates-and-midpoints", title: "Coordinates and midpoints" },
    { id: "extending-sequences", title: "Extending sequences" },
    { id: "straight-line-graphs", title: "Straight-line graphs" },
    { id: "position-to-term-rules", title: "Position-to-term rules" },
  ]},
  { id: "transformations", title: "Transformations", topics: [
    { id: "congruency-and-enlargements", title: "Congruency and enlargements" },
    { id: "symmetry", title: "Symmetry" },
    { id: "reflection", title: "Reflection" },
    { id: "rotation", title: "Rotation" },
    { id: "translations-and-combined-transformations", title: "Translations and combined transformations" },
  ]},
]);

const PHYSICS = buildChapters("physics", [
  { id: "forces", title: "Forces", topics: [
    { id: "introduction-to-forces", title: "Introduction to forces" },
    { id: "balanced-and-unbalanced-forces", title: "Balanced and unbalanced forces" },
    { id: "speed", title: "Speed" },
    { id: "distance-time-graphs", title: "Distance–time graphs" },
    { id: "gravity", title: "Gravity" },
  ]},
  { id: "electromagnets", title: "Electromagnets", topics: [
    { id: "potential-difference", title: "Potential difference" },
    { id: "resistance", title: "Resistance" },
    { id: "series-and-parallel-circuits", title: "Series and parallel circuits" },
    { id: "current", title: "Current" },
    { id: "charging-up", title: "Charging up" },
  ]},
  { id: "energy", title: "Energy", topics: [
    { id: "food-and-fuels", title: "Food and fuels" },
    { id: "energy-resources", title: "Energy resources" },
    { id: "energy-and-power", title: "Energy and power" },
    { id: "energy-adds-up", title: "Energy adds up" },
    { id: "energy-dissipation", title: "Energy dissipation" },
  ]},
  { id: "waves", title: "Waves", topics: [
    { id: "sound-waves-and-speed", title: "Sound waves and speed" },
    { id: "loudness-and-amplitude", title: "Loudness and amplitude" },
    { id: "frequency-and-pitch", title: "Frequency and pitch" },
    { id: "the-ear-and-hearing", title: "The ear and hearing" },
    { id: "light", title: "Light" },
    { id: "reflection-waves", title: "Reflection" },
    { id: "refraction", title: "Refraction" },
    { id: "the-eye-and-vision", title: "The eye and vision" },
    { id: "colour", title: "Colour" },
  ]},
]);

const CHEMISTRY = buildChapters("chemistry", [
  { id: "matter", title: "Matter", topics: [
    { id: "the-particle-model", title: "The particle model" },
    { id: "states-of-matter", title: "States of matter" },
    { id: "melting-and-freezing", title: "Melting and freezing" },
    { id: "boiling", title: "Boiling" },
    { id: "more-changes-of-state", title: "More changes of state" },
    { id: "diffusion", title: "Diffusion" },
    { id: "gas-pressure", title: "Gas pressure" },
    { id: "inside-particles", title: "Inside particles" },
    { id: "pure-substances-and-mixtures", title: "Pure substances and mixtures" },
    { id: "solutions", title: "Solutions" },
    { id: "solubility", title: "Solubility" },
    { id: "filtration", title: "Filtration" },
    { id: "evaporation-and-distillation", title: "Evaporation and distillation" },
    { id: "chromatography", title: "Chromatography" },
  ]},
  { id: "reactions", title: "Reactions", topics: [
    { id: "chemical-reactions", title: "Chemical reactions" },
    { id: "acids-and-alkalis", title: "Acids and alkalis" },
    { id: "indicators-and-ph", title: "Indicators and pH" },
    { id: "acid-strength", title: "Acid strength" },
    { id: "neutralisation", title: "Neutralisation" },
    { id: "making-salts", title: "Making salts" },
    { id: "more-about-elements", title: "More about elements" },
    { id: "chemical-reactions-of-metals-and-non-metals", title: "Chemical reactions of metals and non-metals" },
    { id: "metals-and-acids", title: "Metals and acids" },
    { id: "metals-and-oxygen", title: "Metals and oxygen" },
    { id: "metals-and-water", title: "Metals and water" },
    { id: "metal-displacement-reactions", title: "Metal displacement reactions" },
  ]},
  { id: "earth", title: "Earth", topics: [
    { id: "the-structure-of-the-earth", title: "The structure of the Earth" },
    { id: "sedimentary-rocks", title: "Sedimentary rocks" },
    { id: "igneous-and-metamorphic-rocks", title: "Igneous and metamorphic rocks" },
    { id: "the-rock-cycle", title: "The rock cycle" },
    { id: "ceramics", title: "Ceramics" },
    { id: "the-night-sky", title: "The night sky" },
    { id: "the-solar-system", title: "The Solar System" },
    { id: "the-earth-in-space", title: "The Earth" },
    { id: "the-moon-and-changing-ideas", title: "The Moon and changing ideas" },
  ]},
]);

const BIOLOGY = buildChapters("biology", [
  { id: "organisms", title: "Organisms", topics: [
    { id: "levels-of-organisation", title: "Levels of organisation" },
    { id: "the-skeleton", title: "The skeleton" },
    { id: "movement-joints", title: "Movement: joints" },
    { id: "movement-muscles", title: "Movement: muscles" },
    { id: "observing-cells", title: "Observing cells" },
    { id: "plant-and-animal-cells", title: "Plant and animal cells" },
    { id: "specialised-cells", title: "Specialised cells" },
    { id: "movement-of-substances", title: "Movement of substances" },
    { id: "uni-cellular-organisms", title: "Uni-cellular organisms" },
  ]},
  { id: "ecosystems", title: "Ecosystems", topics: [
    { id: "food-chains-and-webs", title: "Food chains and webs" },
    { id: "disruption-to-food-chains-and-webs", title: "Disruption to food chains and webs" },
    { id: "ecosystems-topic", title: "Ecosystems" },
    { id: "competition", title: "Competition" },
    { id: "flowers-and-pollination", title: "Flowers and pollination" },
    { id: "fertilisation-and-germination", title: "Fertilisation and germination" },
    { id: "seed-dispersal", title: "Seed dispersal" },
  ]},
  { id: "genes", title: "Genes", topics: [
    { id: "variation", title: "Variation" },
    { id: "continuous-and-discontinuous", title: "Continuous and discontinuous" },
    { id: "adapting-to-change", title: "Adapting to change" },
    { id: "adolescence", title: "Adolescence" },
    { id: "reproductive-systems", title: "Reproductive systems" },
    { id: "fertilisation-and-implantation", title: "Fertilisation and implantation" },
    { id: "development-of-a-fetus", title: "Development of a fetus" },
    { id: "the-menstrual-cycle", title: "The menstrual cycle" },
  ]},
]);

export const FOUNDATIONS_CHAPTERS: FoundationsChapterMeta[] = [
  ...MATHS.chapters, ...PHYSICS.chapters, ...CHEMISTRY.chapters, ...BIOLOGY.chapters,
];

export const FOUNDATIONS_TOPICS: FoundationsTopicMeta[] = [
  ...MATHS.topics, ...PHYSICS.topics, ...CHEMISTRY.topics, ...BIOLOGY.topics,
];

export function isValidFoundationsSubject(s: string): s is FoundationsSubjectId {
  return s in FOUNDATIONS_SUBJECTS;
}

export function getChaptersForSubject(subjectId: FoundationsSubjectId): FoundationsChapterMeta[] {
  return FOUNDATIONS_CHAPTERS.filter(c => c.subjectId === subjectId).sort((a, b) => a.order - b.order);
}

export function getTopicsForChapter(chapterId: string): FoundationsTopicMeta[] {
  return FOUNDATIONS_TOPICS.filter(t => t.chapterId === chapterId).sort((a, b) => a.order - b.order);
}

export function getChapter(chapterId: string): FoundationsChapterMeta | undefined {
  return FOUNDATIONS_CHAPTERS.find(c => c.id === chapterId);
}

export function getTopic(chapterId: string, topicId: string): FoundationsTopicMeta | undefined {
  return FOUNDATIONS_TOPICS.find(t => t.chapterId === chapterId && t.id === topicId);
}

/** Every topic in a subject, in the single fixed play order gating is computed against: chapter order, then topic order within chapter. */
export function getOrderedTopics(subjectId: FoundationsSubjectId): FoundationsTopicMeta[] {
  const chapters = getChaptersForSubject(subjectId);
  return chapters.flatMap(c => getTopicsForChapter(c.id));
}
