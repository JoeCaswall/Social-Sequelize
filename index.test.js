const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require("./db/connection.js");
const users = require("./seed/users.json");
const profiles = require("./seed/profiles.json");
const posts = require("./seed/posts.json");
const comments = require("./seed/comments.json");
const likes = require("./seed/likes.json");

describe("Social Sequelzie Test", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the test suite is run
    await db.sync({ force: true });
  });

  // Write your tests here

  test("can create a User", async () => {
    await User.bulkCreate(users);
    const foundUser = await User.findByPk(1);
    expect(foundUser).toEqual(expect.objectContaining(users[0]));
  });

  test("can create a Profile", async () => {
    await Profile.bulkCreate(profiles);
    const foundProfile = await Profile.findByPk(1);
    expect(foundProfile).toEqual(expect.objectContaining(profiles[0]));
  });

  test("can create a Post", async () => {
    await Post.bulkCreate(posts);
    const foundPost = await Post.findByPk(1);
    expect(foundPost).toEqual(expect.objectContaining(posts[0]));
  });

  test("can create a Like", async () => {
    await Like.bulkCreate(likes);
    const foundLike = await Like.findByPk(1);
    expect(foundLike).toEqual(expect.objectContaining(likes[0]));
  });

  test("can create a Comment", async () => {
    await Comment.bulkCreate(comments);
    const foundComment = await Comment.findByPk(1);
    expect(foundComment).toEqual(expect.objectContaining(comments[0]));
  });

  test("User can have only one profile", async () => {
    const testUser = await User.create(users[0]);
    const testProfile = await Profile.create(profiles[0]);
    const testProfile2 = await Profile.create(profiles[1]);

    await testUser.setProfile(testProfile);
    await testUser.setProfile(testProfile2);

    const associatedProfile = await testUser.getProfile();
    console.log(associatedProfile);
    expect(associatedProfile instanceof Profile).toBe(true); //this would be false if both profiles had been included as associatedProfile would be an array not an object
  });

  test("profile can only have one user", async () => {
    const testProfile = await Profile.create(profiles[0]);
    const testUser = await User.create(users[0]);
    const testUser2 = await User.create(users[1]);

    await testProfile.setUser(testUser);
    await testProfile.setUser(testUser2);

    const associatedUser = await testProfile.getUser();
    expect(associatedUser instanceof User).toBe(true); //this would be false if both users had been included as associatedUser would be an array not an object
  });

  test("user can have many posts", async () => {
    const testUser = await User.create(users[0]);
    const testPost1 = await Post.create(posts[0]);
    const testPost2 = await Post.create(posts[1]);

    await testUser.addPost(testPost1);
    await testUser.addPost(testPost2);

    const associatedPosts = await testUser.getPosts();
    expect(associatedPosts.length).toBe(2);
    expect(associatedPosts[0] instanceof Post).toBe(true);
    expect(associatedPosts[1] instanceof Post).toBe(true);
  });

  test("a post can only have one user", async () => {
    const testPost = await Post.create(posts[0]);
    const testUser1 = await User.create(users[0]);
    const testUser2 = await User.create(users[1]);

    await testPost.setUser(testUser1);
    await testPost.setUser(testUser2);

    const associatedUser = await testPost.getUser();
    expect(associatedUser instanceof User).toBe(true); //this would be false if associatedUser had more than one User instance inside it, as it would be an array not an Object.
  });

  test("post can have many comments", async () => {
    const testPost = await Post.create(posts[0]);
    const testComment1 = await Comment.create(comments[0]);
    const testComment2 = await Comment.create(comments[1]);

    await testPost.addComment(testComment1);
    await testPost.addComment(testComment2);

    const associatedComments = await testPost.getComments();
    expect(associatedComments.length).toBe(2);
    expect(associatedComments[0] instanceof Comment).toBe(true);
    expect(associatedComments[1] instanceof Comment).toBe(true);
  });

  test("a comment can only have one post", async () => {
    const testComment = await Comment.create(comments[0]);
    const testPost1 = await Post.create(posts[0]);
    const testPost2 = await Post.create(posts[1]);

    await testComment.setPost(testPost1);
    await testComment.setPost(testPost2);

    const associatedPost = await testComment.getPost();
    expect(associatedPost instanceof Post).toBe(true); //this would be false if associatedUser had more than one User instance inside it, as it would be an array not an Object.
  });

  test("user can have many likes", async () => {
    const testUser = await User.create(users[0]);
    const testLike1 = await Like.create(likes[0]);
    const testLike2 = await Like.create(likes[1]);

    await testUser.addLike(testLike1);
    await testUser.addLike(testLike2);

    const associatedLikes = await testUser.getLikes();

    expect(associatedLikes.length).toBe(2);
    expect(associatedLikes[0] instanceof Like).toBe(true);
    expect(associatedLikes[1] instanceof Like).toBe(true);
  });

  test("likes can have many users", async () => {
    const testUser1 = await User.create(users[0]);
    const testUser2 = await User.create(users[1]);
    const testLike = await Like.create(likes[0]);

    await testLike.addUser(testUser1);
    await testLike.addUser(testUser2);

    const associatedUsers = await testLike.getUsers();

    expect(associatedUsers.length).toBe(2);
    expect(associatedUsers[0] instanceof User).toBe(true);
    expect(associatedUsers[1] instanceof User).toBe(true);
  });
});
