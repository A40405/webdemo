import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 6000000,
});

const headers = {
  'Content-Type': 'multipart/form-data',
};

const sendGet = (path, options = { headers: headers }) => (
  api.get(path, options)
    .then((response) => {
      const { code } = response.data || {};
      if (code === 503) {
        throw response;
      } else {
        return response;
      }
    })
);

const sendPost = (path, params, options = { headers: headers }) => (
  api.post(path, params, options)
    .then((res) => {
      const { code } = res.data || {};
      if (code === 503) {
        throw res;
      } else {
        return res;
      }
    })
);

const sendPut = (path, params, options = { headers: headers }) => (
  api.put(path, params, options)
    .then((res) => {
      const { code } = res.data || {};
      if (code === 503) {
        throw res;
      } else {
        return res;
      }
    })
);

const generateGet = (path, params = null) => {
  const options = {
    headers: {
      ...headers,
    },
    params,
  };
  return sendGet(path, options);
};

const generatePost = (path, params) => {
  const formData = new FormData();
  for (const key in params) {
    formData.append(key, params[key]);
  }

  const options = {
    headers: {
      ...headers,
    },
  };
  return sendPost(path, formData, options);
};
const generatePut = (path, params) => {
  const formData = new FormData();
  for (const key in params) {
    formData.append(key, params[key]);
  }

  const options = {
    headers: {
      ...headers,
    },
  };
  return sendPut(path, formData, options);
};

export const createFood = params => generatePost('/post_foods_create', params);

export const createCookingRecord = params => generatePost('/post_cooking_records', params);

export const updateFood = (food_id, params) => generatePut(`/put_foods/${food_id}`, params);

export const updateCookingRecord = (record_id, params) =>  generatePut(`/put_cooking_records/${record_id}`, params);



export const getAllFood = async () => {
  try {
    const response = await generateGet('/get_all_foods');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    throw error;
  }
};

export const getFood = async (foodId) => {
  try {
    const response = await generateGet(`/get_foods/${foodId}`);
      return response.data;
  } catch (error) {
      console.error(`Failed to fetch food with ID ${foodId}:`, error);
    throw error;
  }
};

export const getCookingRecords = async (foodId) => {
  try {
    const response = await generateGet(`/get_cooking_records/${foodId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch cooking records:', error);
    throw error;
  }
};


