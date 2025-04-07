import Signup from '../../components/signup/Signup';
import styles from './Register.module.css';

const Register = () => {
  return (
    <>
      <section className={`${styles.register} full-width-bg`}>
        <Signup />
      </section>
    </>
  );
};

export default Register;
