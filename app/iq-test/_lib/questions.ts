export type Domain =
  | "abstract"
  | "workingMemory"
  | "processingSpeed"
  | "verbal"
  | "numerical"
  | "spatial";

export interface Question {
  id: string;
  domain: Domain;
  timeLimit: number; // seconds per question
  question: string;
  options: string[];
  correct: number; // 0-based index
}

export interface Answer {
  questionId: string;
  domain: Domain;
  correct: boolean;
  timeMs: number;
  skipped: boolean;
}

export const DOMAIN_LABELS: Record<Domain, string> = {
  abstract: "Abstract Reasoning",
  workingMemory: "Working Memory",
  processingSpeed: "Processing Speed",
  verbal: "Verbal Reasoning",
  numerical: "Numerical Reasoning",
  spatial: "Spatial Reasoning",
};

export const DOMAIN_TIME: Record<Domain, number> = {
  abstract: 20,
  workingMemory: 15,
  processingSpeed: 10,
  verbal: 25,
  numerical: 25,
  spatial: 20,
};

// ── Question bank ──────────────────────────────────────────────────────────────

const ABSTRACT: Question[] = [
  {
    id: "ab1",
    domain: "abstract",
    timeLimit: 20,
    question: "What comes next in the series? 2, 6, 18, 54, ?",
    options: ["108", "162", "128", "144"],
    correct: 1,
  },
  {
    id: "ab2",
    domain: "abstract",
    timeLimit: 20,
    question: "What letter comes next? A, C, E, G, ?",
    options: ["H", "I", "J", "K"],
    correct: 1,
  },
  {
    id: "ab3",
    domain: "abstract",
    timeLimit: 20,
    question: "Which number is missing? 1, 1, 2, 3, 5, 8, __, 21",
    options: ["11", "12", "13", "14"],
    correct: 2,
  },
  {
    id: "ab4",
    domain: "abstract",
    timeLimit: 20,
    question: "What comes next? 100, 90, 81, 73, 66, ?",
    options: ["58", "59", "60", "61"],
    correct: 2,
  },
  {
    id: "ab5",
    domain: "abstract",
    timeLimit: 20,
    question: "Complete the sequence: AZ, BY, CX, DW, ?",
    options: ["EV", "EU", "FV", "FW"],
    correct: 0,
  },
  {
    id: "ab6",
    domain: "abstract",
    timeLimit: 20,
    question: "What comes next? 3, 8, 15, 24, 35, ?",
    options: ["42", "46", "48", "50"],
    correct: 2,
  },
  {
    id: "ab7",
    domain: "abstract",
    timeLimit: 20,
    question:
      "If a circle symbol = 3 and a triangle symbol = 5, what is circle + triangle + (circle x triangle)?",
    options: ["19", "23", "28", "31"],
    correct: 1,
  },
  {
    id: "ab8",
    domain: "abstract",
    timeLimit: 20,
    question: "What is the next number? 1, 3, 6, 10, 15, ?",
    options: ["18", "20", "21", "22"],
    correct: 2,
  },
  {
    id: "ab9",
    domain: "abstract",
    timeLimit: 20,
    question: "Which number does NOT belong? 2, 3, 5, 7, 11, 12, 13",
    options: ["5", "7", "12", "13"],
    correct: 2,
  },
  {
    id: "ab10",
    domain: "abstract",
    timeLimit: 20,
    question: "What comes next in the sequence? 1, 3, 7, 15, 31, ?",
    options: ["52", "58", "63", "64"],
    correct: 2,
  },
];

const WORKING_MEMORY: Question[] = [
  {
    id: "wm1",
    domain: "workingMemory",
    timeLimit: 15,
    question:
      "Read this sequence once then answer: 7, 3, 8, 2, 5. What was the THIRD number?",
    options: ["7", "3", "8", "5"],
    correct: 2,
  },
  {
    id: "wm2",
    domain: "workingMemory",
    timeLimit: 15,
    question: "What is the word PLANETS spelled backwards?",
    options: ["STELNA", "STENALP", "STNEALP", "STENAL"],
    correct: 1,
  },
  {
    id: "wm3",
    domain: "workingMemory",
    timeLimit: 15,
    question: "Start at 50. Add 6, subtract 3, then multiply by 2. What is the result?",
    options: ["104", "106", "108", "110"],
    correct: 1,
  },
  {
    id: "wm4",
    domain: "workingMemory",
    timeLimit: 15,
    question: "Which letter is exactly 4 places after M in the alphabet?",
    options: ["O", "P", "Q", "R"],
    correct: 2,
  },
  {
    id: "wm5",
    domain: "workingMemory",
    timeLimit: 15,
    question:
      "Read once: RED, BLUE, GREEN, YELLOW, PURPLE. What was the FOURTH colour?",
    options: ["Green", "Blue", "Yellow", "Purple"],
    correct: 2,
  },
  {
    id: "wm6",
    domain: "workingMemory",
    timeLimit: 15,
    question: "If today is Thursday, what day was it exactly 10 days ago?",
    options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
    correct: 1,
  },
  {
    id: "wm7",
    domain: "workingMemory",
    timeLimit: 15,
    question:
      "Counting down from 100 in steps of 7: 100, 93, 86... What is the FOURTH number?",
    options: ["72", "75", "79", "82"],
    correct: 2,
  },
  {
    id: "wm8",
    domain: "workingMemory",
    timeLimit: 15,
    question:
      "The pattern is 5, 10, 20, 40 (doubling each time). What is the SIXTH number in the sequence?",
    options: ["80", "120", "160", "240"],
    correct: 2,
  },
];

