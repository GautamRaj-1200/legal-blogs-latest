import styles from './CustomInput.module.css';

interface CustomInputProps {
  type: string;
  name: string;
  label: string;
  value: string;
  error: string;
  hint: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  type,
  name,
  label,
  value,
  error,
  hint,
  className = '',
  onChange,
  onFocus,
  onBlur,
}: CustomInputProps) => {
  return (
    <div className={styles.group}>
      <label htmlFor={name} className={styles['input-label']}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={`${styles['group-input']} ${className}`}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
      {/* Hint Message (Only show when no error is present) */}
      <div className={`${styles['hint-container']} ${hint && !error ? styles['show-hint'] : ''}`}>
        <p className={styles['input-hint']}>{hint}</p>
      </div>
      {/* Error Message */}
      <div className={`${styles['error-container']} ${error ? styles['has-error'] : ''}`}>
        <p className={styles['input-error']}>{error}</p>
      </div>
    </div>
  );
};

export default CustomInput;
