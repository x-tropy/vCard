import { dbApiUrl } from 'lib/utils';

// Note: Every data API resturns a result object:
// {
//   status: 'success',
//   message: '...',
//   data: {
//     id: ...,
//   }
// }

const getProfile = async (user_id) => {
  const response = await fetch(`${dbApiUrl}profile/${user_id}`, {
    next: {
      tags: ['getProfile'],
    },
  });
  const result = await response.json();
  return result;
};

const updateProfile = async (data) => {
  console.log('\n>>>>>>>>>>db', data, '<<<<<<<<<<\n');
  console.log('\n>>>>>>>>>>db', JSON.stringify(data), '<<<<<<<<<<\n');
  const response = await fetch(`${dbApiUrl}profile`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export { getProfile, updateProfile };
