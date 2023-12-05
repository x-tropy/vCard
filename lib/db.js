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
  const response = await fetch(`${dbApiUrl}profile`, {
    method: 'POST',
    body: JSON.stringify(data),
    next: {
      tags: ['updateProfile'],
    },
  });
  const result = await response.json();
  return result;
};

export { getProfile, updateProfile };
