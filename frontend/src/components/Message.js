import React from 'react';

const variantClasses = {
  danger: 'bg-red-100 border border-red-700 text-red-700',
  success: 'bg-red-200 border border-red-600 text-red-600',
  info: 'bg-red-50 border border-red-500 text-red-500',
};

const Message = ({variant = 'info', children}) => {
  return (
    <div className={`px-4 py-3 rounded relative mb-4 ${variantClasses[variant] || variantClasses.info}`}>{children}</div>
  );
}

export default Message;