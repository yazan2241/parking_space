import AddSpace from "./pages/AddSpace";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpaceProvider } from './providers/SpaceProvider';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#fdfdfd] h-screen flex flex-col items-center justify-start">
      <SpaceProvider>
        <Routes>
          <Route path="/add" element={<AddSpace />} />
          <Route path="/update/:id" element={<AddSpace />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </SpaceProvider>

      <Footer />
    </div>
  );
}

export default App;
