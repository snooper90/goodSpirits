$(document).ready(function(){
getLikes();
});

function getLikes(){
  //decide where to send the ajax call
  var url = ""
  var urlPathName = window.location.pathname.split('/');
  urlPathName = urlPathName[urlPathName.length - 1];
  if (urlPathName == "profile"){
    url = '/api/me';
  }else{
    url = '/api/likes/users/' + urlPathName;
  }
  //send ajax call
  $.ajax({
  url: url,
  method:'GET',
  dataType:'JSON'
  })
  .done(function(data, textStatus){
    likeList = data;
    getBeers(data)
  })
  .fail(function(data, textStatus){
    //need to add error message to page
    console.log("ERROR getting likes. status: " + textStatus);
  });
}

function getBeers(arrLikes){
  // counter to get the likes in the correct order
  var asyncLikeCounter = 0;
  for (var i = 0; i < arrLikes.length; i++) {
    $.ajax({
    url:'/api/beers/' + arrLikes[i].beerId,
    method:'GET',
    dataType:'JSON'
    })
    .done(function(data, textStatus){
      // list like
      listLikes(arrLikes[asyncLikeCounter], data);
      //incriment the array of likes by one
      asyncLikeCounter ++;
    })
    .fail(function(data, textStatus){
      console.log("ERROR getting beers. status: " + textStatus);
    });
   }
}

function listLikes(like, beerList){
  like = like.review;
  //format each like to have quotations if not an empty string
  if (like) {
    like = '"' + like + '"';
  }
  //append the HTML of each like
  $('#beerlikes').append('<div class="well well-sm col-sm-3"><a href="/beers/'+beerList._id + '">' + beerList.name + '</a><p>'+ like +'</p></div>');
};
