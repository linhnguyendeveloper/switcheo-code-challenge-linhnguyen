import React from 'react';
import { ITokenData } from 'src/components/modal/SelectTokenModal';

interface ISwapRateBoxProps {
  sourceToken: ITokenData | undefined;
  destinationToken: ITokenData | undefined;
  swapRate: number;
}

const SwapRateBox: React.FC<ISwapRateBoxProps> = ({ sourceToken, destinationToken, swapRate }) => {
  return (
    <div className="bg-darkBlue rounded-lg my-3 p-4 text-left">
      <div className="text-sm">
        1 {sourceToken?.currency} = {swapRate} {destinationToken?.currency}
      </div>
      <div className="text-sm">
        1 {destinationToken?.currency} = {1 / swapRate} {sourceToken?.currency}
      </div>
    </div>
  );
};

export default SwapRateBox;
