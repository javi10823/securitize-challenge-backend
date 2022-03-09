export interface IEtherscanWallet {
  account: string;
  balance: string;
}

export interface IEtherscanMultiResult {
  status: number;
  message: string;
  result: IEtherscanWallet[];
}

export interface IEtherscanResult {
  status: string;
  message: string;
  result: string;
}

export interface IEtherscanTransaction {
  status: string;
  message: string;
  result: IEtherscanTransactionData[];
}

export interface IEtherscanTransactionData {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
}