const PROCESSING_SPEED: Question[] = [
  {
    id: "ps1",
    domain: "processingSpeed",
    timeLimit: 10,
    question:
      "How many times does the letter 'e' appear in: the elephant entered the enclosure",
    options: ["7", "8", "9", "10"],
    correct: 2,
  },
  {
    id: "ps2",
    domain: "processingSpeed",
    timeLimit: 10,
    question: "Which value is the largest? 0.8, 4/5, 79%, 0.801",
    options: ["0.8", "4/5", "79%", "0.801"],
    correct: 3,
  },
  {
    id: "ps3",
    domain: "processingSpeed",
    timeLimit: 10,
    question: "14 x 7 = ?",
    options: ["92", "96", "98", "102"],
    correct: 2,
  },
  {
    id: "ps4",
    domain: "processingSpeed",
    timeLimit: 10,
    question: "How many letters are in the word EXTRAORDINARY?",
    options: ["11", "12", "13", "14"],
    correct: 2,
  },
  {
    id: "ps5",
    domain: "processingSpeed",
    timeLimit: 10,
    question: "Which number does NOT belong? 12, 18, 24, 28, 30",
    options: ["12", "18", "28", "30"],
    correct: 2,
  },
  {
    id: "ps6",
    domain: "processingSpeed",
    timeLimit: 10,
    question: "48 divided by 8, plus 3 times 2 = ?",
    options: ["10", "11", "12", "13"],
    correct: 2,
  },
  {
    id: "ps7",
    domain: "processingSpeed",
    timeLimit: 10,
    question: "How many days are there in 3 weeks and 4 days?",
    options: ["23", "24", "25", "26"],
    correct: 2,
  },
  {
    id: "ps8",
    domain: "processingSpeed",
    timeLimit: 10,
    question: "Which pair sounds the same when spoken aloud?",
    options: ["CHORD / WORD", "COUGH / TOUGH", "PINT / MINT", "BLOOD / GOOD"],
    correct: 1,
  },
];

const VERBAL: Question[] = [
  {
    id: "vb1",
    domain: "verbal",
    timeLimit: 25,
    question: "Hand is to Glove as Foot is to:",
    options: ["Sock", "Shoe", "Boot", "Sandal"],
    correct: 1,
  },
  {
    id: "vb2",
    domain: "verbal",
    timeLimit: 25,
    question:
      "Which word is the odd one out? Crimson, Scarlet, Cobalt, Ruby",
    options: ["Crimson", "Scarlet", "Cobalt", "Ruby"],
    correct: 2,
  },
  {
    id: "vb3",
    domain: "verbal",
    timeLimit: 25,
    question: "Book is to Library as Painting is to:",
    options: ["Museum", "Artist", "Canvas", "Gallery"],
    correct: 3,
  },
  {
    id: "vb4",
    domain: "verbal",
    timeLimit: 25,
    question: "Which word means the OPPOSITE of benevolent?",
    options: ["Generous", "Malevolent", "Charitable", "Kind"],
    correct: 1,
  },
  {
    id: "vb5",
    domain: "verbal",
    timeLimit: 25,
    question: "ANCIENT is to NEW as TRANSPARENT is to:",
    options: ["Glass", "Clear", "Opaque", "Visible"],
    correct: 2,
  },
  {
    id: "vb6",
    domain: "verbal",
    timeLimit: 25,
    question:
      "All mammals are warm-blooded. A dolphin is a mammal. Therefore, a dolphin is...",
    options: [
      "Cold-blooded",
      "Warm-blooded",
      "Sometimes warm-blooded",
      "Cannot be determined",
    ],
    correct: 1,
  },
  {
    id: "vb7",
    domain: "verbal",
    timeLimit: 25,
    question: "Which sentence uses the word VERBOSE correctly?",
    options: [
      "She was verbose, using very few words.",
      "The verbose professor lectured for three hours.",
      "He spoke verbose.",
      "Verbose means to be silent.",
    ],
    correct: 1,
  },
  {
    id: "vb8",
    domain: "verbal",
    timeLimit: 25,
    question: "CONDUCTOR is to ORCHESTRA as CAPTAIN is to:",
    options: ["Sailor", "Ship", "Army", "Crew"],
    correct: 3,
  },
];

