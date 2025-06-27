const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Create a quiz
router.post('/', async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('course');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('course');
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit a quiz
router.post('/:quizId/submit', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const { answers } = req.body;
    let score = 0;

    answers.forEach((ans) => {
      if (quiz.questions[ans.questionIndex].answer === ans.selected) {
        score++;
      }
    });

    res.json({ message: 'Quiz submitted successfully', score });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
