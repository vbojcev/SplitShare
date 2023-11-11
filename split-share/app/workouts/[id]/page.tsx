'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Iworkout } from '@/types/types';
import Link from 'next/link';

const Workout = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const { data: session } = useSession();

  const [deleted, setDeleted] = useState(false);

  const [loading, setLoading] = useState(true);

  const [postSaved, setPostSaved] = useState(false);

  const [workout, setWorkout] = useState<Iworkout>({
    _id: '',
    name: '',
    creator: { username: '', _id: '', image: '', email: '', savedWorkouts: [] },
    description: '',
    exercises: [{ id: 0, name: '', sets: 1, reps: 1, note: '' }],
    tags: [],
  });

  const deleteWorkout = async () => {
    try {
      const response = await fetch(`/api/workouts/${params.id}`, {
        method: 'DELETE',
        cache: 'no-store',
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

  const saveWorkout = async () => {
    try {
      const response = await fetch(
        `/api/users/${session?.user.id}/savedWorkouts`,
        {
          method: 'POST',
          body: JSON.stringify({ workoutId: params.id }),
          cache: 'no-store',
        }
      );

      if (response.ok) {
        setPostSaved(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unSaveWorkout = async () => {
    try {
      const response = await fetch(
        `/api/users/${session?.user.id}/savedWorkouts`,
        {
          method: 'PATCH',
          body: JSON.stringify({ workoutId: params.id }),
          cache: 'no-store',
        }
      );

      if (response.ok) {
        setPostSaved(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(`/api/workouts/${params.id}`, {
          method: 'GET',
          cache: 'no-store',
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

    //  Check if the workout is saved by the logged-in user.
    const checkSaved = async () => {
      try {
        const response = await fetch(
          `/api/users/${session?.user.id}/savedWorkouts/${params.id}`,
          { method: 'GET', cache: 'no-store' }
        );

        response.ok ? setPostSaved(true) : setPostSaved(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWorkout();
    checkSaved();
  }, [deleted, session]);

  return (
    <>
      {!loading ? (
        <div className="relative flex w-full max-w-3xl flex-col place-items-center">
          <div className="flex w-full flex-col justify-center">
            <h1 className="text-center">{workout.name}</h1>
            <h2 className="text-center">
              Created by {workout.creator.username}
            </h2>
          </div>
          <p className="mt-4 w-full">{workout.description}</p>
          {workout.exercises.map((ex) => {
            return (
              <div className="mt-6 w-full" key={ex.id}>
                <h2>
                  Exercise {ex.id}: {ex.name}
                </h2>
                <h2>
                  {ex.sets} Sets, {ex.reps} Reps.
                </h2>
                {ex.note && <p>Additional Note: {ex.note}</p>}
              </div>
            );
          })}
          {session?.user.id == workout.creator._id ? (
            <div>
              <button
                onClick={deleteWorkout}
                className="static m-3 flex h-fit w-auto justify-center rounded-xl border-2 border-black bg-gray-200 p-4 dark:border-gray-300 dark:bg-rose-800 dark:from-inherit lg:mx-2"
              >
                Delete
              </button>
              <Link
                href={`/workouts/${params.id}/edit`}
                className="static my-1 flex w-auto justify-center rounded-xl border-2 border-black bg-gray-200 p-4 backdrop-blur-2xl dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2"
              >
                Edit
              </Link>
            </div>
          ) : (
            <></>
          )}
          {/*Explanation for block below: if no user is logged in or the creator is viewing the page, don't show anything.*/}
          {/*Otherwise, show the "save" button if the user doesn't have the post saved or the "unsave" button if they do. */}
          {session && session?.user.id !== workout.creator._id ? (
            postSaved ? (
              <button
                onClick={unSaveWorkout}
                className="static m-3 flex h-fit w-auto justify-center rounded-xl border-2 border-black bg-gray-200 p-4 dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2"
              >
                Unsave Workout
              </button>
            ) : (
              <button
                onClick={saveWorkout}
                className="static m-3 flex h-fit w-auto justify-center rounded-xl border-2 border-black bg-gray-200 p-4 dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2"
              >
                Save Workout
              </button>
            )
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
