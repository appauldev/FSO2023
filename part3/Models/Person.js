import mongoose from "mongoose";

// A Person document will be added to the 'contact_list' collection
const personSchema = new mongoose.Schema(
  {
    name: String,
    number: String,
  },
  { collection: "contact_list" }
);

personSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});
const PersonModel = mongoose.model("contact_list", personSchema);

export default PersonModel;
