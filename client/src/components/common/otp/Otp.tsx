import styles from './Otp.module.css';
import { useEffect, useRef, useState } from 'react';

const Otp: React.FC = () => {
  const OTP_DIGITS_COUNT = 6;
  const [inputArr, setInputArr] = useState<string[]>(new Array(OTP_DIGITS_COUNT).fill(''));

  const inputRefArray = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefArray.current[0]?.focus();
  }, []);

  const handleOnChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newValue = value.trim();
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);
    if (newValue) {
      inputRefArray.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (!e.currentTarget.value && e.key === 'Backspace') {
      inputRefArray.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <div className={styles.otp}>
        {inputArr.map((inputValue, index) => (
          <input
            type="text"
            key={index}
            className={styles.otp__input}
            value={inputValue}
            onChange={(e) => {
              handleOnChange(e.target.value, index);
            }}
            ref={(input) => {
              inputRefArray.current[index] = input;
            }}
            onKeyDown={(e) => {
              handleBackspace(e, index);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Otp;
