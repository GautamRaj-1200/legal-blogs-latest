import styles from './CustomInput.module.css';

interface CustomInputProps {
  type: string;
  name: string;
  label: string;
  value: string;
  error: string;
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
  className = '',
  onChange = () => undefined,
  onFocus = () => undefined,
  onBlur = () => undefined,
}: CustomInputProps) => {
  return (
    <>
      <div className={styles.group}>
        <input
          type={type}
          id={label}
          name={name}
          className={`${styles['group-input']} ${className}`}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
        <label htmlFor={label}>{label}</label>
        <div className={`${styles['error-container']} ${error ? styles['has-error'] : ''}`}>
          <p className={styles['input-error']}>{error}</p>
        </div>
      </div>
    </>
  );
};

export default CustomInput;
