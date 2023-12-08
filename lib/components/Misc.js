// Miscellaneous components
import Link from 'next/link';
import { Separator } from 'lib/components/ui/separator';
import { AlertTriangle, Rocket } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from 'lib/components/ui/alert';
import { Button } from 'lib/components/ui/button';

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
  if (status == 'error') {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    );
  }

  if (status == 'success') {
    return (
      <Alert>
        <Rocket className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
        {url && (
          <Link href={`/${url}`} className="absolute right-3 top-5">
            <Button variant="ghost" size="sm">
              Go to preview
            </Button>
          </Link>
        )}
      </Alert>
    );
  }

  return null;
}
