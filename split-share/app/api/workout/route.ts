import Workout from '@/models/workout';
import { connectToDB } from '@/utils/database';

export const GET = async () => {
  try {
    await connectToDB();

    const workouts = await Workout.find({}).populate('creator');

    return new Response(JSON.stringify(workouts), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to fetch workouts', { status: 500 });
  }
};
