import { Fragment } from 'react/jsx-runtime';
import styled from 'styled-components';

import { Student } from '../../types';

const Group = styled.div`
  margin-bottom: 1rem;
  padding: 0 1rem;
  overflow-y: scroll;
  height: 100%;
  max-height: 18rem;
`;

const GroupTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: bold;
`;

const GroupItems = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const GroupItem = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.5rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    margin-right: 0;
  }
`;

const StudentName = styled.span`
  font-size: 1rem;
`;

const StudentScore = styled.span<{ $negative: boolean }>`
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) =>
    props.$negative ? props.theme.colors.negative : props.theme.colors.positive};
`;

type GroupTabProps = {
  groups: Record<string, Student[]>;
};

function GroupTab({ groups }: GroupTabProps) {
  return (
    <Group>
      {Object.entries(groups).map(([groupName, students]) => (
        <Fragment key={groupName}>
          <GroupTitle>{groupName}</GroupTitle>
          <GroupItems>
            {students.map((student) => (
              <GroupItem key={student.name}>
                <StudentName>{student.name}</StudentName>
                <StudentScore $negative={student.score < 0}>{student.score}</StudentScore>
              </GroupItem>
            ))}
          </GroupItems>
        </Fragment>
      ))}
    </Group>
  );
}

export default GroupTab;
