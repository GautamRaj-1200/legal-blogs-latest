import { ChangeEvent, FocusEvent, useState } from 'react';
import Button from '../common/button/Button';
import CustomInput from '../common/input/CustomInput';
import Otp from '../common/otp/Otp';
import styles from './VerifyEmailOtp.module.css';
import { instance } from '../../api/apiInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface OtpValidationResponse {
  message: number;
}

const VerifyEmailOtp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const validateField = (name: string, value: string): string => {
    if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) return 'Invalid email format';
    return '';
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    setError(error);
  };

  const handleVerifyClick = async () => {
    const otpValue = otp.join('');
    if (!email || error || otpValue.length < 6) {
      toast.error('Please enter a valid email and complete the OTP');
      return;
    }
    try {
      const response = await instance.post<OtpValidationResponse>('/auth/otp/validations', {
        email,
        otp: Number(otpValue),
      });
      toast.success(response.data.message);
      await navigate('/login');
    } catch (error) {
      let errorMsg = 'Verification failed';
      if (error instanceof Error) {
        errorMsg = error.message;
      }
      toast.error(errorMsg);
    }
  };

  return (
    <section className={styles['verify__email-otp']}>
      <h2>Verify Email</h2>
      <CustomInput
        type="email"
        name="email"
        label="Your email"
        error={error}
        hint=""
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Otp otp={otp} setOtp={setOtp} />
      <div className="btn__container">
        <Button onClick={() => void handleVerifyClick()}>Verify</Button>
      </div>
    </section>
  );
};

export default VerifyEmailOtp;
