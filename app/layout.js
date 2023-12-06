import '../styles/globals.css';
import Link from 'next/link';
import Avatar from 'lib/components/Avatar';
import { NavItem } from 'lib/components/Misc';
import Image from 'next/image';

// Optimize font display
import { Inter as FontSans } from 'next/font/google';

import { cn } from 'lib/utils';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'vCard',
  description: 'A blocklet app',
};

// Note: suppress HydrationWarning
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto py-3 max-w-7xl justify-between flex flex-row items-center">
            <div className="flex flex-row space-x-6 lg:space-x-8 items-center">
              <Link href="/">
                <Image src="/logo_vcard.png" alt="vCard logo" className="h-7" />
              </Link>
              <NavItem title="How it works" href="/" />
              <NavItem title="Play with demo" href="/demo" />
            </div>
            <Avatar size="sm" shape="circle" />
          </div>
        </header>
        <main className="container mx-auto max-w-7xl">{children}</main>
      </body>
    </html>
  );
}
