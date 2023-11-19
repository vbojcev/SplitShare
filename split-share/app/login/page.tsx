'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession, getProviders } from 'next-auth/react';
import Button from '@/components/Button';

const page = () => {
  //pull user session:
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      //set type to any until I figure it out properly
      const res: any = await getProviders();
      setProviders(res);
    })();

    // If user is logged in, shouldn't be able to view login page.
    if (session?.user) {
      router.push('/');
    }
  }, [session?.user]);

  return (
    <div className="relative flex place-items-center">
      {!session?.user ? (
        <div className="relative flex w-full flex-col place-items-center gap-2">
          <>
            {/*Map each provider to a button*/}
            {providers ? (
              Object.values(providers).map(
                (
                  provider: any /*Disable type checking until I figure out nextauth+typescript*/
                ) => (
                  <Button
                    action={() => signIn(provider.id)}
                    text={`Sign in with ${provider.name}`}
                    key={provider.name}
                  ></Button>
                )
              )
            ) : (
              <></>
            )}
          </>
        </div>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
};

export default page;
