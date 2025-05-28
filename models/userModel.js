const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sport: {
        type: String,
        enum: ['cricket', 'volleyball', 'football', 'badminton', 'tennis'],
        required: true
    }
});
const User = mongoose.model('User', userSchema, 'regischema');
module.exports = User;
