import { useMemo, useState } from 'react';
import { IoMdPerson } from 'react-icons/io'; // Styled components
import { IoMdMore } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import styled from 'styled-components';

import GroupTab from './GroupTab';
import { PopoverAnchor, PopoverButton, PopoverContent } from './materials/Popover';
import { Tabs, TabContainer } from './materials/Tabs';
import StudentListTab from './StudentListTab';

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
  width: 35rem;
  min-width: 35rem;
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

const WinnerPopoverText = styled.p`
  text-align: no-wrap;
`;

const WinnerPopoverName = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
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

const groups = [
  {
    name: 'Group 1',
    students: [
      { name: 'Gloria', score: 1 },
      { name: 'Darrell', score: 2 },
      { name: 'Philip', score: 3 },
      { name: 'Cody', score: 4 },
      { name: 'Bessie', score: 5 },
    ],
  },
  {
    name: 'Group 2',
    students: [
      { name: 'Gloria', score: -1 },
      { name: 'Darrell', score: 2 },
      { name: 'Philip', score: 3 },
      { name: 'Cody', score: 4 },
      { name: 'Bessie', score: 5 },
    ],
  },
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

  const renderContent = useMemo(() => {
    switch (tab) {
      case 'studentList':
        return <StudentListTab students={students} />;
      case 'group':
        return <GroupTab groups={groups} />;
      default:
        return null;
    }
  }, [students, tab]);

  const winner = 'Philip';

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
            <WinnerPopoverText>
              Winner: <WinnerPopoverName>{winner}</WinnerPopoverName>
            </WinnerPopoverText>
            <WinnerPopoverText>
              1st Group: <WinnerPopoverName>{winner}</WinnerPopoverName>
            </WinnerPopoverText>
          </PopoverContent>
        </PopoverAnchor>
      </TabsHeader>

      <TabContainer>{renderContent}</TabContainer>
    </Container>
  );
};

export default function ClassroomSection() {
  return <StudentList title="302 Science" subtitle="16/30" students={students} />;
}
