import Signin from '../../components/signin/Signin';
import styles from './Login.module.css';

const Login = () => {
  return (
    <section className={`${styles.login} full-width-bg`}>
      <Signin />
    </section>
  );
};

export default Login;
