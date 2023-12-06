'use client';
import { Button } from 'lib/components/ui/button';
import { updateProfileAction } from 'lib/actions';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
  status: 'idle',
  message: '',
  url: '',
};

export default function ProfileEditor({ data }) {
  const [state, wrappedAction] = useFormState(updateProfileAction, initialState);

  return (
    <div>
      <Form initialValues={data} action={wrappedAction} />
      <Feedback state={state} />
    </div>
  );
}

// Note: useFormStatus must be used inside a form
// https://react.dev/reference/react-dom/hooks/useFormStatus#caveats
function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button variant="secondary" type="submit" disabled={pending}>
      {pending ? 'Updating...' : 'Update'}
    </Button>
  );
}

function Feedback({ state }) {
  const { status, message, url } = state;

  if (status == 'error') {
    return <h1>{message}</h1>;
  }

  if (status == 'success') {
    return (
      <div>
        <h1>Success</h1>
        <p>Your profile has been updated.</p>
        <Link href={url}>View your profile</Link>
      </div>
    );
  }

  return null;
}

function Form({ action, initialValues }) {
  const { id, user_id, name, created_at } = initialValues;

  return (
    <form action={action}>
      <h1 className="text-3xl font-bold underline">Profiles</h1>
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
  );
}
