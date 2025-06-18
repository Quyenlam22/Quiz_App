const Answer = require("../models/answer.model")

// [GET] /api/v1/answers
module.exports.index = async ( req, res ) => {
  try {
    const answers = await Answer.find({
      deleted: false
    });

    res.json({
      code: 200,
      data: answers
    });
  } catch (error) {
    res.json({
      code: 400,
      message: error
    });
  }
}

// [GET] /api/v1/answers/:id
module.exports.detail = async ( req, res ) => {
  const id = req.params.id;

  try {
    const answer = await Answer.findOne({
      _id: id,
      deleted: false
    });

    res.json({
      code: 200,
      data: answer
    });
  } catch (error) {
    res.json({
      code: 400,
      message: error
    });
  }
}