const NUMERICAL: Question[] = [
  {
    id: "nm1",
    domain: "numerical",
    timeLimit: 25,
    question:
      "A train travels 120 miles in 2 hours. How far does it travel in 3.5 hours at the same speed?",
    options: ["180 miles", "200 miles", "210 miles", "240 miles"],
    correct: 2,
  },
  {
    id: "nm2",
    domain: "numerical",
    timeLimit: 25,
    question: "What is 15% of 240?",
    options: ["32", "36", "38", "40"],
    correct: 1,
  },
  {
    id: "nm3",
    domain: "numerical",
    timeLimit: 25,
    question:
      "If 6 workers can build a wall in 10 days, how many days would it take 4 workers?",
    options: ["12 days", "13 days", "14 days", "15 days"],
    correct: 3,
  },
  {
    id: "nm4",
    domain: "numerical",
    timeLimit: 25,
    question:
      "The ratio of boys to girls in a class is 2:3. If there are 20 boys, how many students are there in total?",
    options: ["40", "45", "50", "60"],
    correct: 2,
  },
  {
    id: "nm5",
    domain: "numerical",
    timeLimit: 25,
    question:
      "A price is reduced by 20%, then reduced by a further 10%. What is the overall percentage reduction?",
    options: ["28%", "29%", "30%", "32%"],
    correct: 0,
  },
  {
    id: "nm6",
    domain: "numerical",
    timeLimit: 25,
    question: "What is the missing number? 2, 5, 10, 17, 26, ?",
    options: ["35", "36", "37", "38"],
    correct: 2,
  },
  {
    id: "nm7",
    domain: "numerical",
    timeLimit: 25,
    question: "If x + 5 = 12 and y = 2x, what is y?",
    options: ["12", "13", "14", "15"],
    correct: 2,
  },
  {
    id: "nm8",
    domain: "numerical",
    timeLimit: 25,
    question:
      "A shop buys an item for 40 pounds and sells it for 50 pounds. What is the percentage profit?",
    options: ["20%", "22%", "25%", "28%"],
    correct: 2,
  },
];

const SPATIAL: Question[] = [
  {
    id: "sp1",
    domain: "spatial",
    timeLimit: 20,
    question:
      "You are facing East. You turn 90 degrees anticlockwise. Which direction are you now facing?",
    options: ["North", "South", "West", "East"],
    correct: 0,
  },
  {
    id: "sp2",
    domain: "spatial",
    timeLimit: 20,
    question: "A cube has 8 vertices (corners). How many edges does it have?",
    options: ["8", "10", "12", "16"],
    correct: 2,
  },
  {
    id: "sp3",
    domain: "spatial",
    timeLimit: 20,
    question:
      "A clock shows exactly 3:00. What is the angle between the hour and minute hands?",
    options: ["60 degrees", "75 degrees", "90 degrees", "120 degrees"],
    correct: 2,
  },
  {
    id: "sp4",
    domain: "spatial",
    timeLimit: 20,
    question:
      "You fold a square piece of paper in half twice, then cut a small hole in the centre. How many holes appear when fully unfolded?",
    options: ["1", "2", "3", "4"],
    correct: 3,
  },
  {
    id: "sp5",
    domain: "spatial",
    timeLimit: 20,
    question: "Which 3D shape has exactly 5 vertices (corners)?",
    options: ["Cube", "Tetrahedron", "Square pyramid", "Triangular prism"],
    correct: 2,
  },
  {
    id: "sp6",
    domain: "spatial",
    timeLimit: 20,
    question:
      "On a standard dice, 1 is opposite 6 and 2 is opposite 5. What number is opposite 3?",
    options: ["2", "4", "5", "6"],
    correct: 1,
  },
  {
    id: "sp7",
    domain: "spatial",
    timeLimit: 20,
    question:
      "A rectangle is 6 cm wide and 8 cm tall. What is the length of its diagonal?",
    options: ["9 cm", "10 cm", "11 cm", "12 cm"],
    correct: 1,
  },
  {
    id: "sp8",
    domain: "spatial",
    timeLimit: 20,
    question:
      "You walk 3 miles North, then 4 miles East. How far are you from your starting point in a straight line?",
    options: ["4 miles", "5 miles", "6 miles", "7 miles"],
    correct: 1,
  },
];

// ── Session builders ───────────────────────────────────────────────────────────

export type AgeBand = "child" | "adult";

export function buildSession(ageBand: AgeBand): Question[] {
  if (ageBand === "adult") {
    // Abstract + Working Memory + Processing Speed (~26 questions, ~8 min)
    return [...ABSTRACT, ...WORKING_MEMORY, ...PROCESSING_SPEED];
  }
  // Child: all six domains (~50 questions, ~18 min)
  return [
    ...VERBAL,
    ...NUMERICAL,
    ...ABSTRACT,
    ...SPATIAL,
    ...WORKING_MEMORY,
    ...PROCESSING_SPEED,
  ];
}

export const ALL_DOMAINS_CHILD: Domain[] = [
  "verbal",
  "numerical",
  "abstract",
  "spatial",
  "workingMemory",
  "processingSpeed",
];

export const ALL_DOMAINS_ADULT: Domain[] = [
  "abstract",
  "workingMemory",
  "processingSpeed",
];
