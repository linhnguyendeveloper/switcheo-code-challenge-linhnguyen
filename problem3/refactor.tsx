type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo' | string;

type TokenPrice = {
  currency: string;
  date: string;
  price: number;
};

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

class Datasource {
  // TODO: Implement datasource class
  private sourceUrl: string;

  constructor(sourceUrl: string) {
    this.sourceUrl = sourceUrl;
  }

  async getPrices() {
    try {
      const response = await fetch(this.sourceUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances<WalletBalance[]>();
  const [prices, setPrices] = useState<TokenPrice[]>({});

  useEffect(() => {
    const datasource = new Datasource('https://interview.switcheo.com/prices.json');
    datasource
      .getPrices()
      .then((prices) => {
        setPrices(prices);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getPriority = (blockchain: Blockchain): number => {
    // Should not define as any
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo<FormattedWalletBalance[]>(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount <= 0;
      })
      .sort((leftWalletBalance: WalletBalance, rightWalletBalance: WalletBalance) => {
        const leftPriority = getPriority(leftWalletBalance.blockchain);
        const rightPriority = getPriority(rightWalletBalance.blockchain);
        return rightPriority - leftPriority;
      })
      .map((balance: WalletBalance): FormattedWalletBalance => ({
        ...balance,
        formatted: balance.amount.toFixed(),
      })); // convert from WalletBalance => FormattedWalletBalance
  }, [balances, prices]);

  //   const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //     return {
  //       ...balance,
  //       formatted: balance.amount.toFixed(),
  //     };
  //   }); //Comment because unused

  const rows = sortedBalances.map((balance: FormattedWalletBalance) => {
    // Remove index
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={balance.currency} // Currency will be unique
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
export default WalletPage;
