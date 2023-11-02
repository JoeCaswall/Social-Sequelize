const { db, DatTypes, Model, DataTypes } = require("../db/connection");

class Comment extends Model {}

Comment.init(
  {
    body: DataTypes.STRING,
    createdAt: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "Comment",
  }
);

module.exports = Comment;
