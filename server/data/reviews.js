const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const users_js = require('./users')
const fs = require("fs");
const dayjs = require("dayjs");

const createReview = async (
  uid, 
  reviewTitle,
  reviewerName, 
  review, 
  rating,
) => {
  // console.log(uid);
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
    _id: uid,
    reviewTitle : reviewTitle,
    reviewerName : reviewerName,
    review : review, 
    rating: rating,
    reviewDate: current_date
  }

  console.log('ass3')
  const addedReview = await userCollection.updateOne({_id: uid}, {$push: {reviews: [newReview]}});
  
  // updating overall rating
  const therapist = await users_js.getUserById(uid);
  let therapist_reviews = therapist.reviews;
  let average = 0;
  for(let i = 0; i < therapist_reviews.length; i++){
    average += therapist_reviews[i][0]['rating'];
  }
  average = average / therapist_reviews.length;
  console.log(average);
  const new_overall_rating = await userCollection.updateOne({_id: uid}, {$set: {overallRating: average}});
  return newReview;
};

const getAllReviews = async (uid) => {
  if(!uid) throw 'Need user Id';
  const currentUser = await users_js.getUserById(uid);
  const userReviews = currentUser.reviews;
  return userReviews;
};

module.exports ={
  createReview,
  getAllReviews,
}