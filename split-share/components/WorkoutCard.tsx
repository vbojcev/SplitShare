const WorkoutCard = ({
  creator,
  name,
  description,
}: {
  creator: string;
  name: string;
  description: string;
}) => {
  return (
    <div
      className={
        'm-3 w-full max-w-3xl justify-center rounded-lg border p-3 align-middle'
      }
    >
      <div className={'flex justify-between'}>
        <p>{name}</p>
        <p>Author: {creator}</p>
      </div>
      <p className={'mt-2'}>{description}</p>
    </div>
  );
};

export default WorkoutCard;
