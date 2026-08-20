import type { FoundationsTopicContent } from "../types";
import { FOUNDATIONS_TOPICS, getChapter } from "../structure";
import { physicsForces } from "./physics-forces";
import { mathsAnalysingAndDisplayingData } from "./maths-analysing-and-displaying-data";

const AUTHORED: FoundationsTopicContent[] = [
  ...physicsForces,
  ...mathsAnalysingAndDisplayingData,
];

function contentKey(chapterId: string, topicId: string): string {
  return `${chapterId}/${topicId}`;
}

function placeholderFor(meta: (typeof FOUNDATIONS_TOPICS)[number]): FoundationsTopicContent {
  const chapter = getChapter(meta.chapterId);
  const isMaths = meta.subjectId === "maths";
  return {
    meta,
    mode: isMaths ? "maths" : "science",
    placeholder: true,
    starter: {
      prompt: `Content for "${meta.title}" hasn't been written yet.`,
      options: [{ label: "Got it", correct: true, feedback: "This topic is on the map and will unlock properly once its content is written." }],
    },
    hook: { prompt: "Coming soon.", note: "" },
    teach: { body: `"${meta.title}" (${chapter?.title ?? meta.chapterId}) is scaffolded — routing, gating and the mastery map already treat it correctly — but the lesson itself hasn't been authored yet.` },
    practice: [],
    teachBack: { prompt: "Coming soon.", checkFor: [] },
    closingLine: "",
  };
}

const CONTENT_MAP: Map<string, FoundationsTopicContent> = new Map();
for (const meta of FOUNDATIONS_TOPICS) {
  CONTENT_MAP.set(contentKey(meta.chapterId, meta.id), placeholderFor(meta));
}
for (const content of AUTHORED) {
  CONTENT_MAP.set(contentKey(content.meta.chapterId, content.meta.id), content);
}

export function getTopicContent(chapterId: string, topicId: string): FoundationsTopicContent | undefined {
  return CONTENT_MAP.get(contentKey(chapterId, topicId));
}
