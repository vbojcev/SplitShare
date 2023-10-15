'use client';

import { useSession } from 'next-auth/react';
import {
  FormEventHandler,
  useEffect,
  useState,
  MouseEventHandler,
} from 'react';
import { useRouter } from 'next/navigation';

import { Iuser } from '@/types/types';

const ChangeUsername = () => {
  //pull user session:

  const { data: session } = useSession();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newName, setNewName] = useState('');

  const router = useRouter();

  useEffect(() => {
    (async () => {
      //if user not logged in, redirect to home
      if (!session?.user) {
        router.push('/');
      }
    })();
  }, []);

  // Submits the form
  const setUsername: FormEventHandler = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/users/${session?.user.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: newName,
        }),
        cache: 'no-store',
      });

      if (response.ok) {
        router.push('/profile');
      } else {
        const message = await response.text();
        alert(message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancel: MouseEventHandler = () => router.push('/profile');

  return (
    <>
      {session ? (
        <div className="flex w-full max-w-3xl flex-col">
          <section className="mt-4 flex w-full max-w-full flex-col items-center">
            <h1>Change username</h1>
            <form
              onSubmit={setUsername}
              className={'mt-5 flex w-full max-w-3xl flex-col gap-8'}
            >
              <label className="flex flex-col">
                <span className="font-semibold">New Name</span>
                <input
                  className="mt-3 rounded-xl border-2 p-1 dark:border-gray-300 dark:bg-gray-700 dark:placeholder:text-gray-300"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  type="text"
                  placeholder="Enter new name here"
                  required
                />
              </label>
              <div className="flex flex-row justify-end">
                <button
                  onClick={cancel}
                  className="static my-1 flex w-full justify-center rounded-xl border-2 border-black bg-gray-200 p-4 dark:border-gray-300 dark:bg-rose-800 dark:from-inherit lg:mx-2 lg:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="static my-1 flex w-full justify-center rounded-xl border-2 border-black bg-gray-200 p-4 dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2 lg:w-auto"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChangeUsername;
