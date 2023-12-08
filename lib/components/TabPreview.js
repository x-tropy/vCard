'use client';
import { ReloadButton } from 'lib/components/MiscClient';
import { capitalize } from 'lib/utils';

export default function TabPrevew(data) {
  const ListItems = Object.entries(data).map((entry, index) => (
    <div className="flex flex-row pb-4 justify-between border-b" key={index}>
      <div className="text-sm w-[170px]">{capitalize(entry[0].split('_').join(' '))}</div>
      <div className="text-sm w-full text-muted-foreground">{entry[1]}</div>
    </div>
  ));
  return (
    <div className="space-y-4">
      <ReloadButton />
      {ListItems}
    </div>
  );
}
