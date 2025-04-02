import CustomInput from '../common/input/CustomInput';
import { ChangeEvent, useState } from 'react';
import LinkButton from '../common/linkButton/LinkButton';
import Button from '../common/button/Button';
import styles from './Signup.module.css';
import { FaUser } from 'react-icons/fa';

const Signup = () => {
  const [nameValue, setNameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value);
  };
  const handleNameBlur = () => {
    console.log('Handle Name Blur');
  };
  const handleNameFocus = () => {
    console.log('Handle Name Focus');
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
  const handleEmailBlur = () => {
    console.log('Handle Email Blur');
  };
  const handleEmailFocus = () => {
    console.log('Handle Email Blur');
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };
  const handlePasswordBlur = () => {
    console.log('Handle Password Blur');
  };
  const handlePasswordFocus = () => {
    console.log('Handle Password Focus');
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswordValue(event.target.value);
  };

  const handleConfirmPasswordBlur = () => {
    console.log('Handle ConfirmPassword Blur');
  };
  const handleConfirmPasswordFocus = () => {
    console.log('Handle ConfirmPassword Focus');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <div className={styles.signup}>
        <div className={styles.signup__container}>
          <div className={styles.signup__header}>
            <div className={styles.signup__icon}>
              <FaUser className={styles['signup__icon-user']} />
            </div>
            <h1 className={styles.signup__title}>Create an account</h1>
            <p className={styles.signup__login}>
              <span>Already have an account?</span>
              <LinkButton to="/login" variant="transparent">
                Log in
              </LinkButton>
            </p>
          </div>
          <div className={styles.signup__content}>
            <p className={styles.signup__instruction}>
              Enter your email address to create your account
            </p>
            <form onSubmit={handleSubmit} className={styles.signup__form}>
              <CustomInput
                type="text"
                name="fullName"
                label="Full Name"
                error={''}
                hint={''}
                value={nameValue}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                onFocus={handleNameFocus}
              />
              <CustomInput
                type="email"
                name="email"
                label="Your email"
                error={''}
                hint={''}
                value={emailValue}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                onFocus={handleEmailFocus}
              />
              <CustomInput
                type="password"
                name="password"
                label="Password"
                error={''}
                hint={''}
                value={passwordValue}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                onFocus={handlePasswordFocus}
              />
              <CustomInput
                type="password"
                name="password"
                label="Confirm Password"
                error={''}
                hint={''}
                value={confirmPasswordValue}
                onChange={handleConfirmPasswordChange}
                onBlur={handleConfirmPasswordBlur}
                onFocus={handleConfirmPasswordFocus}
              />
              <div className={styles.signup__terms}>
                <div className={styles.signup__button}>
                  <Button type="submit" variant="outlined">
                    Get Started
                  </Button>
                </div>
                <div className={styles.signup__checkbox}>
                  <input type="checkbox" id="terms" name="terms" checked />
                  <label htmlFor="terms" className={styles['signup__checkbox-label']}>
                    I agree to platform's Terms of Service and Privacy Policy
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
