import '@/styles/globals.css';

// Optimize font display
import { Inter as FontSans } from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'vCard',
  description: 'A blocklet app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${fontSans.variable}`}>{children}</body>
    </html>
  );
}
