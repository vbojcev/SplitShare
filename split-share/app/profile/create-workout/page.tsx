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
import Button from '@/components/Button';

const CreateWorkout = () => {
  //pull user session:
  const { data: session, status } = useSession();

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [workout, setWorkout] = useState<Iworkout>({
    _id: '',
    name: '',
    creator: { username: '', _id: '', image: '', email: '', savedWorkouts: [] },
    description: '',
    exercises: [{ id: 1, name: '', sets: 1, reps: 1, note: '' }],
    tags: [],
    saves: 0,
  });

  // For readability of users, indexing starts at 1
  const [exercises, setExercises] = useState<Iexercise[]>([
    { id: 1, name: '', sets: 1, reps: 1, note: '' },
  ]);

  // Future Feature: sort by tag in the browse page.
  const [tags, setTags] = useState([]);

  useEffect(() => {
    (async () => {
      //if user not logged in, redirect to home
      if (status == 'unauthenticated') {
        router.push('/');
      }
    })();
  }, [status]);

  // Submits the form
  const createWorkout: FormEventHandler = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/workouts/new', {
        method: 'POST',
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

  const cancel: MouseEventHandler = () => router.push('/profile');

  return (
    <>
      {session ? (
        <div className="flex w-full max-w-3xl flex-col">
          <section className="mt-4 flex w-full max-w-full flex-col items-center">
            <h1>Create a Workout</h1>
            <form
              onSubmit={createWorkout}
              className={'mt-5 flex w-full max-w-3xl flex-col gap-8'}
            >
              <label className="flex flex-col">
                <span className="font-semibold">Workout Name</span>
                <input
                  className="mt-3 rounded-xl border-2 border-gray-300 bg-gray-700 p-1 placeholder:text-gray-300"
                  value={workout.name}
                  onChange={(e) =>
                    setWorkout({ ...workout, name: e.target.value })
                  }
                  type="text"
                  placeholder="Workout name"
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="font-semibold">Workout Description</span>

                <textarea
                  className="mt-3 rounded-xl border-2 border-gray-300 bg-gray-700 p-1 placeholder:text-gray-300"
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
                          <Button
                            action={() => removeExercise(ex.id)}
                            text={'Remove'}
                          ></Button>
                        ) : (
                          <></>
                        )}
                      </span>
                      <input
                        type="text"
                        className="mt-3 rounded-xl border-2 border-gray-300 bg-gray-700 p-1 placeholder:text-gray-300"
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
                          className="mt-3 w-fit rounded-xl border-2 border-gray-300 bg-gray-700 p-1 placeholder:text-gray-300"
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
                          className="mt-3 rounded-xl border-2 border-gray-300 bg-gray-700 p-1 placeholder:text-gray-300"
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
                        className="mt-3 rounded-xl border-2 border-gray-300 bg-gray-700 p-1 placeholder:text-gray-300"
                        value={ex.note}
                        onChange={(e) => handleExNote(ex.id, e.target.value)}
                        placeholder={`Exercise ${ex.id} notes`}
                      />
                    </label>
                  </div>
                );
              })}
              <Button action={addExercise} text={'Add Exercise'}></Button>

              <div className="flex flex-row justify-end">
                <Button action={cancel} text={'Cancel'}></Button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="static m-3 flex h-fit w-auto justify-center rounded-lg border border-black border-transparent  bg-button-bg from-inherit p-2 hover:border-gray-300 lg:mx-2"
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

export default CreateWorkout;
