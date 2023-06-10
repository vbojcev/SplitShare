export interface Iexercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  note?: string;
}

export interface Iuser {
  _id: string;
  username: string;
  email: string;
  image: string;
  savedWorkouts: /*string[] | */ Iworkout[];
}

export interface Iworkout {
  _id: string;
  name: string;
  creator: /*string | */ Iuser;
  description: string;
  exercises: /*string[] | */ Iexercise[];
  tags: string[];
}
