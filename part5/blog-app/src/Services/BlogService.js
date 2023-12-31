import axios from 'axios';
import config from '../Config/config';

async function getOne(blog_id) {
  try {
    const response = await axios.get(`${config.baseURL}/api/blogs/${blog_id}`);
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

async function getAll(JWT_TOKEN) {
  try {
    const response = await axios.get(`${config.baseURL}/api/blogs/`, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
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

async function addOne(JWT_TOKEN, new_blog) {
  try {
    const response = await axios.post(
      `${config.baseURL}/api/blogs/`,
      new_blog,
      {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      }
    );
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

async function updateOne(JWT_TOKEN, updated_info) {
  const blog_id = updated_info.id;
  try {
    const response = await axios.put(
      `${config.baseURL}/api/blogs/${blog_id}`,
      updated_info,
      {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      }
    );

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

async function deleteOne(JWT_TOKEN, blog_id) {
  try {
    const response = await axios.delete(
      `${config.baseURL}/api/blogs/${blog_id}`,
      {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      }
    );
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

export default { getOne, getAll, addOne, updateOne, deleteOne };
