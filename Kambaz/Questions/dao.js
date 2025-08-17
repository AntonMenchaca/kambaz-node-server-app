import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findAllQuestions() {
  return model.find();
}

export function findQuestionsForQuiz(quizId) {
  return model.find({ quiz: quizId });
}

export function findQuestionById(questionId) {
  return model.findById(questionId);
}

export function createQuestion(question) {
  delete question._id;
  const newQuestion = {
    ...question,
    _id: uuidv4()
  };
  return model.create(newQuestion);
}

export function updateQuestion(questionId, question) {
  return model.findByIdAndUpdate(questionId, question, { new: true });
}

export function deleteQuestion(questionId) {
  return model.findByIdAndDelete(questionId);
}

export function deleteAllQuestionsForQuiz(quizId) {
  return model.deleteMany({ quiz: quizId });
}
