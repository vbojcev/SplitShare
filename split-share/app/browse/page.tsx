'use client';

import { useState, useEffect } from 'react';

import WorkoutCard from '@/components/WorkoutCard';
import { Iworkout } from '@/types/types';

const page = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts/all', { cache: 'no-store' });
      const data = await response.json();
      setWorkouts(data);
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="relative flex w-full flex-col place-items-center">
      {workouts.map((workout: Iworkout) => (
        <WorkoutCard
          key={workout._id}
          creator={workout.creator.username}
          name={workout.name}
          description={workout.description}
          id={workout._id}
        />
      ))}
    </div>
  );
};

export default page;
