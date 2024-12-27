import { useEffect, useRef, RefObject } from 'react';
import styled from 'styled-components';

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handleOnClickOutside: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handleOnClickOutside(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handleOnClickOutside]);
};

export const PopoverAnchor = styled.div`
  position: relative;
`;

export const PopoverButton = styled.button`
  margin-left: auto;
  padding: 4px 8px;
  border-radius: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    background: #e0e0e0;
  }
`;

const Popover = styled.div<{ $show: boolean }>`
  position: absolute;
  right: 8px;
  top: 24px;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.$show ? 'block' : 'none')};
  z-index: 1000;
  width: max-content;
`;

export function PopoverContent({
  children,
  show,
  onClose,
}: {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);
  return (
    <Popover $show={show} ref={ref}>
      {children}
    </Popover>
  );
}
