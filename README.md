# NguyenVietLinh

## Problem 1 :

- Please look for the solution file `sum.ts`. I included the test function inside.

## Problem 2 :

- Please open /fancy-form folder. I created using `create-react-app` with `Tailwind` for styling.
- The tokens list is fetch from the API you provided.
- To start swapping tokens, please select each tokens and input the amount.
- Some functions I provided :
  - Select Token, search Token by name
  - Validate same token for swapping and input amount.
  - Get rate based on selected pairs of tokens.
  - Mocked API call by setTimeout 3s after swap.
  - Show currency rate below.
  - Add ability to switch pair for better UX.
- Prerequisites: `Node v.18+`
- Run `yarn` => `yarn start` to start the project.

## Problem 3 :

- For the issues in the code, I added some details as comments and separate to a new file named `refactor.tsx`.

- These are the changes I made:

  - Define type for `blockchain` in `getPriority` function.
  - Define type `TokenPrice` for state `prices`
  - Add field `blockchain` with type `Blockchain` to `WalletBalance` interface
  - Extend `FormattedWalletBalance` from the `WalletBalance` interface for better reusability.
  - Define body of class `Datasource` with property `sourceUrl` and function `getPrices` to get prices of token from `sourceUrl`
  - Fix error `console.err` to `console.error` on `useEffect`
  - Merge the cases for 'Zilliqa' and 'Neo' since they have the same priority value.
  - Change `lhsPriority` to `balancePriority` since there's no variable `lhsPriority`. I assume it's `balancePriority` since it's not used.
  - Add type `FormattedWalletBalance[]` for `useMemo`.
  - Rewrite `sortBalances` calculation with shorter format and unnecessary if condition and replace return as -1 and 1 by a sub function.
  - Rename variables in `sort` function to more clearly.
  - Add `map` function to convert array from `WalletBalance` to `FormattedWalletBalance`.
  - Comment `formattedBalances` as it is not used.
  - Missing `export default` so i added it.
  - Use `balance.currency` as key instead of index because it is not recommend in React and will causes issues with reordering

**Please contact me through my email if anything I do is unclear. Thanks for your time!**
