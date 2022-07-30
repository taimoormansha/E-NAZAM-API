const Class = require("../models/darjaat.model");

const getAll = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

const getOne = async (req, res) => {
  try {
    const _class = await Class.find({'_id' : req.params.id});
    res.json(_class);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

module.exports = { getAll, getOne };
