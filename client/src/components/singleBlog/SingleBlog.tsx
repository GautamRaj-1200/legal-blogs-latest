import styles from './SingleBlog.module.css';

interface SingleBlogProps {
  title: string;
  image: string;
  author: {
    name: string;
    image: string;
  };
  date: string;
  description: string;
}

const SingleBlog = ({ title, image, author, date, description }: SingleBlogProps) => {
  return (
    <>
      <div className="content-container">
        <section className={styles.single__blog}>
          <div className={styles.single__blog__container}>
            <div className={styles.single__blog__image}>
              <img src={image} alt="blog" />
            </div>
            <div className={styles.single__blog__header}>
              <h1 className={styles.single__blog__title}>{title}</h1>
            </div>
            <div className={styles.single__blog__author}>
              <div className={styles.single__blog__author__image}>
                <img src={author.image} alt="author" />
              </div>
              <div className={styles.single__blog__author__info}>
                <p className={styles.single__blog__author__name}>{author.name}</p>
                <p className={styles.single__blog__author__date}>
                  <span>{date}</span>
                </p>
              </div>
            </div>
            <div className={styles.single__blog__content}>
              <p className={styles.single__blog__description}>{description}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SingleBlog;
