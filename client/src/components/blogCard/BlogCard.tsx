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
          <img
            src="https://instagram.fdel6-1.fna.fbcdn.net/v/t51.2885-19/489456817_1707886896459751_1758576604468017163_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fdel6-1.fna.fbcdn.net&_nc_cat=107&_nc_oc=Q6cZ2QFz4FmNAFco5vn0Qkhg_OGOqjwCCyZDDgpFPTfz7w72lc2kn5vqAnP-xx0IQQA5gD8&_nc_ohc=cnGCuY00VTsQ7kNvwFoB8sc&_nc_gid=BHRbPQgcfForYy_tT5bqow&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfPRpTlJMsNzww-G2O5EtBZk-RTi6eNgg_m4KxUMqi78Vg&oe=6851A1CF&_nc_sid=8b3546"
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
