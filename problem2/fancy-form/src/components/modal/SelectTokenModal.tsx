import React, { useEffect, useState } from 'react';
import Image from '../image';
import CommonModal from './CommonModal';
import { toast } from 'react-toastify';

export interface ITokenData {
  currency: string;
  date: string;
  price: number;
}

interface ISelectTokenModalProps {
  toggleOpen: () => void;
  handleSelectToken: (value: ITokenData) => void;
}

const SelectTokenModal: React.FC<ISelectTokenModalProps> = ({ toggleOpen, handleSelectToken }) => {
  const [search, setSearch] = useState<string>('');
  const [tokenList, setTokenList] = useState<ITokenData[]>([]);
  const tokensListFiltered = search
    ? tokenList.filter((item: ITokenData) => item.currency.toLowerCase().includes(search.toLowerCase()))
    : tokenList;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearch(text);
  };

  const handleCloseModal = () => {
    toggleOpen();
    setSearch('');
  };

  const fetchTokenData = async () => {
    try {
      const response = await fetch('https://interview.switcheo.com/prices.json');
      const tokenDataResponse = await response.json();
      setTokenList(tokenDataResponse);
    } catch (error) {
      toast.error('Something wrong happen');
    }
  };

  useEffect(() => {
    fetchTokenData();
  }, []);

  return (
    <CommonModal isOpen onRequestClose={handleCloseModal} width="550px">
      <div className="flex items-center justify-between w-full mt-0">
        <div className="text-2xl font-bold mx-auto w-fit flex items-center gap-3 justify-start">Select a token</div>
        <div className="cursor-pointer" onClick={handleCloseModal}>
          X
        </div>
      </div>

      <input
        className="w-full bg-[#1D2939] h-[52px] pl-8 text-[15px] font-semibold mb-2 mt-3.5 rounded-md focus:outline-none placeholder-[#667085]"
        placeholder="Search by name or address"
        value={search}
        onChange={handleSearchChange}
      />
      <div className="max-h-[54vh] overflow-y-auto pr-3">
        {tokensListFiltered.map((item: ITokenData, index: number) => (
          <div
            className="flex justify-between items-center my-2 hover:bg-[#1D2939] rounded-md px-1 py-2 cursor-pointer"
            key={index}
            onClick={() => {
              handleSelectToken(item);
              handleCloseModal();
            }}
          >
            <div className="flex items-center gap-2">
              <Image src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${item.currency}.svg`} />

              <div>
                <div className="text-sm">{item.currency}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CommonModal>
  );
};

export default SelectTokenModal;
