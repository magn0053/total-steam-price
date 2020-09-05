const
    mongoose = require('mongoose')
    , bcrypt = require('bcrypt-nodejs')
    ;

// Model for adding a new user
const userModel = mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true }
})

// hash the password
userModel.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userModel.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userModel);