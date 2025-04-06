import CustomInput from '../common/input/CustomInput';
import styles from './ForgotPassword.module.css';
import { ChangeEvent, useState } from 'react';
import Button from '../common/button/Button';
const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <section className={styles.forgot__password}>
        <CustomInput
          type="email"
          name="email"
          label="Your Email"
          value={email}
          onChange={handleEmailChange}
          error=""
          hint=""
        ></CustomInput>
        <Button>Send Otp</Button>
      </section>
    </>
  );
};

export default ForgotPassword;
