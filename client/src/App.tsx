import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={''} />
          <Route path="/about" element={''} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
