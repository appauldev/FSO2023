import axios from 'axios';

async function login(username, password) {
  try {
    const response = await axios.post('http://localhost:33001/api/login', {
      username,
      password,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    if (error.response) {
      //   console.log(error.response.status);
      //   console.log(error.response.data);
      return {
        status: error.response.status,
      };
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('ERROR', error.message);
    }
    console.log(error.config);
  }
}

function saveLoginToLocalStorage(response) {
  const user_info = response.data.user_info;
  window.localStorage.setItem('username', user_info.username);
  window.localStorage.setItem('name', user_info.name);
  window.localStorage.setItem('user_id', user_info.id);
  window.localStorage.setItem('JWT_TOKEN', response.data.JWT_TOKEN);
}

export default { login, saveLoginToLocalStorage };
