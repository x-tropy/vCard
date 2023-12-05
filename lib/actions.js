/* 
Action definition:
1. Every action ends with a 'Action' suffix.
2. Every action logs the data it receives.
3. Every action returns a result object after it completes.
4. Every action revalidates 2 caches.

*/

'use server';
import { updateProfile } from 'lib/db';
import { revalidateTag } from 'next/cache';

// Update profile
export async function updateProfileAction(prevState, formData) {
  const data = Object.fromEntries(formData.entries());
  const { id, name, user_id, old_user_id } = data;

  console.log('\n>>>>>>>>\n', 'Action data', '\n', data, '\n<<<<<<<<\n');

  const result = await updateProfile({ id, name, user_id });

  console.log('\n>>>>>>>>\n', 'Action result', '\n', result, '\n<<<<<<<<\n');

  // Handle error
  if (result.status == 'error') {
    // Clear cache of previous failed response
    revalidateTag('updateProfile');
  }

  // Clear cache if user_id stays the same
  if (old_user_id == user_id) {
    revalidateTag('getProfile');
  }

  return {
    ...result,
    url: `/${user_id}`,
  };
}
