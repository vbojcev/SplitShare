'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Header = () => {
  const [providers, setProviders] = useState(null);

  //pull user session:
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      //set type to any until I figure it out properly
      const res: any = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm lg:flex">
      <Link href="/" className="flex w-auto justify-center text-2xl font-bold">
        SplitShare
      </Link>
      <div className="z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex lg:justify-end">
        <HeaderElement text={'Browse Workouts'} route={'/browse'} />
        {/*{session?.user ? (
          <HeaderElement text={'Profile'} route={'/profile'} />
        ) : (
          <></>
        )}*/}
        {/*If user logged in and has profile picture, display it. Otherwise, placeholder. */}
        {session?.user ? (
          <Link
            href={'/profile'}
            className={
              'flex justify-center rounded-full border-2 border-black dark:border-white'
            }
          >
            <Image
              src={
                session?.user.image
                  ? String(session?.user.image)
                  : '/images/placeholderImage.svg'
              }
              width={40}
              height={40}
              className={'rounded-full dark:border-gray-300'}
              alt={'profile'}
            />
          </Link>
        ) : (
          <></>
        )}
        {/*Note for future self: the button has w-full AND lg:w-auto unlike the HeaderElements because w-auto means different things for buttons vs other things. */}
        {session?.user ? (
          <button
            className="static my-1 flex w-full justify-center rounded-xl border-2 border-black bg-gray-200 p-4 dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2 lg:w-auto"
            type="button"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        ) : (
          <>
            {/*Map all providers each to a button*/}
            {providers &&
              Object.values(providers).map(
                (
                  provider: any /*Disable type checking until I figure out nextauth+typescript*/
                ) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="static my-1 flex w-full justify-center rounded-xl border-2 border-black bg-gray-200 p-4 dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2 lg:w-auto"
                  >
                    Sign In
                  </button>
                )
              )}
          </>
        )}
      </div>
    </nav>
  );
};

const HeaderElement = ({ text, route }: { text: string; route: string }) => {
  return (
    <Link
      href={route}
      className="dark:bg static my-1 flex w-auto justify-center rounded-xl border-2 border-black bg-gray-200 p-4 backdrop-blur-2xl dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2"
    >
      {text}
    </Link>
  );
};

export default Header;
