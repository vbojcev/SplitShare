import Workout from '@/models/workout';
import { connectToDB } from '@/utils/database';

import { Iworkout } from '@/types/types';

export const GET = async (
  request: Request /*Doesn't work without this, maybe it treats the params like a request.*/,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const workouts: Iworkout[] = await Workout.find({
      creator: params.id,
    }).populate('creator');

    return new Response(JSON.stringify(workouts), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ msg: 'Failed to fetch workouts :(' }),
      { status: 500 }
    );
  }
};
