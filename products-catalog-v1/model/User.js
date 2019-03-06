
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
    }
});

module.exports = mongoose.model('User', UserSchema);