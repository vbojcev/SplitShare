'use client';
import { FormEventHandler, MouseEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Montserrat_Alternates } from 'next/font/google';

const WorkoutForm = ({
  handleSubmit,
  workout,
  setWorkout,
  submitting,
}: {
  handleSubmit: FormEventHandler;
  workout: any;
  setWorkout: any;
  submitting: boolean;
}) => {
  const router = useRouter();

  const cancel: MouseEventHandler = () => router.push('/profile');

  return (
    <section className="mt-4 flex w-full max-w-full flex-col items-center">
      <h1>Create a Workout</h1>
      <form
        onSubmit={handleSubmit}
        className={'mt-5 flex w-full max-w-3xl flex-col gap-8'}
      >
        <label className="flex flex-col">
          <span className="font-semibold">Workout Name</span>
          <input
            className="mt-3 rounded-xl border-2 p-1 dark:border-gray-300 dark:bg-gray-700 dark:placeholder:text-gray-300"
            value={workout.name}
            onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
            type="text"
            placeholder="Workout Name"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="font-semibold">Workout Description</span>

          <textarea
            className="mt-3 rounded-xl border-2 p-1 dark:border-gray-300 dark:bg-gray-700 dark:placeholder:text-gray-300"
            value={workout.description}
            onChange={(e) =>
              setWorkout({ ...workout, description: e.target.value })
            }
            placeholder="Enter your workout's description"
            required
          />
        </label>
        <button
          type="submit"
          onClick={() => alert('adding exercise')}
          className="static my-1 flex w-auto justify-center rounded-xl border-2 border-black bg-gray-200 p-4 dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2 lg:w-fit"
        >
          Add Exercise
        </button>
        <div className="flex flex-row justify-end">
          <button
            onClick={cancel}
            className="static my-1 flex w-full justify-center rounded-xl border-2 border-black bg-gray-200 p-4 dark:border-gray-300 dark:bg-rose-800 dark:from-inherit lg:mx-2 lg:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="static my-1 flex w-full justify-center rounded-xl border-2 border-black bg-gray-200 p-4 dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2 lg:w-auto"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default WorkoutForm;
