'use client';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import WorkoutCard from '@/components/WorkoutCard';

import { Iworkout } from '@/types/types';

const Profile = () => {
  const [workouts, setWorkouts] = useState<Iworkout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Iworkout[]>([]);
  const [username, setUsername] = useState<String>('');
  //pull user session:
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    const fetchUserName = async () => {
      const response = await fetch(`/api/users/${session?.user.id}`, {
        cache: 'no-store',
      });
      if (response.ok) {
        const user = await response.json();
        setUsername(user.username);
      } else {
        setUsername('');
      }
    };

    const fetchWorkouts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/workouts`, {
        cache: 'no-store',
      });
      if (response.ok) {
        const data = await response.json();
        setWorkouts(data);
      } else {
        setWorkouts([]);
      }
    };

    const fetchSaved = async () => {
      const response = await fetch(
        `/api/users/${session?.user.id}/savedWorkouts`,
        { cache: 'no-store' }
      );
      if (response.ok) {
        const data = await response.json();
        setSavedWorkouts(data);
      } else {
        setSavedWorkouts([]);
      }
    };

    if (!session?.user) {
      router.push('/');
    }

    fetchWorkouts();
    fetchSaved();
    fetchUserName();
  }, [session?.user]);

  return (
    <>
      {/* the '&& username prevents the page displaying before the username has been fully fetched. Otherwise there's " 's Profile" at the top of the page.*/}
      {session?.user && username ? (
        <div className="relative flex w-full flex-col place-items-center gap-2">
          <h1>{username}'s Profile</h1>
          <button
            className="static my-1 flex w-auto justify-center rounded-xl border-2 border-black bg-gray-200 p-4 dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2 lg:w-auto"
            type="button"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
          <Link
            href={'/profile/create-workout'}
            className="static my-1 flex w-auto justify-center rounded-xl border-2 border-black bg-gray-200 p-4 backdrop-blur-2xl dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2"
          >
            Create Workout
          </Link>
          <Link
            href={'/profile/change-username'}
            className="static my-1 flex w-auto justify-center rounded-xl border-2 border-black bg-gray-200 p-4 backdrop-blur-2xl dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2"
          >
            Change Username
          </Link>
          {workouts.length ? <h1>Created Workouts:</h1> : <h1></h1>}
          <div className="relative flex w-full flex-col place-items-center">
            {workouts?.map((workout: Iworkout) => (
              <div className="flex w-full flex-row justify-center">
                <WorkoutCard
                  key={workout._id}
                  creator={workout.creator.username}
                  name={workout.name}
                  description={workout.description}
                  id={workout._id}
                />
              </div>
            ))}
          </div>
          {savedWorkouts.length ? <h1>Saved Workouts:</h1> : <h1></h1>}
          {savedWorkouts?.map((workout: Iworkout) => (
            <div className="flex w-full flex-row justify-center">
              <WorkoutCard
                key={workout._id}
                creator={workout.creator.username}
                name={workout.name}
                description={workout.description}
                id={workout._id}
              />
            </div>
          ))}
        </div>
      ) : (
        <h1>Redirecting...</h1>
      )}
    </>
  );
};

export default Profile;
