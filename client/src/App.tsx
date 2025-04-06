import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import VerifyEmailOtp from './components/verifyOtp/VerifyEmailOtp';
import ResetPassword from './components/resetPassword/ResetPassword';

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
            <Route path="/verify-email" element={<VerifyEmailOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
