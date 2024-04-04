import React from 'react';
import ReloadIcon from 'src/icons/ReloadIcon';
interface TitleProps {
  handleReset: () => void;
}
const Title: React.FC<TitleProps> = ({ handleReset }: TitleProps) => {
  return (
    <div className="text-2xl font-bold mx-auto w-fit flex items-center gap-3">
      SWAP <ReloadIcon className="cursor-pointer" onClick={handleReset} />
    </div>
  );
};

export default Title;
