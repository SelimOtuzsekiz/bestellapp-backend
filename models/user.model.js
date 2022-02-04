const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    vorname: {
        type: String,
        default: ''
    },
    nachname: {
        type: String,
        default: ''
    }

});


User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);