import mongoose, { mongo } from "mongoose";
import PersonModel from "../Models/Person.js";
import dotenv from "dotenv";
import { Error500 } from "../Errors/CustomErrorClasses.js";

// prep the connection string for MongoDB
dotenv.config({ path: ".env.local" });
const URI = process.env.MONGODB_PART3_CLUSTER0_URI;

export async function addOne(personObj) {
  try {
    await mongoose.connect(URI);
    return await PersonModel.create(personObj);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await mongoose.connection.close();
  }
}

export async function deleteOne(id = undefined, name = undefined) {
  try {
    await mongoose.connect(URI);
    if (id) {
      return await PersonModel.findByIdAndDelete(id);
    }
    if (name) {
      return await PersonModel.findOneAndDelete({ name: name });
    }
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await mongoose.connection.close();
  }
}

export async function getAll() {
  try {
    await mongoose.connect(URI);
    return await PersonModel.find({});
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await mongoose.connection.close();
  }
}

export async function getOne(id = undefined, name = undefined) {
  try {
    await mongoose.connect(URI);
    if (id) {
      return await PersonModel.findById(id);
    }
    if (name) {
      return await PersonModel.findOne({ name: name });
    }
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await mongoose.connection.close();
  }
}

export async function updateOne(
  updated_info,
  id = undefined,
  name = undefined
) {
  try {
    await mongoose.connect(URI);
    if (id) {
      return await PersonModel.findByIdAndUpdate(
        id,
        { number: updated_info.number },
        {
          new: true,
        }
      );
    }
    if (name) {
      return await PersonModel.findOne({ name: name });
    }
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await mongoose.connection.close();
  }
}
