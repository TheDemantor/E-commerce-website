import React from 'react';

const FormContainer = ({children}) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg p-6 bg-white rounded shadow-md">
        {children}
      </div>
    </div>
  );
}

export default FormContainer;