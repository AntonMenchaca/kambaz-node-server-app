import * as questionsDao from "./dao.js";
import * as quizAttemptsDao from "../QuizAttempts/dao.js";

export default function QuestionRoutes(app) {

  // Get all questions for a quiz
  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    try {
      const questions = await questionsDao.findQuestionsForQuiz(quizId);
      res.json(questions);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Get a specific question
  app.get("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    try {
      const question = await questionsDao.findQuestionById(questionId);
      res.json(question);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Create a new question
  app.post("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const question = {
      ...req.body,
      quiz: quizId,
    };
    try {
      const newQuestion = await questionsDao.createQuestion(question);
      
      // Reset all attempts for this quiz when questions are added
      await quizAttemptsDao.deleteAllAttemptsForQuiz(quizId);
      
      res.json(newQuestion);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Update a question
  app.put("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    try {
      // First get the question to find the quiz ID
      const question = await questionsDao.findQuestionById(questionId);
      
      const status = await questionsDao.updateQuestion(questionId, req.body);
      
      // Reset all attempts for this quiz when questions are updated
      if (question && question.quiz) {
        await quizAttemptsDao.deleteAllAttemptsForQuiz(question.quiz);
      }
      
      res.json(status);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Delete a question
  app.delete("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    try {
      // First get the question to find the quiz ID
      const question = await questionsDao.findQuestionById(questionId);
      
      const status = await questionsDao.deleteQuestion(questionId);
      
      // Reset all attempts for this quiz when questions are deleted
      if (question && question.quiz) {
        await quizAttemptsDao.deleteAllAttemptsForQuiz(question.quiz);
      }
      
      res.json(status);
    } catch (error) {
      res.status(400).json(error);
    }
  });
}
