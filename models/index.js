const Comment = require("./Comment");
const Like = require("./Like");
const Post = require("./Post");
const Profile = require("./Profile");
const User = require("./User");

User.hasOne(Profile);
Profile.belongsTo(User);

Post.belongsTo(User);
User.hasMany(Post);

Comment.belongsTo(Post);
Post.hasMany(Comment);

User.belongsToMany(Like, { through: "user-like" });
Like.belongsToMany(User, { through: "user-like" });

module.exports = {
  Comment,
  Like,
  Post,
  Profile,
  User,
};
