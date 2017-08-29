const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;  // It return a schema (姐係table 樣)

// for all validate related stuff, please check validation_test.js for more details!
const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    // Web experts prefer, don't return error code like "schema_USERNAME_error"
    // it will make the job in front-end a lot easier, cuz you don't needa translate
    // to some English friendly equivalent.
    required: [true, 'Name is required.']  // [required is true, error message]
  },
  likes: Number, // 我地用左virtual type to create a postCount attribute!
  posts: [PostSchema], // - Sub document 之前係直接將post object 放入尼個attribute.
  blogPosts: [{  // - New version of PostSchema approach
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

// testing file is in virtual_type_test.js
// This is the way how we create a on the fire attribute for out model
// getter and setter is ES6 fetures!!!
UserSchema.virtual('postCount').get(function() { // We don't use arrow function cuz we don't want this whole file object
  return this.posts.length;
});

// Add our middleware to user schema.
UserSchema.pre('remove', function(next) {

  // *********************Important*************************
  // 如果唔係到create, 直接用係上面 require a blogPost object
  // And blog post require user to do a middleware, 禁我點知邊個做先?
  // So, we needa use the below line. 因為將尼一句放入係anonymous function入面，佢就唔會好似require禁，一開頭就load.
  const BlogPost = mongoose.model('blogPost');
  // this === joe(current user)

  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

// Check if mongo have a collection of 'user'?
// Then tell mongoose every time you work with User, the struture have to follow UserSchema.
// Return an user class represent the entire collection of data. (Not just a signle user!)
const User = mongoose.model('user', UserSchema);

// return a User class if some where require this file.
module.exports = User;
