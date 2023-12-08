'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from 'lib/components/ui/button';
import { useFormStatus } from 'react-dom';
import { RefreshCw } from 'lucide-react';
import { cn } from 'lib/utils';
import { useState } from 'react';

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

export function ReloadButton() {
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);

  function handleRefresh() {
    setRefresh(true);
    // Animate for 1 second
    setTimeout(() => setRefresh(false), 1000);
    router.refresh();
  }
  return (
    <Button variant="outline" size="lg" className="w-full" onClick={handleRefresh}>
      <RefreshCw className={cn('mr-2 h-4 w-4', refresh && 'animate-spin')} />
      Refresh to see your latest changes
    </Button>
  );
}
