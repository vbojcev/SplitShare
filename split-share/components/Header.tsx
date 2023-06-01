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
        {/*Note for future self: the button has w-full AND lg:w-auto unlike the HeaderElements because w-auto means different things for buttons vs other things. */}
        {session?.user ? (
          <button
            className="static my-1 flex w-full justify-center rounded-xl border border-b border-gray-300 bg-gray-200 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:mx-2 lg:w-auto"
            type="button"
            /*onClick={signOut}*/
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
                    className="static my-1 flex w-full justify-center rounded-xl border border-b border-gray-300 bg-gray-200 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:mx-2 lg:w-auto"
                  >
                    Sign In
                  </button>
                )
              )}
          </>
        )}
        {/*If user logged in and has profile picture, display it. Otherwise, placeholder. */}
        {session?.user ? (
          <Link href={'/profile'} className={'flex justify-center'}>
            <Image
              src={
                session?.user.image
                  ? String(session?.user.image)
                  : '/images/placeholderImage.svg'
              }
              width={38}
              height={38}
              className={'rounded-full'}
              alt={'profile'}
            />
          </Link>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

const HeaderElement = ({ text, route }: { text: string; route: string }) => {
  return (
    <Link
      href={route}
      className="static my-1 flex w-auto justify-center rounded-xl border border-b border-gray-300 bg-gray-200 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:mx-2"
    >
      {text}
    </Link>
  );
};

export default Header;
