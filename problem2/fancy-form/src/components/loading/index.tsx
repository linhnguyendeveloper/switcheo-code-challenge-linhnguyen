import React from 'react';
import ReloadIcon from 'src/icons/ReloadIcon';
import './loading.css';

interface IInlineLoadingProps {
  message?: string;
}

const InlineLoading: React.FC<IInlineLoadingProps> = ({ message }) => {
  return (
    <div className="flex items-center gap-3 ">
      <div className="loading-container">
        <ReloadIcon color="black" />
      </div>
      {message}
    </div>
  );
};

export default InlineLoading;
