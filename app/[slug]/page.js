import { getProfile } from 'lib/db';
import { TabPanelTitle } from 'lib/components/Misc';
import TabPreview from 'lib/components/TabPreview';

const App = async ({ params: { slug } }) => {
  // Request data
  const result = await getProfile(slug);

  // Hanlde error
  if (result.status == 'error') return <h1>{result.message}</h1>;

  const { name, user_id, created_at } = result.data;

  return (
    <div className="space-y-6">
      <TabPanelTitle title="Preview" description="This is how others will see you on the site." />
      <TabPreview name={name} user_id={user_id} created_at={created_at} />
    </div>
  );
};

export default App;
