'use client';

import { useSession } from 'next-auth/react';
import {
  FormEventHandler,
  useEffect,
  useState,
  MouseEventHandler,
} from 'react';
import { useRouter } from 'next/navigation';

import { Iworkout } from '@/types/types';

import { Iexercise } from '@/types/types';

const EditWorkout = ({ params }: { params: { id: string } }) => {
  //pull user session:
  const { data: session } = useSession();

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const [workout, setWorkout] = useState<Iworkout>({
    _id: '',
    name: '',
    creator: { username: '', _id: '', image: '', email: '', savedWorkouts: [] },
    description: '',
    exercises: [{ id: 1, name: '', sets: 1, reps: 1, note: '' }],
    tags: [],
  });

  // For readability of users, indexing starts at 1
  const [exercises, setExercises] = useState<Iexercise[]>([
    { id: 1, name: '', sets: 1, reps: 1, note: '' },
  ]);

  // Future Feature: sort by tag in the browse page.
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(`/api/workouts/${params.id}`, {
          method: 'GET',
          cache: 'no-store',
        });

        if (response.ok) {
          const initWorkout = await response.json();
          setWorkout(initWorkout);
          setExercises(initWorkout.exercises);
          setLoading(false);
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

  // Submits the form
  const updateWorkout: FormEventHandler = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/workouts/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: workout.name,
          userId: session?.user ? session.user.id : 'ERROR: NO USER ID.',
          description: workout.description,
          exercises: exercises,
          tags: tags,
        }),
        cache: 'no-store',
      });

      //Return to profile page upon successful creation.
      if (response.ok) {
        router.push(`/workouts/${params.id}`);
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

  const addExercise = () => {
    let newExercise = {
      id: exercises.length + 1,
      name: '',
      sets: 1,
      reps: 1,
      note: '',
    };

    setExercises([...exercises, newExercise]);
  };

  const handleExName = (ExId: number, name: string) => {
    setExercises(
      exercises.map((ex) => {
        if (ex.id == ExId) {
          return { ...ex, name: name };
        } else {
          return ex;
        }
      })
    );
  };

  const handleExNote = (ExId: number, note: string) => {
    setExercises(
      exercises.map((ex) => {
        if (ex.id == ExId) {
          return { ...ex, note: note };
        } else {
          return ex;
        }
      })
    );
  };

  const handleExSets = (ExId: number, sets: number) => {
    setExercises(
      exercises.map((ex) => {
        if (ex.id == ExId) {
          return { ...ex, sets: sets };
        } else {
          return ex;
        }
      })
    );
  };

  const handleExReps = (ExId: number, reps: number) => {
    setExercises(
      exercises.map((ex) => {
        if (ex.id == ExId) {
          return { ...ex, reps: reps };
        } else {
          return ex;
        }
      })
    );
  };

  const removeExercise = (ExId: number) => {
    //  This is admittedly pretty janky. But it works for now. I'll add it as an issue to look at later.

    let newExercises = [];

    for (let i = 0; i < exercises.length; i++) {
      if (exercises[i].id != ExId) {
        newExercises.push(exercises[i]);
      }
    }

    for (let i = 0; i < newExercises.length; i++) {
      newExercises[i].id = i + 1;
    }

    setExercises(newExercises);
  };

  const cancel: MouseEventHandler = () => router.push(`/workouts/${params.id}`);

  return (
    <>
      {session?.user.id && !loading /*== workout.creator._id*/ ? (
        <div className="flex w-full max-w-3xl flex-col">
          <section className="mt-4 flex w-full max-w-full flex-col items-center">
            <h1>Edit {workout.name}</h1>
            <form
              onSubmit={updateWorkout}
              className={'mt-5 flex w-full max-w-3xl flex-col gap-8'}
            >
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
              {exercises.map((ex) => {
                return (
                  <div key={ex.id}>
                    <label className="flex flex-col">
                      <span className="flex flex-row justify-between">
                        <div className="flex flex-col justify-center">
                          <p className="font-semibold">Exercise {ex.id}</p>
                        </div>
                        {ex.id > 1 ? (
                          <button
                            type="button"
                            onClick={() => removeExercise(ex.id)}
                            className="static flex w-auto justify-center rounded-xl border-2 border-black bg-gray-200 px-2 py-1 dark:border-gray-300 dark:bg-rose-800 dark:from-inherit lg:w-auto"
                          >
                            Remove
                          </button>
                        ) : (
                          <></>
                        )}
                      </span>
                      <input
                        type="text"
                        className="mt-3 rounded-xl border-2 p-1 dark:border-gray-300 dark:bg-gray-700 dark:placeholder:text-gray-300"
                        value={ex.name}
                        onChange={(e) => handleExName(ex.id, e.target.value)}
                        placeholder={`Exercise ${ex.id} name`}
                        required
                      />
                    </label>
                    <label className="flex flex-row justify-center gap-3">
                      <span className="font-semibold">
                        Sets:&nbsp;
                        <input
                          type="number"
                          min="1"
                          max="99"
                          className="mt-3 w-fit rounded-xl border-2 p-1 dark:border-gray-300 dark:bg-gray-700 dark:placeholder:text-gray-300"
                          value={ex.sets}
                          onChange={(e) =>
                            handleExSets(ex.id, parseInt(e.target.value))
                          }
                          placeholder={`Sets`}
                        />
                      </span>
                      <span className="font-semibold">
                        Reps:&nbsp;
                        <input
                          type="number"
                          min="1"
                          max="99"
                          className="mt-3 rounded-xl border-2 p-1 dark:border-gray-300 dark:bg-gray-700 dark:placeholder:text-gray-300"
                          value={ex.reps}
                          onChange={(e) =>
                            handleExReps(ex.id, parseInt(e.target.value))
                          }
                          placeholder={`Reps`}
                        />
                      </span>
                    </label>
                    <label className="flex flex-col">
                      <textarea
                        className="mt-3 rounded-xl border-2 p-1 dark:border-gray-300 dark:bg-gray-700 dark:placeholder:text-gray-300"
                        value={ex.note}
                        onChange={(e) => handleExNote(ex.id, e.target.value)}
                        placeholder={`Exercise ${ex.id} notes`}
                      />
                    </label>
                  </div>
                );
              })}
              <button
                type="button"
                onClick={addExercise}
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
                  disabled={isSubmitting}
                  className="static my-1 flex w-full justify-center rounded-xl border-2 border-black bg-gray-200 p-4 dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2 lg:w-auto"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default EditWorkout;
