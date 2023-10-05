'use client';
import { MouseEventHandler } from 'react';
import Image from 'next/image';

interface Props {
  title: string;
  containerStyle: string;
  btnType?: 'button' | 'submit';
  textStyle?: string;
  rightIcon?: string;
  isDisabled?: boolean;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function CustomButton({
  title, textStyle,
  btnType, rightIcon, isDisabled,
  containerStyle,
  handleClick,
}: Props) {
  return (
    <>
      <button
        disabled={false}
        type={btnType}
        className={`custom-btn ${containerStyle}`}
        onClick={handleClick}
      >
        <span className={`flex-1 ${textStyle}`}>{title}</span>
        {rightIcon && <div className='relative w-6 h-6'>
          <Image src={rightIcon} alt="right-icon" fill className='object-contain' />  
        </div>}
      </button>
    </>
  );
}


