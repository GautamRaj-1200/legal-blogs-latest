import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Signup from './components/signup/Signup';

function App() {
  return (
    <>
      <div className="app-container">
        <div className="content-container">
          <Header />
          <Routes>
            <Route path="/" element={''} />
            <Route path="/about" element={''} />
          </Routes>
          <Signup />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
