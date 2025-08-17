import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findAllQuizzes() {
  return model.find();
}

export function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}

export function findQuizById(quizId) {
  return model.findById(quizId);
}

export function createQuiz(quiz) {
  delete quiz._id;
  const newQuiz = {
    ...quiz,
    _id: uuidv4()
  };
  return model.create(newQuiz);
}

export function updateQuiz(quizId, quiz) {
  return model.findByIdAndUpdate(quizId, quiz, { new: true });
}

export function deleteQuiz(quizId) {
  return model.findByIdAndDelete(quizId);
}

export function publishQuiz(quizId) {
  return model.findByIdAndUpdate(quizId, { published: true }, { new: true });
}

export function unpublishQuiz(quizId) {
  return model.findByIdAndUpdate(quizId, { published: false }, { new: true });
}
