'use client';

import { Iuser, Iworkout } from '@/types/types';
import { useState } from 'react';
import { useEffect } from 'react';
import WorkoutCard from '@/components/WorkoutCard';

const Profile = ({ params }: { params: { id: string } }) => {
  const [workouts, setWorkouts] = useState<Iworkout[]>([]);

  const [name, setName] = useState<String>('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`/api/users/${params.id}/workouts`, {
        cache: 'no-store',
      });
      if (response.ok) {
        const data = await response.json();
        setWorkouts(data);
      } else {
        setWorkouts([]);
      }
    };

    const fetchName = async () => {
      const response = await fetch(`/api/users/${params.id}`, {
        cache: 'no-store',
      });
      if (response.ok) {
        const data: Iuser = await response.json();
        setName(data.username);
      }
    };

    fetchWorkouts();
    fetchName();
  });

  return (
    <div className="relative flex w-full flex-col place-items-center gap-2">
      <h1>{name}'s Profile</h1>
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
    </div>
  );
};

export default Profile;
