import type { FoundationsSubjectId } from "./types";
import { getOrderedTopics } from "./structure";

/**
 * No gating concept exists anywhere else in the app — question_attempts only records
 * per-question correctness, there's no "topic passed" flag and no topic ordering.
 * Foundations needs genuine topic-by-topic progression, so this is built from scratch,
 * deliberately computed from the existing question_attempts table rather than a new
 * one: no schema migration required, and it matches how progress/page.tsx already
 * aggregates trophies from raw attempt rows rather than a stored precomputed value.
 */

export type TopicStatus = "locked" | "unlocked" | "passed";

export const PASS_THRESHOLD_ATTEMPTS = 5;
export const PASS_THRESHOLD_ACCURACY = 0.7;

export interface AttemptRow {
  topic: string;
  correct: boolean;
}

/** The `topic` value stored in question_attempts for a Foundations topic. */
export function topicKey(chapterId: string, topicId: string): string {
  return `${chapterId}/${topicId}`;
}

/** The `subject` value stored in question_attempts — namespaced so it never collides with the 11+ SubjectId values ("maths" etc). */
export function foundationsSubjectKey(subjectId: FoundationsSubjectId): string {
  return `foundations-${subjectId}`;
}

export function isTopicPassed(attempts: AttemptRow[], key: string): boolean {
  const rows = attempts.filter((a) => a.topic === key);
  if (rows.length < PASS_THRESHOLD_ATTEMPTS) return false;
  const correct = rows.filter((a) => a.correct).length;
  return correct / rows.length >= PASS_THRESHOLD_ACCURACY;
}

/**
 * Computes every topic's status in one pass, in play order (chapter order, then
 * topic order within chapter): the first topic is always unlocked, each subsequent
 * topic unlocks only once the one before it is passed.
 */
export function computeTopicStatuses(
  subjectId: FoundationsSubjectId,
  attempts: AttemptRow[]
): Record<string, TopicStatus> {
  const ordered = getOrderedTopics(subjectId);
  const statuses: Record<string, TopicStatus> = {};
  let previousPassed = true;

  for (const topic of ordered) {
    const key = topicKey(topic.chapterId, topic.id);
    if (!previousPassed) {
      statuses[key] = "locked";
      continue;
    }
    statuses[key] = isTopicPassed(attempts, key) ? "passed" : "unlocked";
    previousPassed = statuses[key] === "passed";
  }

  return statuses;
}

export function getTopicStatus(
  subjectId: FoundationsSubjectId,
  chapterId: string,
  topicId: string,
  attempts: AttemptRow[]
): TopicStatus {
  return computeTopicStatuses(subjectId, attempts)[topicKey(chapterId, topicId)] ?? "locked";
}

/** How many topics in the subject are passed, out of the total — drives the mastery-map progress display. */
export function subjectMasteryProgress(subjectId: FoundationsSubjectId, attempts: AttemptRow[]): { passed: number; total: number } {
  const statuses = computeTopicStatuses(subjectId, attempts);
  const values = Object.values(statuses);
  return { passed: values.filter((s) => s === "passed").length, total: values.length };
}
