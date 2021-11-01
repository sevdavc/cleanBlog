const express = require('express');
const enj = require('ejs');
const postData = require('./models/postData');
const mongoose = require('mongoose');

const app = express();

//Database Connection
mongoose.connect('mongodb://localhost/cleanBlogDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get('/', async (req, res) => {
  const allposts = await postData.find();
  res.render('index', {
    allposts,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.get('/allposts/:id', async (req, res) => {
  const allp = await postData.findById(req.params.id);
  res.render('post', {
    allp,
  });
});

app.post('/add_post', async (req, res) => {
  await postData.create(req.body);
  res.redirect('/');
});

app.listen(5000, () => {
  console.log('Port opened.');
});
