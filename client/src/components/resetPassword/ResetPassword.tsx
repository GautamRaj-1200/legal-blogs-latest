import Button from '../common/button/Button';
import Otp from '../common/otp/Otp';
import styles from './ResetPassword.module.css';
import { useState } from 'react';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');

  return (
    <>
      <section className={styles['reset__password-otp']}>
        <h2>Reset Password</h2>
        <Otp
          otp={otp.split('')}
          setOtp={(value: string[]) => {
            setOtp(value.join(''));
          }}
        />
        <div className="btn__container">
          <Button>Reset</Button>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
