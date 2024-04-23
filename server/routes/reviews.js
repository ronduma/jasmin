const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const reviews = require("../data/reviews");
const users = require("../data/users");
router
  .get("/:id", async(req, res) => {
  try{
    const post = await reviews.getAllReviews(req.params.id);
    return res.status(200).json(post);
  }
  catch(error){
    console.log(error);
  }
})
.post("/:id", async (req, res) => {
  const id = req.params.id; // therapistId
  const review_post = req.body; // object => review
  try{
    const postReview = await reviews.createReview(
      id, 
      review_post.reviewTitle,
      review_post.reviewerName, 
      review_post.review, 
      review_post.rating);
    return res.status(200).json(postReview);
  }
  catch(e){
    return res.status(404).json({error: e});
  }
});

module.exports = router;
