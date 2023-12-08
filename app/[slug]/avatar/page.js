import TabAvatar from 'lib/components/TabAvatar';
import { getAvatar } from 'lib/db';

export default async function Tab({ params: { slug } }) {
  // Request data
  const result = await getAvatar(slug);
  console.log('\n>>>>>>>>\n', 'get avatar', '\n', result, '\n<<<<<<<<\n');
  let avatar = '';

  // Success
  if (result.status == 'success') {
    avatar = result.data.avatar;
  }

  return <TabAvatar currentAvatar={avatar} user_id={slug} />;
}
