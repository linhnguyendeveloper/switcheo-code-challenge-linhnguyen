import React from "react";
import ReloadIcon from "src/icons/ReloadIcon";
interface TitleProps {
  handleReset: () => void;
}
const Title: React.FC<TitleProps> = ({ handleReset }: TitleProps) => {
  return (
    <div className="text-2xl font-bold mx-auto mb-4 w-fit flex items-center gap-3 text-[#FFAE1D]">
      Fancy Swap <ReloadIcon className="cursor-pointer" onClick={handleReset} />
    </div>
  );
};

export default Title;
