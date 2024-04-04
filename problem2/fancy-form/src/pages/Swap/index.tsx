import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'src/components/button';
import InlineLoading from 'src/components/loading';
import SelectTokenModal, { ITokenData } from 'src/components/modal/SelectTokenModal';
import SwapIcon from 'src/icons/SwapIcon';
import SwapRateBox from './components/SwapRateBox';
import Title from './components/Title';
import TokenForm from './components/TokenForm';

const Swap: React.FC = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const [sourceToken, setSourceToken] = useState<ITokenData | undefined>();
  const [destinationToken, setDestinationToken] = useState<ITokenData | undefined>();
  const [tokenFormSelecting, setTokenFormSelecting] = useState<number>(1);
  const [sourceAmount, setSourceAmount] = useState<number>(0);
  const [destinationAmount, setDestinationAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const swapRate = useMemo(() => {
    if (sourceToken && destinationToken) return sourceToken.price / destinationToken.price;
    return 1;
  }, [sourceToken, destinationToken]);

  const handleSetAmountInput = (value: number, setter: (value: number) => void) => {
    setter(value);
    if (sourceToken && destinationToken) {
      const oppositeSetter = setter === setSourceAmount ? setDestinationAmount : setSourceAmount;
      oppositeSetter(value * swapRate);
    }
  };

  const handleSelectToken = (token: ITokenData | undefined) => {
    if (
      (tokenFormSelecting === 1 && token?.currency === destinationToken?.currency) ||
      (tokenFormSelecting === 2 && token?.currency === sourceToken?.currency)
    ) {
      toast.error('Please select different tokens!');
      return;
    }

    if (tokenFormSelecting === 1) {
      setSourceToken(token);
    } else if (tokenFormSelecting === 2) {
      setDestinationToken(token);
    }
  };

  const handleClearInput = () => {
    setSourceAmount(0);
    setDestinationAmount(0);
  };

  const handleReset = () => {
    handleClearInput();
    setSourceToken(undefined);
    setDestinationToken(undefined);
  };

  const handleSwitchPair = () => {
    setSourceToken(destinationToken);
    setDestinationToken(sourceToken);
    handleClearInput();
  };

  const handleSwap = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success(
        `Successfully swapped ${sourceAmount} ${sourceToken?.currency} to ${destinationAmount} ${destinationToken?.currency}!`
      );
      handleClearInput();
      setLoading(false);
    }, 1200);
  };

  return (
    <div>
      {open && <SelectTokenModal toggleOpen={toggleOpen} handleSelectToken={handleSelectToken} />}

      <div className="max-w-[700px] bg-dark rounded-lg h-auto my-[96px] mx-auto py-4 px-[24px]">
        <Title handleReset={handleReset} />
        <TokenForm
          openModal={() => {
            setTokenFormSelecting(1);
            toggleOpen();
          }}
          handleSetAmountInput={(value) => handleSetAmountInput(value, setSourceAmount)}
          amount={sourceAmount}
          title={sourceToken?.currency || 'Select token'}
          tokenData={sourceToken}
        />

        <div className="mx-auto w-fit cursor-pointer" onClick={handleSwitchPair} title="Switch Pair">
          <SwapIcon />
        </div>

        <TokenForm
          openModal={() => {
            setTokenFormSelecting(2);
            toggleOpen();
          }}
          handleSetAmountInput={(value) => handleSetAmountInput(value, setDestinationAmount)}
          amount={destinationAmount}
          title={destinationToken?.currency || 'Select token'}
          tokenData={destinationToken}
        />

        {sourceToken && destinationToken && (
          <SwapRateBox sourceToken={sourceToken} destinationToken={destinationToken} swapRate={swapRate} />
        )}

        <Button
          disabled={!sourceToken || !destinationToken || !sourceAmount || !destinationAmount}
          onClick={handleSwap}
        >
          {loading ? <InlineLoading message="Swapping Tokens" /> : 'Swap'}
        </Button>
      </div>
    </div>
  );
};

export default Swap;
