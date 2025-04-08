import React from 'react';
import styles from './BlogCard.module.css';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  imgSrc: string;
  imgAlt: string;
  author: string;
  date: string;
  desc: string;
  categories: string[];
}

const BlogCard: React.FC<BlogCardProps> = ({ imgSrc, imgAlt, author, date, desc, categories }) => {
  return (
    <div className={styles.blog__card}>
      <div className={styles['blog__card-img-container']}>
        <img src={imgSrc} alt={imgAlt} />
      </div>
      <div className={styles['blog__card-author-date']}>
        <p className={styles['blog__card-author']}>{author}</p>
        <p className={styles['blog__card-date']}>{date}</p>
      </div>
      <p className={styles['blog__card-desc']}>
        {desc ? (
          <>
            {desc.slice(0, 250)}...<Link to=""> Read More</Link>
          </>
        ) : (
          ''
        )}
      </p>
      <div className={styles['blog__card-category']}>
        {categories.map((category) => (
          <span key={category}>{category}</span>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
