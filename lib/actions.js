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
export async function updateProfileAction(formData) {
  const { id, name, user_id } = Object.fromEntries(formData.entries());

  console.log('\n>>>>>>>>>>Action data\n', Object.fromEntries(formData.entries()), '\n<<<<<<<<<<\n');

  const result = await updateProfile({ id, name, user_id });

  console.log('\n>>>>>>>>>>Action result\n', result, '\n<<<<<<<<<<\n');

  // Handle error
  if (result.status == 'error') {
    revalidateTag('updateProfile');
    return {
      message: result.message,
    };
  }

  // Success
  revalidateTag('getProfile');
  return {
    message: result.message,
  };
}
