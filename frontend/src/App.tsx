import { BrowserRouter } from 'react-router-dom';
import { CustomRouter } from './components/CustomRouter';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <BrowserRouter>
      <CustomRouter />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
