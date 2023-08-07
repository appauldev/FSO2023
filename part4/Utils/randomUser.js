import { UserModel } from '../Models/UserModel.js';

export async function getRandomUser() {
  try {
    const users = await UserModel.find({});
    const rand_num = Math.floor(Math.random() * users.length);
    console.log(rand_num);
    console.log(users[rand_num]);
    return users[rand_num];
  } catch (error) {
    console.error(error);
  }
}
