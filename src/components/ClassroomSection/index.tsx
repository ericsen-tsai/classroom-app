import { useState } from 'react';
import { IoMdPerson } from 'react-icons/io'; // Styled components
import { IoMdMore } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import styled from 'styled-components';

import { PopoverAnchor, PopoverButton, PopoverContent } from './materials/Popover';
import Room from './materials/Room';
import { Tabs, TabContainer } from './materials/Tabs';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding-top: 1rem;
  position: relative;
  height: 26.5rem;
  width: 40rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem 1.5rem 0 1.5rem;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
`;

const SubTitle = styled.div`
  font-size: 0.75rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.caption};
`;

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

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: ${({ theme }) => theme.colors.caption};
`;

const TabsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1.5rem;
`;

// Example usage
const students = [
  { name: 'Philip', positiveScore: 2, negativeScore: -1, isGuest: false },
  { name: 'Darrell', positiveScore: 5, negativeScore: 1, isGuest: false },
  { name: 'Guest', positiveScore: 0, negativeScore: 0, isGuest: true },
  { name: 'Cody', positiveScore: 4, negativeScore: -1, isGuest: false },
  { name: 'Bessie', positiveScore: 3, negativeScore: -1, isGuest: false },
  { name: 'Wendy', positiveScore: 1, negativeScore: -1, isGuest: false },
  { name: 'Guest', positiveScore: 0, negativeScore: 0, isGuest: true },
  { name: 'Esther', positiveScore: 1, negativeScore: 1, isGuest: false },
  { name: 'Gloria', positiveScore: 2, negativeScore: -1, isGuest: false },
  { name: 'Guest', positiveScore: 0, negativeScore: 0, isGuest: true },
  { name: 'Lee', positiveScore: 3, negativeScore: -1, isGuest: false },
  { name: 'Ann', positiveScore: 1, negativeScore: -1, isGuest: false },
  { name: 'Jacob', positiveScore: 8, negativeScore: 1, isGuest: false },
  { name: 'Calvin', positiveScore: 1, negativeScore: 0, isGuest: false },
  { name: 'Joe', positiveScore: 0, negativeScore: -1, isGuest: false },
  { name: 'Philip', positiveScore: 2, negativeScore: -1, isGuest: false },
  { name: 'Darrell', positiveScore: 5, negativeScore: 1, isGuest: false },
  { name: 'Guest', positiveScore: 0, negativeScore: 0, isGuest: true },
  { name: 'Cody', positiveScore: 4, negativeScore: -1, isGuest: false },
  { name: 'Bessie', positiveScore: 3, negativeScore: -1, isGuest: false },
  { name: 'Wendy', positiveScore: 1, negativeScore: -1, isGuest: false },
  { name: 'Guest', positiveScore: 0, negativeScore: 0, isGuest: true },
  { name: 'Esther', positiveScore: 1, negativeScore: 1, isGuest: false },
  { name: 'Gloria', positiveScore: 2, negativeScore: -1, isGuest: false },
  { name: 'Guest', positiveScore: 0, negativeScore: 0, isGuest: true },
  { name: 'Lee', positiveScore: 3, negativeScore: -1, isGuest: false },
  { name: 'Ann', positiveScore: 1, negativeScore: -1, isGuest: false },
  { name: 'Jacob', positiveScore: 8, negativeScore: 1, isGuest: false },
  { name: 'Calvin', positiveScore: 1, negativeScore: 0, isGuest: false },
  { name: 'Joe', positiveScore: 0, negativeScore: -1, isGuest: false },
];

const StudentList = ({
  students,
  title,
  subtitle,
}: {
  students: {
    name: string;
    positiveScore: number;
    negativeScore: number;
    isGuest: boolean;
  }[];
  title: string;
  subtitle: string;
}) => {
  const [tab, setTab] = useState('studentList');
  const [showPopover, setShowPopover] = useState(false);
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <SubTitle>
          <IoMdPerson />
          {subtitle}
        </SubTitle>
      </Header>
      <CloseButton onClick={() => alert('Close QR Code')}>
        <IoCloseSharp size={20} />
      </CloseButton>
      <TabsHeader>
        <Tabs
          tabs={[
            {
              label: 'Student List',
              value: 'studentList',
            },
            {
              label: 'Group',
              value: 'group',
            },
          ]}
          onTabValueChange={setTab}
          tabValue={tab}
        />
        <PopoverAnchor>
          <PopoverButton onClick={() => setShowPopover(!showPopover)}>
            <IoMdMore size={20} />
          </PopoverButton>
          <PopoverContent show={showPopover} onClose={() => setShowPopover(false)}>
            Hello
          </PopoverContent>
        </PopoverAnchor>
      </TabsHeader>

      <TabContainer>
        <StudentGrid>
          {students.map((student, index) => (
            <Room
              key={index}
              name={student.name}
              initialCount={student.positiveScore}
              title={(index + 1).toString().padStart(2, '0')}
              disabled={student.isGuest}
            />
          ))}
        </StudentGrid>
      </TabContainer>
    </Container>
  );
};

export default function ClassroomSection() {
  return <StudentList title="302 Science" subtitle="16/30" students={students} />;
}
