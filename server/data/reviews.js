const { ObjectId, ReturnDocument } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const users_js = require('./users')
const fs = require("fs");
const dayjs = require("dayjs");

const createReview = async (
  uid,
  reviewId, 
  reviewTitle,
  reviewerName, 
  review, 
  rating,
) => {
  // console.log(uid);
  // console.log(reviewId);
  // console.log(reviewTitle);
  // console.log(reviewerName);
  // console.log(review);
  // console.log(rating);

  const userCollection = await users();

  let current_date = new Date();
  let dd = String(current_date.getDate()).padStart(2, '0');
  let mm = String(current_date.getMonth() + 1).padStart(2, '0');
  let yyyy = current_date.getFullYear();
  current_date = mm + '/' + dd + '/' + yyyy;
  console.log(current_date);

  let newReview = {
    _id: reviewId,
    reviewTitle : reviewTitle,
    reviewerName : reviewerName,
    review : review, 
    rating: rating,
    reviewDate: current_date
  }

  const addedReview = await userCollection.updateOne({_id: uid}, {$push: {reviews: newReview}});
  
  // updating overall rating
  const therapist = await users_js.getUserById(uid);
  let therapist_reviews = therapist.reviews;
  let average = 0;
  for(let i = 0; i < therapist_reviews.length; i++){
    average += therapist_reviews[i]['rating'];
  }
  average = average / therapist_reviews.length;
  console.log(average);
  const new_overall_rating = await userCollection.findOneAndUpdate({_id: uid}, {$set: {overallRating: average}}, {returnDocument: 'after'});
  console.log(new_overall_rating);
  return new_overall_rating;
};

const getAllReviews = async (uid) => {
  if(!uid) throw 'Need user Id';
  const currentUser = await users_js.getUserById(uid);
  const userReviews = currentUser.reviews;
  return userReviews;
};

const getReview = async (uid, reviewId) => {
  if(!uid || !reviewId) throw 'Need UserId and ReviewId';
  const currentUser = await users_js.getUserById(uid);
  const listReviews = currentUser.reivews;
  let returnReview = null;
  for(let i = 0; i < listReviews.length; i++){
    if(listReviews[i]._id == reviewId){
      returnReview = listReviews[i];
    }
  }
  return returnReview;
};

const updateReview = async(profileId, reviewId, review) => {
  if(!profileId || !reviewId || !profileId) throw 'Need UserId, ReviewId, and ProfileId';
  const profileUser = await users_js.getUserById(profileId);
  const listReviews = profileUser.reviews;

  let current_date = new Date();
  let dd = String(current_date.getDate()).padStart(2, '0');
  let mm = String(current_date.getMonth() + 1).padStart(2, '0');
  let yyyy = current_date.getFullYear();
  current_date = mm + '/' + dd + '/' + yyyy;

  let updateReview = {
    _id: reviewId,
    reviewTitle : review.reviewTitle,
    reviewerName : review.reviewerName,
    review : review.review, 
    rating: review.rating,
    reviewDate: current_date
  }

  for(let i = 0; i < listReviews.length; i++){
    if(listReviews[i]._id == reviewId){
      listReviews[i] = updateReview;
    }
  }
  const userCollection = await users();
  const updatedUser = await userCollection.updateOne({_id: profileId}, {$set: {reviews: listReviews}})
  // updating overall rating
  let therapist_reviews = profileUser.reviews;
  let average = 0;
  for(let i = 0; i < therapist_reviews.length; i++){
    average += therapist_reviews[i]['rating'];
  }
  average = average / therapist_reviews.length;
  console.log(average);
  
  const new_overall_rating = await userCollection.findOneAndUpdate({_id: profileId}, {$set: {overallRating: average}}, {returnDocument: 'after'});

  // this returns the updated profile's reviews.
  console.log(new_overall_rating);
  return new_overall_rating;
}

module.exports ={
  createReview,
  getAllReviews,
  getReview,
  updateReview
}