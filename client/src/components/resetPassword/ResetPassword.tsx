import Button from '../common/button/Button';
import Otp from '../common/otp/Otp';
import styles from './ResetPassword.module.css';

const ResetPassword = () => {
  return (
    <>
      <section className={styles['reset__password-otp']}>
        <h2>Reset Password</h2>
        <Otp />
        <div className="btn__container">
          <Button>Reset</Button>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
