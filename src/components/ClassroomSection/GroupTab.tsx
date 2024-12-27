import { Fragment } from 'react/jsx-runtime';
import styled from 'styled-components';

const Group = styled.div`
  margin-bottom: 1rem;
  padding: 0 1rem;
`;

const GroupTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 16px;
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
  font-size: 16px;
`;

const StudentScore = styled.span<{ $negative: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) =>
    props.$negative ? props.theme.colors.negative : props.theme.colors.positive};
`;

type GroupTabProps = {
  groups: {
    name: string;
    students: {
      name: string;
      score: number;
    }[];
  }[];
};

function GroupTab({ groups }: GroupTabProps) {
  return (
    <Group>
      {groups.map((group) => (
        <Fragment key={group.name}>
          <GroupTitle>{group.name}</GroupTitle>
          <GroupItems>
            {group.students.map((student) => (
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
