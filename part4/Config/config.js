import process from 'node:process';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const PORT = 33001;
const URI_MAPPING = {
  development: process.env.MONGODB_PART4_CLUSTER0_URI,
  testing: process.env.TEST_MONGODB_URI,
};

function determineURI() {
  return URI_MAPPING[process.env.NODE_ENV];
}

export default { PORT, determineURI };
