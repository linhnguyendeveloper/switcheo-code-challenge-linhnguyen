import React, { ReactNode, useRef } from "react";

interface IModalProps {
  isOpen: boolean;
  onRequestClose?: () => void;
  children: ReactNode;
  width?: string;
}

const CommonModal: React.FC<IModalProps> = ({ isOpen, onRequestClose, children, width }) => {
  const parentRef = useRef(null as any);
  const handleParentClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === parentRef.current && onRequestClose) {
      onRequestClose();
    }
  };

  return isOpen ? (
    <>
      <div
        className="parent justify-center items-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-[#000000E5]"
        onClick={handleParentClick}
        ref={parentRef}
      >
        <div
          className={` child overflow-auto h-[74vh] relative w-auto my-6 mx-auto max-w-[90vw] bg-[#0A071E] p-[20px] pb-[30px]`}
          style={{ width }}
        >
          {children}
        </div>
      </div>
    </>
  ) : null;
};

export default CommonModal;
