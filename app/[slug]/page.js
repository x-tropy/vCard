import { getProfile } from 'lib/db';
import { updateProfileAction } from 'lib/actions';

const App = async ({ params: { slug } }) => {
  // Make a request
  const result = await getProfile(slug);

  // Hanlde error
  if (result.status == 'error') return <h1>{result.message}</h1>;

  // Success
  const { id, user_id, name, created_at } = result.data;

  return (
    <div>
      <form action={updateProfileAction}>
        <h1>Profile</h1>
        <p>User join in vCard on: {created_at}</p>
        <label htmlFor="name">Display name</label>
        <input type="hidden" name="id" readOnly value={id} />
        <input name="name" defaultValue={name} type="text" />
        <label htmlFor="user_id">User ID</label>
        <input name="user_id" defaultValue={user_id} type="text" />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default App;
