import Workout from '@/models/workout';
import { connectToDB } from '@/utils/database';

export const GET = async (
  request: any /*Doesn't work without this, maybe it treats the params like a request.*/,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const workouts = await Workout.find({
      creator: params.id,
    }).populate('creator');

    return new Response(JSON.stringify(workouts), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to fetch workouts :(', { status: 500 });
  }
};
