const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  userId: String,
  topicId: String,
  answer: [
    {
      "questionId": Number,
      "answer": Number
    }
  ],
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, {
  timestamps: true
})

const Answer = mongoose.model("Answer", answerSchema, "answers");

module.exports = Answer;