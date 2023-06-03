'use client';

import { useSession } from 'next-auth/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import WorkoutForm from '@/components/WorkoutForm';

const CreateWorkout = () => {
  //pull user session:
  const { data: session } = useSession();

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [workout, setWorkout] = useState({ name: '', description: '' });

  useEffect(() => {
    (async () => {
      //if user not logged in, redirect to home
      if (!session?.user) {
        router.push('/');
      }
    })();
  }, []);

  const createWorkout: FormEventHandler = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/workouts/new', {
        method: 'POST',
        body: JSON.stringify({
          name: workout.name,
          userId: session?.user
            ? session.user.id
            : 'ERROR: NO USER ID. PLEASE PURGE.',
          description: workout.description,
        }),
      });

      //Return to profile page upon successful creation.
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

  return (
    <>
      {session?.user ? (
        <div className="flex w-full max-w-3xl flex-col">
          <WorkoutForm
            handleSubmit={createWorkout}
            workout={workout}
            setWorkout={setWorkout}
            submitting={isSubmitting}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CreateWorkout;
