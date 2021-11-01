const express = require('express');
const path = require('path');
const enj = require('ejs');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render('index');
});

app.listen(5000, () => {
  console.log('Port opened.');
});
