import * as quizAttemptsDao from "./dao.js";
import * as questionsDao from "../Questions/dao.js";

export default function QuizAttemptRoutes(app) {

  // Get all attempts for a quiz
  app.get("/api/quizzes/:quizId/attempts", async (req, res) => {
    const { quizId } = req.params;
    try {
      const attempts = await quizAttemptsDao.findAttemptsForQuiz(quizId);
      res.json(attempts);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Get attempts for a user
  app.get("/api/users/:userId/attempts", async (req, res) => {
    const { userId } = req.params;
    try {
      const attempts = await quizAttemptsDao.findAttemptsForUser(userId);
      res.json(attempts);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Get attempts for a user and quiz
  app.get("/api/users/:userId/quizzes/:quizId/attempts", async (req, res) => {
    const { userId, quizId } = req.params;
    try {
      const attempts = await quizAttemptsDao.findAttemptsForUserAndQuiz(userId, quizId);
      res.json(attempts);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Get latest attempt for user and quiz
  app.get("/api/users/:userId/quizzes/:quizId/latest-attempt", async (req, res) => {
    const { userId, quizId } = req.params;
    try {
      const attempt = await quizAttemptsDao.findLatestAttemptForUserAndQuiz(userId, quizId);
      res.json(attempt);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Start a new attempt
  app.post("/api/users/:userId/quizzes/:quizId/attempts", async (req, res) => {
    const { userId, quizId } = req.params;
    try {
      const newAttempt = await quizAttemptsDao.createAttempt(userId, quizId);
      res.json(newAttempt);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Submit an attempt with answers
  app.put("/api/attempts/:attemptId/submit", async (req, res) => {
    const { attemptId } = req.params;
    const { answers } = req.body;

    try {
      const attempt = await quizAttemptsDao.findAttemptById(attemptId);
      if (!attempt) {
        return res.status(404).json({ message: "Attempt not found" });
      }

      // Get all questions for this quiz to calculate scores
      const questions = await questionsDao.findQuestionsForQuiz(attempt.quiz);
      let totalScore = 0;
      let totalPoints = 0;

      // Process each answer
      const processedAnswers = answers.map(answer => {
        const question = questions.find(q => q._id === answer.question);
        if (!question) return answer;

        totalPoints += question.points;
        let isCorrect = false;
        let pointsEarned = 0;

        // Check if answer is correct based on question type
        switch (question.type) {
          case "MULTIPLE_CHOICE":
            const correctChoice = question.choices.find(choice => choice.isCorrect);
            isCorrect = correctChoice && answer.answer === correctChoice.text;
            break;
          case "TRUE_FALSE":
            isCorrect = answer.answer === question.correctAnswer;
            break;
          case "FILL_IN_BLANK":
            const userAnswer = question.caseSensitive ?
              answer.answer : answer.answer.toLowerCase();
            const possibleAnswers = question.caseSensitive ?
              question.possibleAnswers :
              question.possibleAnswers.map(a => a.toLowerCase());
            isCorrect = possibleAnswers.includes(userAnswer);
            break;
        }

        if (isCorrect) {
          pointsEarned = question.points;
          totalScore += pointsEarned;
        }

        return {
          ...answer,
          isCorrect,
          pointsEarned
        };
      });

      // Update the attempt
      const updateData = {
        answers: processedAnswers,
        score: totalScore,
        totalPoints: totalPoints,
        submittedAt: new Date(),
        timeSpent: Math.round((new Date() - attempt.startedAt) / (1000 * 60)) // in minutes
      };

      await quizAttemptsDao.updateAttempt(attemptId, updateData);

      // Return the updated attempt
      const updatedAttempt = await quizAttemptsDao.findAttemptById(attemptId);
      res.json(updatedAttempt);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Get a specific attempt
  app.get("/api/attempts/:attemptId", async (req, res) => {
    const { attemptId } = req.params;
    try {
      const attempt = await quizAttemptsDao.findAttemptById(attemptId);
      res.json(attempt);
    } catch (error) {
      res.status(400).json(error);
    }
  });
}
