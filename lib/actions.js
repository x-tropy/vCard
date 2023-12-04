'use server';

// a example action
export async function greet(formData) {
  console.log('\n>>>>>>>>>>', formData.get('username'), '<<<<<<<<<<\n');
  return {
    message: `Hello ${formData.username}!`,
  };
}
