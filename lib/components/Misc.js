// Miscellaneous components
import Link from 'next/link';

export function NavItem({ title, href }) {
  return (
    <Link href={href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
      {title}
    </Link>
  );
}
