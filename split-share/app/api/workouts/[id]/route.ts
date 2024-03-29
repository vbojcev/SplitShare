import Workout from '@/models/workout';
import User from '@/models/user';

import { connectToDB } from '@/utils/database';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

// Retrieve a specific workout
export const GET = async (
  request: Request /*Doesn't work without this, maybe it treats the params like a request.*/,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const workout = await Workout.findOne({
      _id: params.id,
    }).populate('creator');

    if (!workout) {
      return new Response(JSON.stringify({ msg: 'workout not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(workout), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ msg: 'Failed to fetch workout' }), {
      status: 500,
    });
  }
};

// Edit a workout

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { description, exercises, tags } = await request.json();

  try {
    await connectToDB();

    const session = await getServerSession(authOptions);

    const workout = await Workout.findById(params.id);

    if (session?.user.id == workout.creator._id) {
      workout.exercises = exercises;
      workout.description = description;
      workout.tags = tags;

      await workout.save();
    } else {
      return new Response('Unauthorized', { status: 401 });
    }

    return new Response('Successfully updated workout.', { status: 200 });
  } catch {
    return new Response('Failed to update workout', { status: 500 });
  }
};

// Delete a workout
export const DELETE = async (
  request: Request,
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
      return new Response(
        JSON.stringify({ msg: `Successfully deleted ${params.id}.` }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(JSON.stringify({ msg: 'Unauthorized.' }), {
        status: 401,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ msg: 'Failed to delete workout' }), {
      status: 500,
    });
  }
};

// Add workout to a user's saved workouts.
export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const session = await getServerSession(authOptions);

    //ensure workout exists
    const workout = await Workout.findById(params.id);

    if (!workout) {
      return new Response(JSON.stringify({ msg: 'Workout not found.' }), {
        status: 500,
      });
    }

    const user = await User.findById(session?.user.id);

    if (!user) {
      return new Response(JSON.stringify({ msg: 'User not found.' }), {
        status: 500,
      });
    }

    user.savedWorkouts.push(params.id);

    await user.save();

    return new Response(JSON.stringify({ msg: 'saved workout.' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ msg: 'Error' }), { status: 500 });
  }
};
