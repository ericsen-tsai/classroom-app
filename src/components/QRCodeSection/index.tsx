import { useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoCloseSharp } from 'react-icons/io5';
import { MdOutlineContentCopy, MdKeyboardArrowLeft } from 'react-icons/md';
import QRCode from 'react-qr-code';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem 1.5rem;
  width: 25rem;
  min-width: 25rem;
  position: relative;
  cursor: default;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: move;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: auto;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-right: 0.25rem;
  }
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 0.625rem;
  text-align: center;
`;

const SubTitle = styled.div`
  font-size: 0.75rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Version = styled.p`
  font-size: 0.75rem;
  margin-top: 0.625rem;
  align-self: center;
  color: ${({ theme }) => theme.colors.caption};
`;

const IconButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary}80`};
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

const QRCodeContainer = styled.div`
  background: white;
  padding: 16px;
  margin-top: 0.5rem;
  align-self: center;
  border-radius: 8px;
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

function QRCodeComponent({ onClose }: { onClose: () => void }) {
  const copyToClipboard = useCallback(async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(message);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  }, []);
  return (
    <Container>
      <Toaster position="top-center" />
      <Header>
        <BackButton onClick={() => alert('Back to class list')}>
          <MdKeyboardArrowLeft /> Back to Class List
        </BackButton>
        <CloseButton onClick={onClose}>
          <IoCloseSharp size={20} />
        </CloseButton>
      </Header>
      <Title>Join 302 Science</Title>
      <Flex>
        <SubTitle>
          ID: X58E9647
          <IconButton onClick={() => void copyToClipboard('X58E9647', 'Copied to clipboard')}>
            <MdOutlineContentCopy />
          </IconButton>
        </SubTitle>
        <SubTitle>
          Link
          <IconButton
            onClick={() =>
              void copyToClipboard('https://www.classswift.viewsonic.io/', 'Copied to clipboard')
            }
          >
            <MdOutlineContentCopy />
          </IconButton>
        </SubTitle>
      </Flex>
      <QRCodeContainer>
        <QRCode value="https://www.classswift.viewsonic.io/" size={256} />
      </QRCodeContainer>
      <Version>Version 1.1.7</Version>
    </Container>
  );
}

export default QRCodeComponent;
