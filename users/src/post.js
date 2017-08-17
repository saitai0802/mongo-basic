const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
Every important!
We won’t create a separate model to represent the nested resource. Instead we will make only a post schema.

The reason for this is mongoose models like our user model are made to represent distinct
 collections in MongoDB database. But in this case of posts, this is not a distinct collection.

 In mongoose world, this idea of embedding one resource inside of another is referred to as sub documents.
 In this case user is document. Post is sub-document.
*/
const PostSchema = new Schema({
  title: String
});

module.exports = PostSchema;
