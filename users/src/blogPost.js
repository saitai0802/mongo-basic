const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BlogPostSchema = new Schema({
  title: String,
  content: String,
  // This is a attribute that to let Mongoose understand what collection of  Schema.Types.ObjectId belongs to
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
