import styles from './Button.module.css';
import { FaArrowRight } from 'react-icons/fa';
type ButtonVariant = 'primary' | 'outlined' | 'transparent';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant] || ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {children}
      <FaArrowRight />
    </button>
  );
};

export default Button;
