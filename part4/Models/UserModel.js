import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
    delete returnedObj.password;
  },
});

const UserModel = mongoose.model('User', userSchema);

export { UserModel };
