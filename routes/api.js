var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();
var Likes = require('../models/likes');
var mongoose = require('mongoose');
var Likes = require('../models/likes');
var Beer = require('../models/beer');


/* GET other user's profile page. */
router.get('/users/:id', function(req, res, next) {
  var userId = req.params.id;
  User.find({ "_id": userId }, function(error, data) {
    res.json(data[0]);
  })
});

//Get all beers from external API
router.get('/beers', function(req,res,next){
  Beer.find({}, function(err, data){
    res.json(data)
  })
});

/* Post Likes to our DB */
router.post('/likes', function(req, res, next) {
  var userId = req.user._id;
  var beerId = req.body.id;
  var review = req.body.review;
  var likes = new Likes({ userId: userId, beerId: beerId, review:review });

  Likes.find({ "userId": userId, "beerId": beerId }, function(error, data) {
    console.log(data);
    console.log(error);
    if (data.length === 0) {
     likes.save(likes, function(error) {
       if (error) {
        res.send(error);
       } else {
        console.log(likes);
        res.json(likes);
      }
    })
    }else {
       console.log('NO!');
    }
  })
});




//Get Individual Beers from API
router.get('/beers/:_id', function(req, res, next) {
  var beerId = req.params._id;
  Beer.findById(beerId,function(err, data){
    res.json(data)
  });
});

//Get Individual User Likes
router.get('/me', function(req, res, next) {
  var userId = req.user._id;

  Likes.find({ "userId": userId }, function(error, data) {

  res.json(data);
})
});

//Get Who Likes Individual Beer
router.get('/likes/beers/:id', function(req, res, next) {
  var beerId = req.params.id;
  Likes.find({"beerId": beerId}, function(err, data) {
    res.json(data);
  })
})

//Get likes of individual user
router.get('/likes/users/:id', function(req, res, next) {
  var userId = req.params.id;
  Likes.find({"userId": userId}, function(err, data) {
    res.json(data);
  })
})

//Get likes of individual beers

router.get('/likes', function(req,res,next){
  var beerId = req.params.id;
  Likes.find({}, function(err, data) {
    res.json(data);
  })
})

module.exports = router;
