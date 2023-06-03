'use client';
import { useSession, getProviders } from 'next-auth/react';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import WorkoutCard from '@/components/WorkoutCard';

const Profile = () => {
  const [providers, setProviders] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  //pull user session:
  const { data: session } = useSession();

  const router = useRouter();

  const deleteWorkout = async (id: string) => {
    try {
      const response = await fetch(`/api/workouts/${id}`, { method: 'DELETE' });

      console.log(`attempting route /api/workouts/${id}`);

      if (response.ok) {
        //setWorkouts(workouts.filter((workout: any) => workout._id !== id));
        setRefresh((refresh) => !refresh);
      } else {
        const message = await response.text();
        alert(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      setProviders(res);

      //if user not logged in, redirect to home
      if (!session?.user) {
        router.push('/');
      }
    })();

    const fetchWorkouts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/workouts`);
      const data = await response.json();
      setWorkouts(data);
    };

    if (session?.user.id) fetchWorkouts();
  }, [session?.user.id, refresh]);

  return (
    <>
      {session?.user ? (
        <div className="relative flex w-full flex-col place-items-center gap-2">
          <h1>{session?.user ? session.user.name : 'ERROR'}'s profile</h1>
          <Link
            href={'/profile/create-workout'}
            className="static my-1 flex w-auto justify-center rounded-xl border-2 border-black bg-gray-200 p-4 backdrop-blur-2xl dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2"
          >
            Create Workout
          </Link>
          <h1>Created Workouts:</h1>
          <div className="relative flex w-full flex-col place-items-center">
            {workouts.map((workout: any) => (
              <div className="alig flex w-full flex-row justify-center">
                <WorkoutCard
                  key={workout._id}
                  creator={workout.creator.username}
                  name={workout.name}
                  description={workout.description}
                />
                <button
                  onClick={() => deleteWorkout(workout._id)}
                  className="static m-3 flex h-fit w-auto justify-center rounded-xl border-2 border-black bg-gray-200 p-4 dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
