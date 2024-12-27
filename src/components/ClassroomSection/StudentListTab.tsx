import { useMemo } from 'react';
import styled from 'styled-components';

import { Student } from '../../types';

import Score from './materials/Score';

const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  width: 100%;
  overflow-y: scroll;
  height: 100%;
  max-height: 18rem;
  padding-right: 1rem;
  padding-left: 1rem;
`;

type StudentListTabProps = {
  students: Student[];
  totalSeats: number;
};

function StudentListTab({ students, totalSeats }: StudentListTabProps) {
  const studentList = useMemo(() => {
    return new Array(totalSeats).fill(0).map((_, index) => {
      const student = students.find((student) => student.seat === index + 1);
      return student;
    });
  }, [students, totalSeats]);

  return (
    <StudentGrid>
      {studentList.map((student, index) => (
        <Score
          key={index}
          name={student?.name ?? 'Guest'}
          count={student?.score ?? 0}
          title={(index + 1).toString().padStart(2, '0')}
          disabled={!student}
          studentId={student?.id ?? 0}
        />
      ))}
    </StudentGrid>
  );
}

export default StudentListTab;
