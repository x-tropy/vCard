'use client';
import Link from 'next/link';
import { Button } from 'lib/components/ui/button';
import { useFormStatus } from 'react-dom';

// Note: useFormStatus must be used inside a form
// https://react.dev/reference/react-dom/hooks/useFormStatus#caveats
export function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button variant="secondary" type="submit" disabled={pending}>
      {pending ? 'Updating...' : 'Update'}
    </Button>
  );
}
