const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllQuizzes = async (req, res) => {
  const quizzes = await Quiz.find().populate('course');
  res.json(quizzes);
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    // Hide answers before sending to student
    const questions = quiz.questions.map(q => ({
      text: q.text,
      options: q.options
    }));

    res.json({ _id: quiz._id, title: quiz.title, course: quiz.course, questions });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.submitQuiz = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

  const userAnswers = req.body.answers;
  let score = 0;
  quiz.questions.forEach((q, i) => {
    const userAnswer = userAnswers.find(a => a.questionIndex === i);
    if (userAnswer && userAnswer.selected === q.answer) {
      score++;
    }
  });

  res.json({ total: quiz.questions.length, score });
};

