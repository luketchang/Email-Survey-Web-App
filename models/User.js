const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleID: String,
  credits: {type: Number, default: 0}
});

//creates users collection if not already existant
mongoose.model('users', userSchema);
