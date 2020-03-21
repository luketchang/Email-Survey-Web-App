const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  googleID: String
});

//creates users collection if not already existant
mongoose.model('users', userSchema);
