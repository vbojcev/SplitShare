import Workout from '@/models/workout';
import User from '@/models/user';

import { connectToDB } from '@/utils/database';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

import { Iuser } from '@/types/types';
import { Iworkout } from '@/types/types';

//return all workouts that a user has saved
export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const user = await User.findById(params.id).populate({
      path: 'savedWorkouts',
      populate: { path: 'creator' },
    });

    const savedWorkouts = user.savedWorkouts;

    return new Response(JSON.stringify(savedWorkouts), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ msg: 'Error' }), { status: 500 });
  }
};

// Add a saved workout
export const POST = async (
  request: Request,
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
          status: 404,
        }
      );
    } else {
      user.savedWorkouts.push(workoutId);
      workout.saves += 1;

      await workout.save();
      await user.save();
    }

    return new Response(JSON.stringify({ msg: 'Post successfully saved.' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ msg: 'Error' }), { status: 500 });
  }
};

// Unsave a workout
export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const { workoutId } = await request.json();
    const session = await getServerSession(authOptions);

    //ensure user and workout exist
    const user = await User.findById(session?.user.id);
    const workout = await Workout.findById(workoutId);

    if (!user) {
      return new Response(JSON.stringify({ msg: 'User not found.' }), {
        status: 500,
      });
    } else if (!workout) {
      return new Response(JSON.stringify({ msg: 'Workout not found.' }), {
        status: 500,
      });
    }

    //Check that user has post saved
    const indexOfWorkout: number = user.savedWorkouts.indexOf(workoutId);

    if (indexOfWorkout > -1) {
      //remove from array
      user.savedWorkouts.splice(indexOfWorkout, 1);
      await user.save();

      workout.saves -= 1;
      await workout.save();

      return new Response(
        JSON.stringify({ msg: 'Post successfully unsaved.' }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({ msg: 'User does not have post saved.' }),
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ msg: 'Error' }), { status: 500 });
  }
};
