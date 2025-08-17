import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findAllAttempts() {
  return model.find();
}

export function findAttemptsForQuiz(quizId) {
  return model.find({ quiz: quizId }).populate("user");
}

export function findAttemptsForUser(userId) {
  return model.find({ user: userId }).populate("quiz");
}

export function findAttemptsForUserAndQuiz(userId, quizId) {
  return model.find({ user: userId, quiz: quizId }).sort({ attempt: -1, submittedAt: -1 });
}

export function findLatestAttemptForUserAndQuiz(userId, quizId) {
  return model.findOne({ user: userId, quiz: quizId }).sort({ attempt: -1 });
}

export function findAttemptById(attemptId) {
  return model.findById(attemptId);
}

export async function createAttempt(userId, quizId) {
  // Find the latest attempt number for this user and quiz
  const latestAttempt = await findLatestAttemptForUserAndQuiz(userId, quizId);
  const attemptNumber = latestAttempt ? latestAttempt.attempt + 1 : 1;

  const newAttempt = {
    _id: uuidv4(),
    quiz: quizId,
    user: userId,
    attempt: attemptNumber,
    answers: [],
    score: 0,
    totalPoints: 0,
    startedAt: new Date()
  };

  return model.create(newAttempt);
}

export function updateAttempt(attemptId, attemptData) {
  return model.findByIdAndUpdate(attemptId, attemptData, { new: true });
}

export function deleteAttempt(attemptId) {
  return model.findByIdAndDelete(attemptId);
}

export function deleteAllAttemptsForQuiz(quizId) {
  return model.deleteMany({ quiz: quizId });
}

export function deleteAllAttemptsForUser(userId) {
  return model.deleteMany({ user: userId });
}
