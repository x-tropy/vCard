/*
Note: 
1. Every API should return a result object
2. Only 'data' property is optional.
3. Some may include 'meta' property, for rendering the form.
{
  status: 'success',
  message: '...',
  data: {
    id: ...,
  }
}
*/

import { DATABASE_API_URL } from 'lib/utils';

const getProfile = async (user_id) => {
  const response = await fetch(`${DATABASE_API_URL}profile/${user_id}`, {
    next: {
      tags: ['getProfile'],
    },
    cache: 'no-store',
  });
  const result = await response.json();
  console.log('\n>>>>>>>>\n', 'db.js:GET:Profile', '\n', result, '\n<<<<<<<<\n');
  return result;
};

const updateProfile = async (data) => {
  console.log('\n>>>>>>>>\n', 'db.js:POST:Profile', '\n', data, '\n<<<<<<<<\n');
  const response = await fetch(`${DATABASE_API_URL}profile`, {
    method: 'POST',
    body: JSON.stringify(data),
    next: {
      tags: ['updateProfile'],
    },
  });
  const result = await response.json();

  return result;
};

const getDemoUser = async () => {
  const response = await fetch(`${DATABASE_API_URL}demouser`, {
    cache: 'no-store',
  });
  const result = await response.json();
  return result.user_id;
};

const getAvatar = async (user_id) => {
  const response = await fetch(`${DATABASE_API_URL}avatar/${user_id}`, {
    cache: 'no-store',
  });
  const result = await response.json();
  // console.log('\n>>>>>>>>\n', 'db.js:GET:Avatar', '\n', result, '\n<<<<<<<<\n');
  return result;
};

const updateAvatar = async (data) => {
  const response = await fetch(`${DATABASE_API_URL}avatar`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log('\n>>>>>>>>\n', 'POST result', '\n', result, '\n<<<<<<<<\n');

  return result;
};

export { getProfile, updateProfile, getDemoUser, getAvatar, updateAvatar };
