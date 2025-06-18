const Topic = require("../models/topic.model");

// [GET] /api/v1/topics
module.exports.index = async (req, res) => {
  try {
    const topics = await Topic.find({
      deleted: false
    });

    res.json({
      code: 200,
      data: topics
    });
  } catch (error) {
    res.json({
      code: 400,
      message: error
    });
  }
}

// [GET] /api/v1/topics/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id;

  try {
    const topic = await Topic.findOne({
      _id: id,
      deleted: false
    });

    res.json({
      code: 200,
      data: topic
    });
  } catch (error) {
    res.json({
      code: 400,
      message: error
    });
  }
}