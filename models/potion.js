const mongoose = require('mongoose');

const Potion = mongoose.model('Potion', {
    Name: String,
    Gender:String,
    Known_ingredients: String,
    Effect: String,
    Characteristics: String,
    Difficulty_level: String
})


module.exports = Potion