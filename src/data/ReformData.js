import chains from "./rawChainsInfo";

export const chainList = chains.map((obj) => ({
  [obj.chainID]: {
    chainSymbol: obj.chainSymbol,
    chainName: obj.chainName,
  },
}));

console.log(chainList);
console.log(chains);
