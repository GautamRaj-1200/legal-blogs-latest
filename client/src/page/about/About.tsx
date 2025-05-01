import styles from './About.module.css';
import profile from '../../assets/profile_image.jpeg';
const About = () => {
  return (
    <>
      <div className="content-container">
        <section className={styles.about}>
          <h1>About me</h1>
          <div className={styles.about__desc}>
            <p>Whether it's the rule of law or the rules of the game</p>
            <p>— if it shapes society, I'm writing about it.</p>
            <p>
              <span>~ Rohan</span>
            </p>
          </div>
          <div className={styles['about__profile-wrapper']}>
            <div className={styles.about__profile}>
              <div className={styles['about__profile-image']}>
                <img src={profile} alt="" />
              </div>
              <p>
                I'm a lawyer by profession with a passion for writing about the things I study and
                the world I observe.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
