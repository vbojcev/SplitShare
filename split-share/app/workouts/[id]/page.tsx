'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Workout = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const { data: session } = useSession();

  const [deleted, setDeleted] = useState(false);

  const [loading, setLoading] = useState(true);

  const deleteWorkout = async () => {
    try {
      const response = await fetch(`/api/workouts/${params.id}`, {
        method: 'DELETE',
      });

      console.log(`attempting route /api/workouts/${params.id}`);

      if (response.ok) {
        setDeleted(true);
        router.back();
      } else {
        const message = await response.json();
        alert(message.msg);
      }

      setDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const [workout, setWorkout] = useState({
    name: null,
    creator: { username: null, _id: null },
    description: null,
  });

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(`/api/workouts/${params.id}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setWorkout(data);
          setLoading(false);
        } else {
          throw new Error('no workout found under that ID.');
        }
      } catch (error) {
        console.log(error);
        router.push('/');
      }
    };

    fetchWorkout();
  }, [deleted]);

  return (
    <>
      {!loading ? (
        <div className="relative flex w-full max-w-2xl flex-col place-items-center">
          <div className="flex w-full flex-col justify-center">
            <h1 className="text-center">{workout.name}</h1>
            <h1 className="text-center">
              Created by {workout.creator.username}
            </h1>
          </div>
          <p className="mt-8">{workout.description}</p>
          {session?.user.id == workout.creator._id ? (
            <button
              onClick={deleteWorkout}
              className="static m-3 flex h-fit w-auto justify-center rounded-xl border-2 border-black bg-gray-200 p-4 dark:border-gray-300 dark:bg-rose-800 dark:from-inherit lg:mx-2"
            >
              Delete
            </button>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Workout;
