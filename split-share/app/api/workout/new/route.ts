import Workout from '@/models/workout';
import { connectToDB } from '@/utils/database';

export const POST = async (request: any) => {
  const { userId, name, description } = await request.json();

  try {
    await connectToDB();

    const newWorkout = new Workout({
      creator: userId,
      name: name,
      description: description,
    });

    await newWorkout.save();
    return new Response(JSON.stringify(newWorkout), { status: 201 });
  } catch (error) {
    return new Response('Failed to create prompt', { status: 500 });
  }
};
