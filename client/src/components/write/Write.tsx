import React, { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/auth/AuthContext';
import styles from './Write.module.css';
import CustomInput from '../common/input/CustomInput';
import Button from '../common/button/Button';
import { instance } from '../../api/apiInstance';
interface PostResponse {
  data: {
    _id: string;
  };
}

interface CategoryResponse {
  data: Category[];
}

interface Category {
  categoryName: string;
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
        const res = await instance.get<CategoryResponse>('/categories/all-categories');
        console.log(res.data.data[0].categoryName);
        setCategories(res.data.data.map((category) => category.categoryName));
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
      const res = await instance.post<PostResponse>('/posts/post', formData, {
        headers: {
          'Content-Type': undefined,
        },
      });
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
            <div className={styles.write__categories__container}>
              {/* <h3 className={styles.write__categories__heading}>Categories</h3> */}
              <div className={styles.write__categories__list}>
                {categories.map((category) => (
                  <span
                    key={category}
                    className={`${styles.write__category__item} ${
                      selectedCategories.includes(category)
                        ? styles.write__category__item_selected
                        : ''
                    }`}
                    onClick={() => {
                      handleCategoryToggle(category);
                    }}
                  >
                    {category}
                  </span>
                ))}
              </div>
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
