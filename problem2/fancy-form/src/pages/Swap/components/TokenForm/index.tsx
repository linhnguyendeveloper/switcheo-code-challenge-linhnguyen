import React from 'react';
import Image from 'src/components/image';
import { ITokenData } from 'src/components/modal/SelectTokenModal';

interface ITokenFormProps {
  amount: number;
  title: string;
  tokenData?: ITokenData;
  openModal: () => void;
  handleSetAmountInput: (value: number) => void;
}

const TokenForm: React.FC<ITokenFormProps> = ({
  openModal,
  title,
  tokenData,
  handleSetAmountInput,
  amount,
}: ITokenFormProps) => {
  const tokenImageURL = tokenData
    ? `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${tokenData.currency}.svg`
    : '';

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = +event.target.value;
    handleSetAmountInput(newAmount);
  };

  return (
    <div className="bg-darkBlue rounded-lg my-2 p-4">
      <div className="flex items-start w-full rounded-md">
        <div
          className="w-[400px] rounded-md bg-[#1a1245] cursor-pointer px-4 py-3 flex items-center justify-between gap-2 text-base"
          onClick={openModal}
        >
          {title}
          <Image src={tokenImageURL} />
        </div>
        <div className="w-full text-right block">
          <div className="text-xs text-[#98A2B3] my-0">Amount</div>
          <input
            className="text-xl text-right font-bold bg-transparent w-full focus:outline-none placeholder-[#667085]"
            type="number"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TokenForm;
