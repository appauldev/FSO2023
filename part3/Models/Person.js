import mongoose from 'mongoose';
import { validateNumber } from '../Errors/Validators/NumberValidator.js';

// A Person document will be added to the 'contact_list' collection
const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, 'Name must be at least 3 characters'],
    },
    number: {
      type: String,
      required: true,
      validate: validateNumber(),
    },
  },
  { collection: 'contact_list' }
);

personSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});
const PersonModel = mongoose.model('contact_list', personSchema);

export default PersonModel;
