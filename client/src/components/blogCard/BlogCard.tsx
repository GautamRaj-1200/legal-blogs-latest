import React from 'react';
import styles from './BlogCard.module.css';
import { Link } from 'react-router-dom';
import { AWS_URL } from '../../utils/constants';

interface BlogCardProps {
  imgSrc: string;
  imgAlt: string;
  author: string;
  date: string;
  title: string;
  categories: string[];
  postId: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  imgSrc,
  imgAlt,
  author,
  date,
  title,
  categories,
  postId,
}) => {
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
            {title.slice(0, 70)}...<Link to={`/posts/post/${postId}`}> Read More</Link>
          </>
        ) : (
          ''
        )}
      </h3>
      <div className={styles['blog__card-profile']}>
        <div className={styles['blog__card-profile--image']}>
          <img src={`${AWS_URL}/rohan-dp.jpg`} alt="" />
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
