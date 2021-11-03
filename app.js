const express = require('express');
const enj = require('ejs');
const postData = require('./models/postData');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const app = express();

//Database Connection
mongoose
  .connect(
    'mongodb+srv://sevda:7691552@pcatcluster.bhewm.mongodb.net/pcatCluster?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => {
    console.log('connection failed');
  });

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  }),
);

//Routes
app.get('/', postController.getAllPosts);
app.get('/allposts/:id', postController.getPost);
app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddpostPage);
app.get('/allposts/edit/:id', pageController.getEditPage);
app.post('/add_post', postController.createPost);
app.put('/allposts/:id', postController.updatePost);
app.delete('/allposts/:id', postController.deletePost);

app.listen(process.env.PORT || 5000, () => {
  console.log('Port opened.');
});
