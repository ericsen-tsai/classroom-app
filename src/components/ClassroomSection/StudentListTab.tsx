import styled from 'styled-components';

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
  students: {
    name: string;
    positiveScore: number;
    negativeScore: number;
    isGuest: boolean;
  }[];
};

function StudentListTab({ students }: StudentListTabProps) {
  return (
    <StudentGrid>
      {students.map((student, index) => (
        <Score
          key={index}
          name={student.name}
          initialCount={student.positiveScore}
          title={(index + 1).toString().padStart(2, '0')}
          disabled={student.isGuest}
        />
      ))}
    </StudentGrid>
  );
}

export default StudentListTab;
