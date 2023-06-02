import mongoose, { Schema, model, models } from 'mongoose';

const WorkoutSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'All workouts require a creator.'],
  },
  name: {
    type: String,
    required: [true, 'All workouts require a name.'],
  },
  description: {
    type: String,
    required: [true, 'All workouts require a description.'],
  },
});

//Have to make this check because NextJS uses a cold start for routes.
const Workout = models.Workout || model('Workout', WorkoutSchema);

export default Workout;
