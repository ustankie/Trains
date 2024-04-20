import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Xdddd from './components/xdddd.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Xdddd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;