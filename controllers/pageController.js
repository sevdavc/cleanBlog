const postData = require('../models/postData');

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddpostPage = (req, res) => {
  res.render('add_post');
};

exports.getEditPage = async (req, res) => {
  const allp = await postData.findOne({ _id: req.params.id });
  res.render('edit', {
    allp,
  });
};
