export const revalidate = 0;

import Workout from '@/models/workout';
import { connectToDB } from '@/utils/database';

// Get workouts given a search term
export const GET = async (
  request: Request,
  { params }: { params: { name: string; tags: Array<String> } }
) => {
  try {
    await connectToDB();

    let workouts = null;

    if (!params.name) {
      workouts = await Workout.find({}).populate('creator');
    } else {
      workouts = await Workout.find({
        $text: { $search: params.name },
      }).populate('creator');
    }

    return new Response(JSON.stringify(workouts), {
      status: 200,
    });

    // Debug purposes:

    /*return new Response(JSON.stringify(params), {
      status: 200,
    });*/
  } catch (error) {
    console.log(params);
    return new Response('Failed to search workouts', { status: 500 });
  }
};
