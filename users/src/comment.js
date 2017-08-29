const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The ref needs to excatlly the same as the model creation.
// const User = mongoose.model('user', UserSchema); in user.js
const CommentSchema = new Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: 'user' }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
