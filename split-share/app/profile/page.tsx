'use client';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import WorkoutCard from '@/components/WorkoutCard';

import { Iworkout } from '@/types/types';
import Button from '@/components/Button';

const Profile = () => {
  const [workouts, setWorkouts] = useState<Iworkout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Iworkout[]>([]);

  //pull user session:
  const { data: session, status } = useSession();

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

    fetchWorkouts();
    fetchSaved();

    (async () => {
      //if user not logged in, redirect to home
      if (status == 'unauthenticated') {
        router.push('/');
      }
    })();
  }, [session?.user, status]);

  return (
    <>
      {/* the '&& username prevents the page displaying before the username has been fully fetched. Otherwise there's " 's Profile" at the top of the page.*/}
      {session?.user ? (
        <div className="relative flex w-full flex-col place-items-center gap-2">
          <h1>{session.user.name}'s Profile</h1>
          <Button action={() => signOut()} text={'Sign Out'}></Button>
          <Button
            action={() => router.push('/profile/create-workout')}
            text={'Create Workout'}
          ></Button>
          <Button
            action={() => router.push('/profile/change-username')}
            text={'Change Username'}
          ></Button>
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
                  saves={workout.saves}
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
                saves={workout.saves}
              />
            </div>
          ))}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Profile;
