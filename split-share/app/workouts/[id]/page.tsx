'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { error } from 'console';

const Workout = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [workout, setWorkout] = useState({
    name: null,
    creator: { username: null },
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
        } else {
          throw new Error('no workout found under that ID.');
        }
      } catch (error) {
        console.log(error);
        router.push('/');
      }
    };

    fetchWorkout();
  }, []);

  return (
    <div className="relative flex w-full max-w-2xl flex-col place-items-center">
      <div className="flex w-full flex-col justify-center">
        <h1 className="text-center">{workout.name}</h1>
        <h1 className="text-center">Created by {workout.creator.username}</h1>
      </div>
      <p className="mt-8">{workout.description}</p>
    </div>
  );
};

export default Workout;
