import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../api/apiInstance';
import styles from './Post.module.css';

interface Category {
  _id: string;
  categoryName: string;
}

interface Post {
  _id: string;
  title: string;
  desc: string;
  coverImage: string;
  author: {
    firstName: string;
    lastName: string;
  };
  categories: Category[];
  createdAt: string;
}

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) return;
        const response = await instance.get<{ data: Post }>(`/posts/post/${id}`);
        setPost(response.data.data);
      } catch (err) {
        setError('Failed to load post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    void fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.error}>
        <p>{error ?? 'Post not found'}</p>
      </div>
    );
  }

  return (
    <div className="content-container">
      <article className={styles.post}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span className={styles.author}>
              By {post.author.firstName} {post.author.lastName}
            </span>
            <span className={styles.date}>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className={styles.categories}>
            {post.categories.map((category) => (
              <span key={category._id} className={styles.category}>
                {category.categoryName}
              </span>
            ))}
          </div>
        </header>
        {post.coverImage && (
          <div className={styles.coverImage}>
            <img src={post.coverImage} alt={post.title} />
          </div>
        )}
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.desc }} />
      </article>
    </div>
  );
};

export default Post;
