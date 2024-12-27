import { useState } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import ClassroomSection from './components/ClassroomSection';
import DraggableWindow from './components/DraggableWindow';
import QRCodeSection from './components/QRCodeSection';
import { store } from './store/store';

const AppContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  overflow-x: auto;
  min-height: 100vh;
  min-width: 65rem;
`;

function App() {
  const [isQRCodeSectionOpen, setIsQRCodeSectionOpen] = useState(true);
  const [isClassroomSectionOpen, setIsClassroomSectionOpen] = useState(true);
  return (
    <Provider store={store}>
      <AppContainer>
        <DraggableWindow initialX={300} initialY={300} isOpen={isQRCodeSectionOpen}>
          <QRCodeSection onClose={() => void setIsQRCodeSectionOpen(false)} />
        </DraggableWindow>
        <DraggableWindow initialX={720} initialY={300} isOpen={isClassroomSectionOpen}>
          <ClassroomSection onClose={() => void setIsClassroomSectionOpen(false)} />
        </DraggableWindow>
      </AppContainer>
    </Provider>
  );
}

export default App;
