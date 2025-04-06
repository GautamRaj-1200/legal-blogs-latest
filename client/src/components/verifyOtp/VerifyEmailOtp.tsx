import Button from '../common/button/Button';
import Otp from '../common/otp/Otp';
import styles from './VerifyEmailOtp.module.css';

const VerifyEmailOtp = () => {
  return (
    <>
      <section className={styles['verify__email-otp']}>
        <h2>Verify Email</h2>
        <Otp />
        <div className="btn__container">
          <Button>Verify</Button>
        </div>
      </section>
    </>
  );
};

export default VerifyEmailOtp;
