const mongoose = require('mongoose');

const Spell = mongoose.model('Spell', {
    Name: String,
    Incantation:String,
    Type: String,
    Effect: String,
    Light: String
})


module.exports = Spell