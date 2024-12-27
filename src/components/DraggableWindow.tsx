import { MouseEvent, ReactNode, useCallback, useState } from 'react';
import styled from 'styled-components';

const DraggableContainer = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  cursor: move;
  user-select: none;
`;

type DraggableWindowProps = {
  children: ReactNode;
  initialX?: number;
  initialY?: number;
  isOpen: boolean;
};

function DraggableWindow({ children, initialX = 0, initialY = 0, isOpen }: DraggableWindowProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    },
    [isDragging, dragOffset]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return isOpen ? (
    <DraggableContainer
      $x={position.x}
      $y={position.y}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}
    </DraggableContainer>
  ) : null;
}

export default DraggableWindow;
