'use client';

import { useState, useEffect, FormEventHandler } from 'react';

import WorkoutCard from '@/components/WorkoutCard';
import { Iworkout } from '@/types/types';

const page = () => {
  const [workouts, setWorkouts] = useState<Array<Iworkout>>([]);

  const [searchString, setSearchString] = useState('');

  const sortSaved = (a: Iworkout, b: Iworkout) => {
    return a.saves > b.saves ? -1 : a.saves < b.saves ? 1 : 0;
  };

  const searchWorkouts: FormEventHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/workouts/search/all/${searchString}`, {
      method: 'GET',
      cache: 'no-store',
    });
    const data = await response.json();
    setWorkouts(data.sort(sortSaved));
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts/search/all', {
        method: 'GET',
        cache: 'no-store',
      });
      const unsortedWorkouts = await response.json();
      setWorkouts(unsortedWorkouts.sort(sortSaved));
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="relative flex w-full flex-col place-items-center">
      <form
        onSubmit={searchWorkouts}
        className={'mb-2 flex w-full max-w-3xl flex-col gap-8'}
      >
        <label className="flex flex-row content-center">
          <input
            className="grow rounded-xl border border-gray-300 bg-gray-700 p-1 placeholder:text-gray-300"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            type="text"
            placeholder="Search Workouts"
          />
          <button
            type="submit"
            className="static m-3 flex h-fit w-auto justify-center rounded-lg border border-black border-transparent  bg-button-bg from-inherit p-2 hover:border-gray-300 lg:mx-2"
          >
            Search
          </button>
        </label>
      </form>
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
