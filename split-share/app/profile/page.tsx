'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import WorkoutCard from '@/components/WorkoutCard';

import { Iworkout } from '@/types/types';
import { Router } from 'next/router';

const Profile = () => {
  const [workouts, setWorkouts] = useState<Iworkout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Iworkout[]>([]);
  //pull user session:
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
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
  }, [session?.user]);

  return (
    <>
      {session?.user ? (
        <div className="relative flex w-full flex-col place-items-center gap-2">
          <h1>{session.user.name}'s profile</h1>
          <Link
            href={'/profile/create-workout'}
            className="static my-1 flex w-auto justify-center rounded-xl border-2 border-black bg-gray-200 p-4 backdrop-blur-2xl dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2"
          >
            Create Workout
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
