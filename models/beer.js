var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var Beers = new Schema({
        "_id":Number,
        "brewery_id": Number,
        "name": String,
        "cat_id": Number,
        "style_id": Number,
        "abv": Number,
        "ibu": Number,
        "srm": Number,
        "upc": Number,
        "descript": String,
        "last_mod": Date,
    });


    module.exports = mongoose.model('Beers', Beers);