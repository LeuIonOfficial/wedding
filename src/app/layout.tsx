import './globals.css';
import { Montserrat, Playfair_Display, Dancing_Script } from 'next/font/google';
import { Metadata } from 'next';


const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  variable: '--font-playfair',
  display: 'swap',
});

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'John & Jane Wedding',
  description: 'We are getting married! Join us on our special day.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${playfair.variable} ${dancing.variable} font-sans`}>
          {children}
      </body>
    </html>
  );
}