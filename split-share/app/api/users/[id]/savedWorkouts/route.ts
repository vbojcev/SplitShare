import Workout from '@/models/workout';
import User from '@/models/user';

import { connectToDB } from '@/utils/database';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { findAncestor } from 'typescript';
import { isErrored } from 'stream';

//return all workouts that a user has saved. Authentication not needed.
export const GET = async (
  request: any,
  { params }: { params: { id: string; workoutId: string } }
) => {
  try {
    await connectToDB();

    const user = await User.findById(params.id).populate('savedWorkouts');

    const savedWorkouts = user.savedWorkouts;

    return new Response(JSON.stringify(savedWorkouts), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ msg: 'Error' }), { status: 500 });
  }
};

// Add a saved workout.
export const PATCH = async (
  request: any,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const { workoutId } = await request.json();
    const session = await getServerSession(authOptions);

    //ensure workout exists
    const workout = await Workout.findById(workoutId);

    if (!workout || workout.creator == session?.user.id) {
      return new Response(
        JSON.stringify({
          msg: 'Workout not found or workout created by user.',
        }),
        {
          status: 500,
        }
      );
    }

    const user = await User.findById(session?.user.id);

    //ensure user exists
    if (!user) {
      return new Response(JSON.stringify({ msg: 'User not found.' }), {
        status: 500,
      });
    }

    //Check that user does not already have post saved
    if (user.savedWorkouts.includes(workoutId)) {
      return new Response(
        JSON.stringify({ msg: 'User already has post saved.' }),
        {
          status: 500,
        }
      );
    } else {
      user.savedWorkouts.push(workoutId);

      await user.save();
    }

    return new Response(JSON.stringify({ msg: 'Post successfully saved.' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ msg: 'Error' }), { status: 500 });
  }
};
