import React from 'react';

interface InputProps {
  className?: string;
    id?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  onKeyPress?:any;
  required?:boolean;
}

const Input: React.FC<InputProps> = ({
  className,
  id,
  type = 'text',
  value,
  placeholder,
  onChange,
  disabled = false
}) => {
  const defaultStyles = "block w-full px-4 py-2 text-gray-900 placeholder-gray-500  border border-gray-300 rounded-mlg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-gray-50";

  return (
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`${defaultStyles} ${className || ''}`}
      />
  );
};

export default Input;