import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: { type: String, ref: "QuizModel", required: true },
    user: { type: String, ref: "UserModel", required: true },
    attempt: { type: Number, required: true, default: 1 },
    answers: [{
      question: { type: String, ref: "QuestionModel", required: true },
      answer: mongoose.Schema.Types.Mixed, // Can be string, boolean, or array depending on question type
      isCorrect: { type: Boolean, default: false },
      pointsEarned: { type: Number, default: 0 }
    }],
    score: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    startedAt: { type: Date, default: Date.now },
    submittedAt: Date,
    timeSpent: Number // in minutes
  },
  { collection: "quizAttempts" }
);

// Compound index to ensure unique attempts per user per quiz
quizAttemptSchema.index({ quiz: 1, user: 1, attempt: 1 }, { unique: true });

export default quizAttemptSchema;
