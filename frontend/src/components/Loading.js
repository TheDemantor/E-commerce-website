import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default Loading;