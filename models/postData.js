const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating Schema
const postSchema = new Schema({
  title: String,
  detail: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const postData = mongoose.model('postData', postSchema);

module.exports = postData;
