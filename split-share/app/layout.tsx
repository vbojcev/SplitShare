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
          <main className="flex min-h-screen flex-col items-center justify-between font-mono ">
            {/*Header and Footer are present at all times => render in root layout */}
            <Header />
            {/*<div className="mb-24"></div>*/}
            <div className="flex w-full grow flex-col items-center justify-start bg-zinc-900 px-4 pb-8 pt-4 align-top lg:max-w-7xl lg:border-l lg:border-r lg:pt-32">
              {children}
            </div>
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
}
