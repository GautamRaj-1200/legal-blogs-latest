import styles from './Signin.module.css';
import { FaUser } from 'react-icons/fa';
import LinkButton from '../common/linkButton/LinkButton';
import CustomInput from '../common/input/CustomInput';
import Button from '../common/button/Button';
import { ChangeEvent, useState } from 'react';

const Signin = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const hints = {
    email: 'Enter a valid email address.',
    password: 'We hope you remember your password',
  };

  const [showHint, setShowHint] = useState({
    email: false,
    password: false,
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
    if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      error = 'Invalid email format';
    }
    if (name === 'password' && !value.trim()) {
      error = 'Password is required';
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
      <div className={styles.signin}>
        <div className={styles.signin__container}>
          <div className={styles.signin__header}>
            <div className={styles.signin__icon}>
              <FaUser className={styles['signin__icon-user']} />
            </div>
            <h1 className={styles.signin__title}>Sign in to your account</h1>
            <p className={styles.signin__login}>
              <span>Don't have an account?</span>
              <LinkButton to="/register" variant="transparent">
                Sign Up
              </LinkButton>
            </p>
          </div>
          <div className={styles.signin__content}>
            <p className={styles.signin__instruction}>Enter your email address to sign in</p>
            <form onSubmit={handleSubmit} className={styles.signin__form}>
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
              <div className={styles.signin__terms}>
                <div className={styles.signin__button}>
                  <Button type="submit" variant="outlined">
                    Get Started
                  </Button>
                </div>
                <div className={styles.signin__checkbox}>
                  <input type="checkbox" id="terms" name="terms" checked />
                  <label htmlFor="terms" className={styles['signin__checkbox-label']}>
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

export default Signin;
