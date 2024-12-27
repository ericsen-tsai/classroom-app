import { useState } from 'react';
import { styled } from 'styled-components';

const Card = styled.div<{ $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f9f9;

  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};
  min-height: 6rem;
`;

const CardHeader = styled.div<{ $disabled?: boolean }>`
  background-color: ${(props) =>
    props.$disabled ? props.theme.colors.disabled : props.theme.colors.primary};
  color: white;
  width: 100%;
  text-align: center;
  padding: 5px 0;
  font-size: 0.8rem;
  font-weight: bold;
`;

const CardBody = styled.div`
  padding: 10px;
  text-align: center;
  font-size: 1rem;
  color: #333;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px;
  background-color: #fff;
  border-top: 1px solid #ddd;
`;

const FooterButton = styled.button<{ $increment?: boolean; $disabled?: boolean }>`
  background-color: ${(props) =>
    props.$disabled
      ? props.theme.colors.disabled
      : props.$increment
        ? props.theme.colors.positive
        : props.theme.colors.negative};

  color: white;
  border: none;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.8rem;
  cursor: pointer;
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};
  &:hover {
    opacity: 0.8;
  }
`;

const Counter = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

type ScoreProps = {
  name: string;
  initialCount: number;
  title: string;
  disabled?: boolean;
};

function Score({ name, initialCount, title, disabled }: ScoreProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <Card $disabled={disabled}>
      <CardHeader $disabled={disabled}>{title}</CardHeader>
      <CardBody>{name}</CardBody>
      <CardFooter>
        <FooterButton onClick={() => setCount(count - 1)} $disabled={disabled}>
          -1
        </FooterButton>
        <Counter>{count}</Counter>
        <FooterButton $increment onClick={() => setCount(count + 1)} $disabled={disabled}>
          +1
        </FooterButton>
      </CardFooter>
    </Card>
  );
}

export default Score;
