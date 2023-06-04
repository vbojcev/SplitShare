'use client';

import { useState, useEffect } from 'react';

import WorkoutCard from '@/components/WorkoutCard';

const page = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');
      const data = await response.json();
      setWorkouts(data);
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="relative flex w-full flex-col place-items-center">
      {workouts.map((workout: any) => (
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
