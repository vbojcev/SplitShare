import Workout from '@/models/workout';
import User from '@/models/user';

import { connectToDB } from '@/utils/database';

//Return OK if given user has given workout saved. No authorization deemed necessary, as this information is not intended to be private.
export const GET = async (
  request: any,
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
    return new Response(JSON.stringify({ msg: 'Error' }), { status: 500 });
  }
};
