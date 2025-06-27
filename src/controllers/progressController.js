const Progress = require('../models/Progress');

exports.saveProgress = async (req, res) => {
  try {
    const { user, course, completedLessons, percentComplete } = req.body;

    let progress = await Progress.findOne({ user, course });

    if (progress) {
      progress.completedLessons = completedLessons;
      progress.percentComplete = percentComplete;
      await progress.save();
    } else {
      progress = new Progress({ user, course, completedLessons, percentComplete });
      await progress.save();
    }

    res.status(200).json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const { user, course } = req.query;

    const query = {};
    if (user) query.user = user;
    if (course) query.course = course;

    const progress = await Progress.find(query).populate('course').populate('user');
    res.json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
