import { getProfile } from 'lib/db';
import { TabPanelTitle } from 'lib/components/Misc';
import TabPreview from 'lib/components/TabPreview';

const App = async ({ params: { slug } }) => {
  // Request data
  const result = await getProfile(slug);

  // Hanlde error
  if (result.status == 'error') return <h1>{result.message}</h1>;

  const {
    user_id,
    name,
    birth_date,
    bio,
    location_country,
    working_status,
    linkedin_user_id,
    github_user_id,
    twitter_user_id,
    instagram_user_id,
  } = result.data;
  return (
    <div className="space-y-6">
      <TabPanelTitle title="Preview" description="This is how others will see you on the site." />
      <TabPreview
        user_id={user_id}
        name={name}
        birth_date={birth_date}
        bio={bio}
        location_country={location_country}
        working_status={working_status}
        linkedin_user_id={linkedin_user_id}
        github_user_id={github_user_id}
        twitter_user_id={twitter_user_id}
        instagram_user_id={instagram_user_id}
      />
    </div>
  );
};

export default App;

export const runtime = 'edge';
