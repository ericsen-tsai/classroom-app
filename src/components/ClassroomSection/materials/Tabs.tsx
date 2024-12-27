import styled from 'styled-components';

export const TabContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 1rem 0.5rem 1.5rem 0.5rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 100%;
`;

const TabList = styled.div`
  display: flex;
  gap: 4px;
`;

const Tab = styled.button<{ $isActive?: boolean }>`
  padding: 8px 24px;
  border-radius: 6px;
  font-weight: 600;
  background-color: ${(props) => (props.$isActive ? 'white' : props.theme.colors.disabled)};
  color: ${(props) => (props.$isActive ? props.theme.colors.primary : props.theme.colors.caption)};
  transition: background-color 0.2s;
  border: none;
  border-radius: 4px 4px 0 0;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;

type TabsProps = {
  tabValue: string;
  onTabValueChange: (tab: string) => void;
  tabs: {
    label: string;
    value: string;
  }[];
};

export function Tabs({ tabValue, onTabValueChange: onTabChange, tabs }: TabsProps) {
  return (
    <TabList>
      {tabs.map((tab) => (
        <Tab
          $isActive={tab.value === tabValue}
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
        </Tab>
      ))}
    </TabList>
  );
}
