
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');


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

UserSchema.methods.generateJwt = function () {
    var token = jwt.sign({ _id: this.id }, 'shhhhh',{expiresIn:'1m'});
    return token;
}

module.exports = mongoose.model('User', UserSchema);