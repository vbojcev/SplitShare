export const revalidate = 0;

import Workout from '@/models/workout';
import { connectToDB } from '@/utils/database';

// Get workouts given a search term
export const GET = async (request: Request) => {
  try {
    await connectToDB();

    // rewrite to use url variables:
    // const { name, desc } = await request.json();

    const workouts = await Workout.find({}).populate('creator');

    return new Response(JSON.stringify(workouts), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to fetch workouts', { status: 500 });
  }
};
