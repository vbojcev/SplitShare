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
    <nav className="z-10 flex w-full flex-col justify-center px-4 py-2 font-mono text-sm lg:flex-row lg:border-b-2 lg:bg-zinc-800 lg:px-24 lg:py-4">
      <div className="flex w-full max-w-7xl flex-col items-center justify-between lg:flex-row ">
        <Link
          href="/"
          className="flex w-auto justify-center text-4xl font-bold"
        >
          SplitShare
        </Link>
        <div className="relative  z-10 w-full max-w-lg items-center align-middle font-mono text-sm lg:flex lg:justify-end">
          {/*{session?.user ? (
          <HeaderElement text={'Profile'} route={'/profile'} />
        ) : (
          <></>
        )}*/}
          {/*If user logged in and has profile picture, display it. Otherwise, placeholder. */}
          {session?.user ? (
            <div className="relative flex justify-center">
              <Link
                href={'/profile'}
                className={
                  'relative flex w-fit flex-row rounded-full border-2 border-black align-middle dark:border-gray-300'
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
                <h1 className="mx-2 lg:hidden">{session.user.name}</h1>
              </Link>
            </div>
          ) : (
            <></>
          )}
          <HeaderElement text={'Browse Workouts'} route={'/browse'} />

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
              {providers ? (
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
                )
              ) : (
                <button
                  type="button"
                  className="static my-1 flex w-full justify-center rounded-xl border-2 border-black bg-gray-200 p-4 dark:border-gray-300 dark:bg-slate-600 dark:from-inherit lg:mx-2 lg:w-auto"
                >
                  Sign In
                </button>
              )}
            </>
          )}
        </div>
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
