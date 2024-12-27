export type Student = {
  name: string;
  score: number;
  seat: number;
  group: string;
  id: number;
};

export type Classroom = {
  name: string;
  students: Student[];
  total_seats: number;
};
