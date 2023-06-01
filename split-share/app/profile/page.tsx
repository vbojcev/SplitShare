'use client';
import { useSession, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const page = () => {
  const [providers, setProviders] = useState(null);

  //pull user session:
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      setProviders(res);

      //if user not logged in, redirect to home
      if (!session?.user) {
        router.push('/');
      }
    })();
  }, []);

  return (
    <>
      {session?.user ? (
        <div className="relative flex place-items-center">
          <p>{session?.user ? session.user.name : 'ERROR'}'s profile.</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default page;
