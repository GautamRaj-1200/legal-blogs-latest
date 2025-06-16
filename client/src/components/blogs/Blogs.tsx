import { useEffect, useState } from 'react';
import styles from './Blogs.module.css';
import BlogCard from '../blogCard/BlogCard';
import { instance } from '../../api/apiInstance';

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

interface PostsResponse {
  success: boolean;
  message: string;
  data: {
    data: Post[];
    total: number;
    page: number;
    totalPages: number;
  };
}

const Blogs = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await instance.get<PostsResponse>('/posts');
        if (response.data.success) {
          setPosts(response.data.data.data);
        } else {
          setError('Failed to load posts');
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    void fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="content-container">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-container">
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="content-container">
        <h1 className={styles.blogs}>Blogs</h1>
        <section className={styles.grid}>
          <div className={styles.grid__container}>
            {posts.map((post) => (
              <div className={styles.grid__item} key={post._id}>
                <BlogCard
                  imgSrc={post.coverImage}
                  imgAlt={post.title}
                  author={`${post.author.firstName} ${post.author.lastName}`}
                  date={new Date(post.createdAt).toLocaleDateString()}
                  title={post.title}
                  categories={post.categories.map((cat) => cat.categoryName)}
                  postId={post._id}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Blogs;
