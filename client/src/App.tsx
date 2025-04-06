import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import ForgotPassword from './components/forgotPassword/ForgotPassword';

function App() {
  return (
    <>
      <div className="app-container">
        <div className="content-container">
          <Header />
          <Routes>
            <Route path="/" element={''} />
            <Route path="/about" element={''} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
