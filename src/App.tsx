import { Provider } from 'react-redux';
import styled from 'styled-components';

import ClassroomSection from './components/ClassroomSection';
import QRCodeSection from './components/QRCodeSection';
import { store } from './store/store';

const AppContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 100vh;
`;

function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <QRCodeSection />
        <ClassroomSection />
      </AppContainer>
    </Provider>
  );
}

export default App;
