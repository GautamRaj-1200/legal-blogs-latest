import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import VerifyEmailOtp from './components/verifyOtp/VerifyEmailOtp';
import ResetPassword from './components/resetPassword/ResetPassword';
import Register from './page/register/Register';
import Login from './page/login/Login';
import PageNotFound from './page/pageNotFound/PageNotFound';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import AuthContext from './contexts/auth/AuthContext';
import Home from './page/home/Home';
import About from './page/about/About';
import Contact from './page/contact/Contact';
import Write from './components/write/Write';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmailOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/write" element={<Write />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}

export default App;
