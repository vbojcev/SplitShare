import User from '@/models/user';

import { connectToDB } from '@/utils/database';

// Check if a given user has a given workout saved.
export const GET = async (
  request: Request,
  { params }: { params: { id: string; workoutId: string } }
) => {
  try {
    await connectToDB();

    const saved = await User.findOne({
      _id: params.id,
      savedWorkouts: params.workoutId,
    });

    if (saved) {
      return new Response(JSON.stringify({ msg: 'user has workout saved.' }), {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({ msg: "user doesn't have workout saved." }),
        { status: 404 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ msg: 'Cannot determin saved status.' }),
      { status: 500 }
    );
  }
};
