import WorkoutCard from '@/components/WorkoutCard';

let placeholdertext: string =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const page = () => {
  return (
    <div className="relative flex w-full flex-col place-items-center">
      <WorkoutCard
        name={'Workout A'}
        author={'User A'}
        description={placeholdertext}
      />
      <WorkoutCard
        name={'Workout B'}
        author={'User B'}
        description={placeholdertext}
      />
      <WorkoutCard
        name={'Workout C'}
        author={'User C'}
        description={placeholdertext}
      />
      <WorkoutCard
        name={'Workout D'}
        author={'User D'}
        description={placeholdertext}
      />
      <WorkoutCard
        name={'Workout E'}
        author={'User E'}
        description={placeholdertext}
      />
      <WorkoutCard
        name={'Workout F'}
        author={'User F'}
        description={placeholdertext}
      />
    </div>
  );
};

export default page;
