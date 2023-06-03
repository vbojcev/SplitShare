import Workout from '@/models/workout';
import { connectToDB } from '@/utils/database';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

export const GET = async (
  request: any /*Doesn't work without this, maybe it treats the params like a request.*/,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const workout = await Workout.findOne({
      _id: params.id,
    }).populate('creator');

    return new Response(JSON.stringify(workout), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to fetch workout', { status: 500 });
  }
};

export const DELETE = async (
  request: any,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    // get session
    const session = await getServerSession(authOptions);

    const workout = await Workout.findOne({
      _id: params.id,
    }).populate('creator');

    if (session?.user.id == workout.creator._id) {
      await Workout.findByIdAndDelete(params.id);
      return new Response(`Successfully deleted ${params.id}.`, {
        status: 200,
      });
    } else {
      return new Response('Unauthorized.', { status: 401 });
    }
  } catch (error) {
    return new Response('Failed to delete workout', { status: 500 });
  }
};
