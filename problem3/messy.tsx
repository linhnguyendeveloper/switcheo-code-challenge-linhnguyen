interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  // Can extend instead of redeclared
  currency: string;
  amount: number;
  formatted: string;
}

class Datasource {
  // TODO: Implement datasource class
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const datasource = new Datasource("https://interview.switcheo.com/prices.json");
    datasource
      .getPrices()
      .then((prices) => {
        setPrices(prices);
      })
      .catch((error) => {
        console.err(error);
        // Change to console.error
      });
  }, []);

  const getPriority = (blockchain: any): number => {
    // Should not define as any
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa": // Same value as 'Neo'
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    // Need to define return type
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) {
          // change to balancePriority
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });
  // not used

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow className={classes.row} key={index} amount={balance.amount} usdValue={usdValue} formattedAmount={balance.formatted} />
      //should not use index as key
    );
  });

  return <div {...rest}>{rows}</div>;
};

// Missing export default.

// =======================================
// interface FormattedWalletBalance {
//   currency: string;
//   amount: number;
//   formatted: string;
// }
// => Can extend instead of redeclared
// =======================================
// const [prices, setPrices] = useState({});
// => Need to define a type for prices state value
// =======================================
// => Missing export default.
// =======================================
// class Datasource {
// }
// Need to: Implement datasource class
// =======================================
// console.err(error);
// => Change to console.error
// =======================================
//  const getPriority = (blockchain: any): number => {
// => blockchain variable should not be defined as any
// =======================================
// case "Zilliqa":
// return 20;
// case "Neo":
// return 20;
// => Same value between Zilliqa and Neo
// =======================================
//  const sortedBalances = useMemo(() => {
// => Need to define return type
// =======================================
// const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
//   return {
//     ...balance,
//     formatted: balance.amount.toFixed(),
//   };
// });
// => formattedBalances is not used
// =======================================
// <WalletRow className={classes.row} key={index} amount={balance.amount} usdValue={usdValue} formattedAmount={balance.formatted} />
// => Should not use index as key
// =======================================
