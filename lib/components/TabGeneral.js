'use client';
import { updateProfileAction } from 'lib/actions';
import { useFormState } from 'react-dom';
import { Feedback, Submit } from 'lib/components/MiscClient';

const initialState = {
  status: 'idle',
  message: '',
  url: '',
};

export default function TabGeneral({ id, user_id, name, created_at }) {
  const [state, wrappedAction] = useFormState(updateProfileAction, initialState);

  return (
    <div>
      <form action={wrappedAction}>
        <h1 className="text-3xl font-bold">Profiles</h1>
        <p>User join in vCard on: {created_at}</p>
        <label htmlFor="name">Display name</label>
        <input name="name" defaultValue={name} type="text" />
        <label htmlFor="user_id">User ID</label>
        <input name="user_id" defaultValue={user_id} type="text" />
        {/* hidden values */}
        <input type="hidden" name="id" readOnly value={id} />
        <input type="hidden" name="old_user_id" readOnly value={user_id} />
        <Submit />
      </form>
      <Feedback state={state} />
    </div>
  );
}
