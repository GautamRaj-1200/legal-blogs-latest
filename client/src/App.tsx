import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import VerifyEmailOtp from './components/verifyOtp/VerifyEmailOtp';
import ResetPassword from './components/resetPassword/ResetPassword';
import Register from './page/register/Register';
import Login from './page/login/Login';
import PageNotFound from './page/pageNotFound/PageNotFound';
import Blogs from './components/blogs/Blogs';

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={''} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmailOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Blogs />
      </div>
    </>
  );
}

export default App;
