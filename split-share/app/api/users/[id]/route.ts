import User from '@/models/user';
import { connectToDB } from '@/utils/database';

import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

// Change username
export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { name } = await request.json();

  try {
    await connectToDB();

    const session = await getServerSession(authOptions);

    if (session?.user.id == params.id) {
      await User.findOneAndUpdate(
        { _id: params.id },
        { username: name },
        { runValidators: true }
      );

      return new Response(
        JSON.stringify({ msg: `Successfully changed username.` }),
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
    return new Response(
      'Failed to change username. Please make sure it is 8-20 alphanumeric characters.',
      { status: 500 }
    );
  }
};
