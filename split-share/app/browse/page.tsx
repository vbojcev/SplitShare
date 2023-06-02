'use client';

import { useState, useEffect } from 'react';

import WorkoutCard from '@/components/WorkoutCard';

let placeholdertext: string =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const page = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workout');
      const data = await response.json();
      setWorkouts(data);
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="relative flex w-full flex-col place-items-center">
      {workouts.map((workout: any) => (
        <WorkoutCard
          key={workout.id}
          creator={workout.creator.username}
          name={workout.name}
          description={workout.description}
        />
      ))}
    </div>
  );
};

export default page;
