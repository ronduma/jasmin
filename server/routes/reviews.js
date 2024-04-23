const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const reviews = require("../data/reviews");
const users = require("../data/users");
router
  .get("/:id", async(req, res) => {
  try{
    console.log('bruh');
    const userObject = await users.getUserById(req.params.id);
    const post = await reviews.getAllReviews(req.params.id);
    console.log(userObject);
    return res.status(200).json(post);
  }
  catch(error){
    console.log(error);
  }
})
.post("/:id", async (req, res) => {
  const id = req.params.id;
  const review = req.body;
  try{
    if(!review_post.reviewTitle || !review_post.reviewerName || !review_post.review || !review_post.rating){
      throw 'missing req.body inputs';
    }
  }
  catch(e){
    return res.status(400).json({error: e});
  }
  try{
    const postReview = await reviews.createReview(
      id, 
      review.reviewTitle,
      review.reviewerName, 
      review, 
      review.rating);
    return res.status(200).json(postReview);
  }
  catch(e){
    return res.status(404).json({error: e});
  }
});

module.exports = router;
