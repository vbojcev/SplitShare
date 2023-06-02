import Workout from '@/models/workout';
import { connectToDB } from '@/utils/database';

export const POST = async (request: any) => {
  const { userId, name, description } = await request.json();

  try {
    await connectToDB();

    const workoutExists = await Workout.findOne({
      name: name,
      creator: userId,
    });

    //Reject post if the user has another workout with the same name
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
    });

    await newWorkout.save();
    return new Response(JSON.stringify(newWorkout), { status: 201 });
  } catch (error) {
    return new Response('Failed to create prompt', { status: 500 });
  }
};
