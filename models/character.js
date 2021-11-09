const mongoose = require('mongoose');

const Character = mongoose.model('Character', {
    Id: Number,
    Name: String,
    Gender:String,
    Job: String,
    House:String,
    Wand:String,
    Patronus: String,
    Species: String,
    Blood_status: String,
    Eye_colour:String,
    Loyalty: String,
    Skills: String,
    Birth: String,
    Death: String
})


module.exports = Character