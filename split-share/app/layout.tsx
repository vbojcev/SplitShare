import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SplitShare',
  description: 'Create, Share, and Track your Workouts!',
};

//
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between px-24 py-12">
          {/*Header and Footer are present at all times => render in root layout */}
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
