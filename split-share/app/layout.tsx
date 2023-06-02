import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Provider from '@/components/Provider';

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
      <body className={inter.className + 'flex content-center'}>
        <Provider>
          <main className="flex min-h-screen min-w-max flex-col items-center justify-between px-12 py-6 font-mono lg:px-24 lg:py-12">
            {/*Header and Footer are present at all times => render in root layout */}
            <Header />
            {children}
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
}
