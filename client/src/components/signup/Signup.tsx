import CustomInput from '../common/input/CustomInput';
import { ChangeEvent, useState } from 'react';
import LinkButton from '../common/linkButton/LinkButton';
import Button from '../common/button/Button';
import styles from './Signup.module.css';
import { FaUser } from 'react-icons/fa';
import { instance } from '../../api/apiInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface SignupResponse {
  message: string;
}
const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const hints = {
    firstName: 'Should be at least 3 characters',
    lastName: 'Should be at least 3 characters',
    email: 'Enter a valid email address.',
    password: 'Use at least 8 characters, including a number and symbol.',
    confirmPassword: 'Must match the password.',
  };

  const [showHint, setShowHint] = useState({
    firstName: false,
    lastName: false,
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

  const validateField = (name: string, value: string): string => {
    if (name === 'firstName' && value.length < 3) return 'Invalid Name';
    if (name === 'lastName' && value.length < 3) return 'Invalid Name';
    if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) return 'Invalid email format';
    if (name === 'password' && value.length < 8)
      return 'Password must be at least 8 characters long';
    if (name === 'confirmPassword' && value !== formValues.password)
      return 'Passwords do not match';
    return '';
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

    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const newErrors: typeof errors = {
      firstName: validateField('firstName', formValues.firstName),
      lastName: validateField('lastName', formValues.lastName),
      email: validateField('email', formValues.email),
      password: validateField('password', formValues.password),
      confirmPassword: validateField('confirmPassword', formValues.confirmPassword),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (hasErrors) return;

    try {
      const response = await instance.post<SignupResponse>('/auth/users', formValues);
      console.log('Success:', response.data.message);
      toast.success(response.data.message);
      await navigate('/login');
    } catch (error) {
      let errorMsg = 'Failed';
      if (error instanceof Error) {
        errorMsg = error.message;
        toast.error(errorMsg);
        console.log(`Couldn't register`, errorMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
          <form
            onSubmit={(e) => {
              void handleSubmit(e);
            }}
            className={styles.signup__form}
          >
            <CustomInput
              type="text"
              name="firstName"
              label="First Name"
              error={errors.firstName}
              hint={showHint.firstName ? hints.firstName : ''}
              value={formValues.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
            <CustomInput
              type="text"
              name="lastName"
              label="Last Name"
              error={errors.lastName}
              hint={showHint.lastName ? hints.lastName : ''}
              value={formValues.lastName}
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
                <Button type="submit" variant="outlined" disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Get Started'}
                </Button>
              </div>
              <div className={styles.signup__checkbox}>
                <input type="checkbox" id="terms" name="terms" defaultChecked />
                <label htmlFor="terms" className={styles['signup__checkbox-label']}>
                  I agree to platform's Terms of Service and Privacy Policy
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
