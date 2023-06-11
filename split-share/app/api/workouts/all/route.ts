export const revalidate = 0;

import Workout from '@/models/workout';
import { connectToDB } from '@/utils/database';

// Get all workouts.
export const GET = async (request: Request) => {
  try {
    await connectToDB();

    //No need to populate the exercises because the only time several workouts are on the same page is when they are displayed in card format.
    const workouts = await Workout.find({}).populate('creator');

    return new Response(JSON.stringify(workouts), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to fetch workouts', { status: 500 });
  }
};
