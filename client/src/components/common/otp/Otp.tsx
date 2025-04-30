// Otp.tsx
import styles from './Otp.module.css';
import { useEffect, useRef } from 'react';

interface OtpProps {
  otp: string[];
  setOtp: (otp: string[]) => void;
}

const Otp: React.FC<OtpProps> = ({ otp, setOtp }) => {
  const OTP_DIGITS_COUNT = 6;
  const inputRefArray = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefArray.current[0]?.focus();
  }, []);

  const handleOnChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newValue = value.trim();
    const newOtp = [...otp];
    newOtp[index] = newValue.slice(-1);
    setOtp(newOtp);

    if (newValue && index < OTP_DIGITS_COUNT - 1) {
      inputRefArray.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (!e.currentTarget.value && e.key === 'Backspace') {
      inputRefArray.current[index - 1]?.focus();
    }
  };

  return (
    <div className={styles.otp}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className={styles.otp__input}
          value={digit}
          onChange={(e) => {
            handleOnChange(e.target.value, index);
          }}
          onKeyDown={(e) => {
            handleBackspace(e, index);
          }}
          ref={(input) => {
            inputRefArray.current[index] = input;
          }}
        />
      ))}
    </div>
  );
};

export default Otp;
