const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;  // It return a schema (姐係table 樣)

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');
  // this === joe

  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

// Check if mongo have a collection of 'user'?
// Then tell mongoose every time you work with User, the struture have to follow UserSchema.
// Return an user class represent the entire collection of data. (Not just a signle user!)
const User = mongoose.model('user', UserSchema);

// return a User class if some where require this file.
module.exports = User;
