import { Link } from 'react-router-dom';
import styles from './LinkButton.module.css';
import { FaArrowRight } from 'react-icons/fa';
type ButtonVariant = 'primary' | 'outlined' | 'transparent';

interface ButtonProps {
  children: React.ReactNode;
  to: string;
  variant?: ButtonVariant;
  className?: string;
  target?: string;
  onClick?: () => void;
}

const LinkButton: React.FC<ButtonProps> = ({
  children,
  to,
  variant = 'primary',
  className = '',
  target = '_self',
  onClick,
}) => {
  return (
    <Link
      to={to}
      target={target}
      className={`${styles.linkBtn} ${styles[variant] || ''} ${className}`}
      onClick={onClick}
    >
      {children}
      <FaArrowRight />
    </Link>
  );
};

export default LinkButton;
