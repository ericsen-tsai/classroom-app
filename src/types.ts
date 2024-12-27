export type Student = {
  name: string;
  score: number;
  seat: number;
  group: string;
};

export type Classroom = {
  name: string;
  students: Student[];
};
