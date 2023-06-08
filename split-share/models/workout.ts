import { Schema, model, models } from 'mongoose';

const WorkoutSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'All workouts require a name.'],
  },
  description: {
    type: String,
    required: [true, 'All workouts require a description.'],
  },
  exercises: [
    {
      _id: false,
      id: {
        type: Number,
        required: [true, 'Exercises need numbers to be ordered.'],
      },
      name: { type: String, required: [true, 'All exercises require a name.'] },
      sets: {
        type: Number,
        required: [true, 'All exercises need at least one set.'],
        min: 1,
        max: 99,
      },
      reps: {
        type: Number,
        required: [true, 'All sets need at least one rep.'],
        min: 1,
        max: 99,
      },
      note: { type: String },
    },
  ],
  tags: [
    {
      type: String,
    },
  ],
});

//Have to make this check because NextJS uses a cold start for routes.
const Workout = models.Workout || model('Workout', WorkoutSchema);

export default Workout;
