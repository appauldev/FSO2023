import mongoose from 'mongoose';
import PersonModel from './Models/Person.js';
import dotenv from 'dotenv';
import process from 'node:process';

if (process.argv.length < 3) {
  console.log('Password missing! Kindly provide a password to access MongoDB.');
  process.exit(1);
}

// to simplify things, we will not be validating the actual password for the db
// since we are not uploading the env.local file
if (process.argv[2] !== 'password') {
  console.log('Wrong password. Please try again.');
  process.exit(1);
}

if (process.argv.length === 3) {
  // prep the connection string for MongoDB
  dotenv.config({ path: '.env.local' });
  const URI = process.env.MONGODB_PART3_CLUSTER0_URI;
  try {
    mongoose.connect(URI);
    const response = await PersonModel.find({});

    console.log('***PHONEBOOK ENTRIES***');
    console.log('Name\tNumber');
    response.forEach((person) => {
      console.log(`${person.name}\t${person.number}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

const nameOrNumUndefined =
  process.argv[3] === undefined || process.argv[4] === undefined;

if (nameOrNumUndefined) {
  console.log(
    'Incomplete arguments. Kindly supply both name and number for the user'
  );
  process.exit(1);
}

// Add new contact
// prep the connection string for MongoDB
dotenv.config({ path: '.env.local' });
const URI = process.env.MONGODB_PART3_CLUSTER0_URI;

// new person data
const name = process.argv[3];
const number = process.argv[4];

export async function addSingleContact() {
  try {
    mongoose.connect(URI);
    const response = await PersonModel.create({ name, number });
    console.log(`Added ${response.name} (${response.number}) to phonebook.`);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
}

addSingleContact();
