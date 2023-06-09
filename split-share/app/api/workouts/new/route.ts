import Workout from '@/models/workout';
import { connectToDB } from '@/utils/database';

export const POST = async (request: any) => {
  const { userId, name, description, exercises, tags } = await request.json();

  try {
    await connectToDB();

    const workoutExists = await Workout.findOne({
      name: name,
      creator: userId,
    });

    //Reject post if the user has another workout with the same name.
    //This is the only reasonable criteria for a workout "already existing".
    //This is because there is no reason to stop multiple users from having their own "leg day", "arm day", etc, workouts.
    if (workoutExists) {
      return new Response(
        'Workout with the same name already exists. Please choose another.',
        {
          status: 406,
        }
      );
    }

    const newWorkout = new Workout({
      creator: userId,
      name: name,
      description: description,
      exercises: [],
      tags: tags,
    });

    // For each exercise object, create a new entry in the exercises field of the workout.
    exercises.forEach(async (ex: any) => {
      newWorkout.exercises.push({
        id: ex.id,
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        note: ex.note,
      });
    });

    await newWorkout.save();
    return new Response(JSON.stringify(newWorkout), { status: 201 });
  } catch (error) {
    return new Response('Failed to create prompt', { status: 500 });
  }
};
