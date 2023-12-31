import process from 'node:process';
import dotenv from 'dotenv';
// import bcrypt from 'bcrypt';

dotenv.config({ path: '.env.local' });

const PORT = 33001;
const URI_MAPPING = {
  development: process.env.MONGODB_PART4_CLUSTER0_URI,
  testing: process.env.TEST_MONGODB_URI,
};

function determineURI() {
  return URI_MAPPING[process.env.NODE_ENV];
}

function getJWTSecret() {
  // uncomment the following two lines to generate a hashed
  //  secret based on your SUPER_ULTRA_SECRET in .env.local
  // Use the resulting hash as a value for your SUPER_ULTRA_SECRET_HASHED
  //  and comment the two lines below again
  // const hashedSecret = await bcrypt.hash(process.env.SUPER_ULTRA_SECRET, 10);
  // console.log(hashedSecret);
  return process.env.SUPER_ULTRA_SECRET_HASHED;
}

function getSampleBearerToken() {
  return process.env.SAMPLE_BEARER_AUTH;
}
export default { PORT, determineURI, getJWTSecret, getSampleBearerToken };
