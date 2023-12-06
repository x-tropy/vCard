import { TabPanelTitle } from 'lib/components/Misc';
import { getProfile } from 'lib/db';
import TabGeneral from '@/lib/components/TabGeneral';

export default async function Page({ params: { slug } }) {
  // Request data
  const result = await getProfile(slug);

  // Hanlde error
  if (result.status == 'error') return <h1>{result.message}</h1>;

  const { id, user_id, created_at, name } = result.data;

  return (
    <div className="space-y-6">
      <TabPanelTitle title="General" description="General settings for your profile." />
      <TabGeneral id={id} user_id={user_id} created_at={created_at} name={name} />
    </div>
  );
}
