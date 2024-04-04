import { MouseEventHandler, ReactNode } from 'react';

type IButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
};

const Button = (props: IButtonProps) => {
  const { children, className, disabled, onClick } = props;

  return (
    <button
      onClick={onClick}
      type="button"
      className={`py-3 text-[#0C111D] bg-[#FFAF1D] hover:bg-[#ffaf1dbf]
        rounded-md flex items-center gap-2 font-[500] text-[17px] w-full justify-center mb-2 px-[42px] disabled:text-[#98A2B3] disabled:bg-[#1D2939] ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
