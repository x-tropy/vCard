'use client';
import { useRouter } from 'next/navigation';
import { Button } from 'lib/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { cn } from 'lib/utils';
import { useState } from 'react';
import { capitalize } from 'lib/utils';

export default function TabPrevew(data) {
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  function handleRefresh() {
    setRefresh(true);
    // Animate for 1 second
    setTimeout(() => setRefresh(false), 1000);
    router.refresh();
  }

  const ListItems = Object.entries(data).map((entry, index) => (
    <div className="flex flex-row pb-4 justify-between border-b" key={index}>
      <div className="text-sm w-[170px]">{capitalize(entry[0].split('_').join(' '))}</div>
      <div className="text-sm w-full text-muted-foreground">{entry[1]}</div>
    </div>
  ));
  return (
    <div className="space-y-4">
      <Button variant="outline" size="lg" className="w-full" onClick={handleRefresh}>
        <RefreshCw className={cn('mr-2 h-4 w-4', refresh && 'animate-spin')} />
        Refresh to see your latest changes
      </Button>
      {ListItems}
    </div>
  );
}
