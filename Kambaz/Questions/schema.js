import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, required: true, default: "Question" },
    quiz: { type: String, ref: "QuizModel", required: true },
    type: {
      type: String,
      enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"],
      required: true,
      default: "MULTIPLE_CHOICE"
    },
    points: { type: Number, default: 1 },
    question: { type: String, required: true },
    // For multiple choice questions
    choices: [{
      text: String,
      isCorrect: { type: Boolean, default: false }
    }],
    // For true/false questions
    correctAnswer: { type: Boolean }, // true or false
    // For fill in the blank questions
    possibleAnswers: [String], // array of possible correct answers
    caseSensitive: { type: Boolean, default: false }
  },
  { collection: "questions" }
);

export default questionSchema;
