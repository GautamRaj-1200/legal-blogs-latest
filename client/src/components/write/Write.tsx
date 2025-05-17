import React, { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/auth/AuthContext';
import styles from './Write.module.css';
import CustomInput from '../common/input/CustomInput';
import Button from '../common/button/Button';
interface PostResponse {
  data: {
    _id: string;
  };
}

interface CategoryResponse {
  data: {
    category: string[];
  }[];
}

const Write: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get<CategoryResponse>(
          `${import.meta.env.VITE_API_URL as string}/categories/all-categories`
        );
        setCategories(res.data.data.map((category) => category.category[0]));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    void fetchCategories();
  }, []);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (value: string) => {
    setDesc(value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }
    formData.append('title', title);
    formData.append('desc', desc);
    if (user) {
      formData.append('username', user.firstName + ' ' + user.lastName);
    }
    for (const category of selectedCategories) {
      formData.append('categories[]', category);
    }

    try {
      const res = await axios.post<PostResponse>(
        String(import.meta.env.VITE_API_URL) + '/posts/create',
        formData,
        {
          withCredentials: true,
        }
      );
      const postId = res.data.data._id;
      if (typeof postId === 'string') {
        void navigate(`/posts/post/${postId}`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="content-container">
        <section className={styles.write}>
          <form onSubmit={(e) => void handleSubmit(e)} className={styles.write__form}>
            <div>
              <CustomInput
                type="text"
                name="title"
                label="Title"
                value={title}
                onChange={handleTitleChange}
                error=""
                hint={''}
              />
            </div>
            <div className={styles.write__file__input__container}>
              <label htmlFor="coverImage" className={styles.write__file__label}>
                Cover Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.write__file__input}
              />
            </div>
            <div>
              {categories.map((category) => (
                <span
                  key={category}
                  onClick={() => {
                    handleCategoryToggle(category);
                  }}
                >
                  {category}
                </span>
              ))}
            </div>
            <div className={styles.write__quill__container}>
              <ReactQuill
                theme="snow"
                value={desc}
                onChange={handleDescChange}
                className={styles.write__quill}
              />
            </div>
            <div className={styles.write__button__container}>
              <Button type="submit" disabled={loading}>
                {loading ? 'Publishing...' : 'Publish'}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Write;
