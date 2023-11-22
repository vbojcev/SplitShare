'use client';

import { useState, useEffect } from 'react';

import WorkoutCard from '@/components/WorkoutCard';
import { Iworkout } from '@/types/types';

const page = () => {
  const [workouts, setWorkouts] = useState<Array<Iworkout>>([]);

  //const [searchParams, setSearchParams] = useState;

  const sortSaved = (a: Iworkout, b: Iworkout) => {
    return a.saves > b.saves ? -1 : a.saves < b.saves ? 1 : 0;
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts/all', {
        method: 'GET',
        cache: 'no-store',
      });
      const unsortedWorkouts = await response.json();
      setWorkouts(unsortedWorkouts.sort(sortSaved));
    };

    /*const testSearch = async () => {
      const response = await fetch(
        '/api/workouts/search/any/any/lmao/lol/lmfao',
        {
          method: 'GET',
          cache: 'no-store',
        }
      );
      const data = await response.json();
      console.log(data);
    };*/

    fetchWorkouts();
    //testSearch();
  }, []);

  return (
    <div className="relative flex w-full flex-col place-items-center">
      <h2>Sorted by popularity</h2>
      {workouts.map((workout: Iworkout) => (
        <WorkoutCard
          key={workout._id}
          creator={workout.creator.username}
          name={workout.name}
          description={workout.description}
          id={workout._id}
          saves={workout.saves}
        />
      ))}
    </div>
  );
};

export default page;
