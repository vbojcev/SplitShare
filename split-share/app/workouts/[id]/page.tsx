'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Button from '@/components/Button';

import { Iworkout } from '@/types/types';

const Workout = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const { data: session } = useSession();

  const [deleted, setDeleted] = useState<Boolean>(false);

  const [loading, setLoading] = useState<Boolean>(true);

  const [postSaved, setPostSaved] = useState<Boolean>(false);

  const [workout, setWorkout] = useState<Iworkout>({
    _id: '',
    name: '',
    creator: { username: '', _id: '', image: '', email: '', savedWorkouts: [] },
    description: '',
    exercises: [{ id: 0, name: '', sets: 1, reps: 1, note: '' }],
    tags: [],
    saves: 0,
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
  }, [deleted, session, postSaved]);

  return (
    <>
      {!loading ? (
        <div className="relative flex w-full max-w-3xl flex-col place-items-center lg:rounded-xl lg:border lg:bg-header-bg lg:p-16">
          <div className="flex w-full flex-col justify-center">
            <h1 className="text-center">{workout.name}</h1>
            <h2
              className="cursor-pointer text-center"
              onClick={() => router.push(`/users/${workout.creator._id}`)}
            >
              Created by {workout.creator.username}
            </h2>
            <p className="text-center">{workout.saves} saves</p>
          </div>
          <p className="mt-4 w-full">{workout.description}</p>
          {workout.exercises.map((ex) => {
            return (
              <div className="mt-6 w-full" key={ex.id}>
                <h2 className="border-b">
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
            <div className="flex flex-row justify-center">
              <Button action={deleteWorkout} text={'Delete'}></Button>
              <Button
                action={() => router.push(`/workouts/${params.id}/edit`)}
                text={'Edit'}
              ></Button>
            </div>
          ) : (
            <></>
          )}
          {/*Explanation for block below: if no user is logged in or the creator is viewing the page, don't show anything.*/}
          {/*Otherwise, show the "save" button if the user doesn't have the post saved or the "unsave" button if they do. */}
          {session && session?.user.id !== workout.creator._id ? (
            postSaved ? (
              <Button action={unSaveWorkout} text={'Unsave Workout'}></Button>
            ) : (
              <Button action={saveWorkout} text={'Save Workout'}></Button>
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
