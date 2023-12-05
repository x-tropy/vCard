import { getProfile } from 'lib/db';
import ProfileEditor from 'lib/components/ProfileEditor';

const App = async ({ params: { slug } }) => {
  // Request data
  const result = await getProfile(slug);

  // Hanlde error
  if (result.status == 'error') return <h1>{result.message}</h1>;

  return <ProfileEditor data={result.data} />;
};

export default App;
