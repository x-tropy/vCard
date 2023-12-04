'use server';
import { updateProfile } from 'lib/db';
import { revalidateTag } from 'next/cache';

// Example
export async function greet(prevState, formData) {
  console.log('\n>>>>>>>>>>', formData.get('username'), '<<<<<<<<<<\n');
  return {
    message: `Hello ${formData.get('username')}!`,
  };
}

// Update profile
export async function updateProfileAction(formData) {
  const { id, name, user_id } = Object.fromEntries(formData.entries());
  console.log('\n>>>>>>>>>>', id, name, user_id, '<<<<<<<<<<\n');
  const result = await updateProfile({ id, name, user_id });
  console.log('\n>>>>>>>>>>', result, '<<<<<<<<<<\n');

  // Handle error
  if (result.status == 'error') {
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
