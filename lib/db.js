/*
Note: 
1. Every API should return a result object
2. Only 'data' property is optional.
{
  status: 'success',
  message: '...',
  data: {
    id: ...,
  }
}
*/

import { dbApiUrl } from 'lib/utils';
import { revalidateTag } from 'next/cache';

const getProfile = async (user_id) => {
  // Clear cache when user_id changes
  revalidateTag({ tags: ['getProfile'] });

  const response = await fetch(`${dbApiUrl}profile/${user_id}`, {
    next: {
      tags: ['getProfile'],
    },
  });
  const result = await response.json();
  return result;
};

const updateProfile = async (data) => {
  console.log('\n>>>>>>>>\n', 'updateProfile', '\n', data, '\n<<<<<<<<\n');
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
