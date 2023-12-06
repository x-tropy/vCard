import '../styles/globals.css';

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
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>{children}</body>
    </html>
  );
}
