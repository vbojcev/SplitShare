import Link from 'next/link';

const WorkoutCard = ({
  creator,
  name,
  description,
  id,
}: {
  creator: string;
  name: string;
  description: string;
  id: string;
}) => {
  return (
    <Link
      href={`/workouts/${id}`}
      className={
        'm-3 w-full max-w-3xl justify-center rounded-lg border bg-zinc-800 p-3 align-middle'
      }
    >
      <div className={'flex flex-col justify-between lg:flex-row'}>
        <h2 className="my-0">{name}</h2>
        <p>Author: {creator}</p>
      </div>
      <p className={'mt-2'}>{description}</p>
    </Link>
  );
};

export default WorkoutCard;
