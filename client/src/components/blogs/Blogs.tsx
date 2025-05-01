import styles from './Blogs.module.css';
import BlogCard from '../blogCard/BlogCard';
const Blogs = () => {
  const BLOG_CARDS = Array.from({ length: 8 }, (_, index) => index);
  return (
    <>
      <div className="content-container">
        <h1 className={styles.blogs}>Blogs</h1>
        <section className={styles.grid}>
          <div className={styles.grid__container}>
            {BLOG_CARDS.map((index) => (
              <div className={styles.grid__item} key={index}>
                <BlogCard
                  imgSrc="https://images.unsplash.com/photo-1743076851851-0762b336b56d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                  imgAlt=""
                  author="Rohan"
                  date="15 Apr 2016"
                  title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  categories={['law', 'cricket', 'administration']}
                />{' '}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
export default Blogs;
