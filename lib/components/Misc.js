// Miscellaneous components
import Link from 'next/link';
import { Separator } from 'lib/components/ui/separator';

export function NavItem({ title, href }) {
  return (
    <Link href={href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
      {title}
    </Link>
  );
}

export function TabPanelTitle({ title, description }) {
  return (
    <>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Separator />
    </>
  );
}

export function Feedback({ status, message, url }) {
  return (
    <div>
      <h1>{status}</h1>
      <p>{message}</p>
      <Link href={`/${url}`}>Go to preview</Link>
    </div>
  );
}
