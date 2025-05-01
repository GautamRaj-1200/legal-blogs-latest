import React from 'react';
import styles from './BlogCard.module.css';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  imgSrc: string;
  imgAlt: string;
  author: string;
  date: string;
  title: string;
  categories: string[];
}

const BlogCard: React.FC<BlogCardProps> = ({ imgSrc, imgAlt, author, date, title, categories }) => {
  return (
    <div className={styles.blog__card}>
      <div className={styles['blog__card-img-container']}>
        <img src={imgSrc} alt={imgAlt} />
      </div>
      <div className={styles['blog__card-category']}>
        {categories.map((category) => (
          <span key={category}>{category}</span>
        ))}
      </div>
      <h3 className={styles['blog__card-title']}>
        {title ? (
          <>
            {title.slice(0, 70)}...<Link to=""> Read More</Link>
          </>
        ) : (
          ''
        )}
      </h3>
      <div className={styles['blog__card-profile']}>
        <div className={styles['blog__card-profile--image']}>
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fHww"
            alt=""
          />
        </div>
        <div className={styles['blog__card-profile--author-date']}>
          <p className={styles['blog__card-profile--author']}>{author}</p>
          <p className={styles['blog__card-profile--date']}>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
