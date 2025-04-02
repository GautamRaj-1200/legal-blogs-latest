import CustomInput from '../common/input/CustomInput';
import { ChangeEvent, useState } from 'react';
import LinkButton from '../common/linkButton/LinkButton';
import Button from '../common/button/Button';
import styles from './Signup.module.css';
import { FaUser } from 'react-icons/fa';

const Signup = () => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const hints = {
    fullName: 'Should be at least 3 characters',
    email: 'Enter a valid email address.',
    password: 'Use at least 8 characters, including a number and symbol.',
    confirmPassword: 'Must match the password.',
  };

  const [showHint, setShowHint] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'fullName' && value.length < 3) {
      error = 'Invalid Name';
    }
    if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      error = 'Invalid email format';
    }
    if (name === 'password' && value.length < 8) {
      error = 'Password must be at least 8 characters long';
    }
    if (name === 'confirmPassword' && value !== formValues.password) {
      error = 'Passwords do not match';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setShowHint((prevHints) => ({
      ...prevHints,
      [name]: true,
    }));
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setShowHint((prevHints) => ({
      ...prevHints,
      [name]: false,
    }));
    validateField(name, value);
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
                error={errors.fullName}
                hint={showHint.fullName ? hints.fullName : ''}
                value={formValues.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
              <CustomInput
                type="email"
                name="email"
                label="Your email"
                error={errors.email}
                hint={showHint.email ? hints.email : ''}
                value={formValues.email}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
              <CustomInput
                type="password"
                name="password"
                label="Password"
                error={errors.password}
                hint={showHint.password ? hints.password : ''}
                value={formValues.password}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
              <CustomInput
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                error={errors.confirmPassword}
                hint={showHint.confirmPassword ? hints.confirmPassword : ''}
                value={formValues.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
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
