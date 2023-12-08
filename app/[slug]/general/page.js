import { TabPanelTitle } from 'lib/components/Misc';
import { getProfile } from 'lib/db';
import TabGeneral from '@/lib/components/TabGeneral';

export default async function Page({ params: { slug } }) {
  // Request data
  const result = await getProfile(slug);

  // Hanlde error
  if (result.status == 'error') return <h1>{result.message}</h1>;

  return (
    <div className="space-y-6">
      <TabPanelTitle title="General" description="General settings for your profile." />
      <TabGeneral data={result.data} />
    </div>
  );
}

export const runtime = 'edge';
