const postData = require('../models/postData');

exports.getAllPosts = async (req, res) => {
  const page = req.query.page || 1;
  const postperpage = 2;
  const totalpost = await postData.find().countDocuments();
  const pages = Math.ceil(totalpost / postperpage);
  const allposts = await postData
    .find({})
    .sort('-dateCreated')
    .skip((page - 1) * postperpage)
    .limit(postperpage);
  res.render('index', {
    allposts,
    current: page,
    pages,
  });
};

exports.getPost = async (req, res) => {
  const allp = await postData.findById(req.params.id);
  res.render('post', {
    allp,
  });
};

exports.createPost = async (req, res) => {
  await postData.create(req.body);
  res.redirect('/');
};

exports.updatePost = async (req, res) => {
  const allp = await postData.findOne({ _id: req.params.id });
  allp.title = req.body.title;
  allp.detail = req.body.detail;
  allp.save();

  res.redirect(`/allposts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await postData.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
