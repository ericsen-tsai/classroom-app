import { useEffect, useMemo, useState } from 'react';
import { IoMdPerson } from 'react-icons/io';
import { IoMdMore } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { useGetClassroomDataQuery } from '../../services/api';
import { setClassroomData } from '../../store/classroomSlice';
import { RootState } from '../../store/store';
import { Student } from '../../types';

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

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const StudentList = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetClassroomDataQuery();

  useEffect(() => {
    if (data) {
      dispatch(setClassroomData(data));
    }
  }, [data, dispatch]);

  const [tab, setTab] = useState('studentList');
  const [showPopover, setShowPopover] = useState(false);

  const classroomData = useSelector((state: RootState) => state.classroom.data);

  const groups = useMemo(() => {
    return (
      classroomData?.students.reduce<Record<string, Student[]>>((acc, student) => {
        if (!acc[student.group]) {
          acc[student.group] = [];
        }
        acc[student.group].push(student);
        return acc;
      }, {}) ?? {}
    );
  }, [classroomData]);

  const renderContent = useMemo(() => {
    switch (tab) {
      case 'studentList':
        return (
          <StudentListTab
            students={classroomData?.students || []}
            totalSeats={classroomData?.total_seats || 0}
          />
        );
      case 'group':
        return <GroupTab groups={groups} />;
      default:
        return null;
    }
  }, [tab, groups, classroomData?.students, classroomData?.total_seats]);

  const winnerName = useMemo(() => {
    return classroomData?.students.reduce((acc, student) => {
      if (student.score > acc.score) {
        return student;
      }
      return acc;
    }, classroomData?.students[0]).name;
  }, [classroomData?.students]);

  const firstGroup = useMemo(() => {
    const groupScore = Object.values(groups).reduce<Record<string, number>>((acc, group) => {
      return {
        ...acc,
        [group[0].group]: group.reduce((acc, student) => acc + student.score, 0),
      };
    }, {});
    return Object.entries(groupScore).sort((a, b) => b[1] - a[1])?.[0]?.[0] ?? '- -';
  }, [groups]);

  if (isLoading)
    return (
      <Container>
        <LoadingContainer>Loading...</LoadingContainer>
      </Container>
    );
  if (error || !classroomData) return <div>Error loading classroom classroomData</div>;

  return (
    <Container>
      <Header>
        <Title>{classroomData.name}</Title>
        <SubTitle>
          <IoMdPerson />
          {`${classroomData.students.length}/${classroomData.total_seats}`}
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
              Winner: <WinnerPopoverName>{winnerName}</WinnerPopoverName>
            </WinnerPopoverText>
            <WinnerPopoverText>
              1st Group: <WinnerPopoverName>{firstGroup}</WinnerPopoverName>
            </WinnerPopoverText>
          </PopoverContent>
        </PopoverAnchor>
      </TabsHeader>
      <TabContainer>{renderContent}</TabContainer>
    </Container>
  );
};

export default function ClassroomSection() {
  return <StudentList />;
}
