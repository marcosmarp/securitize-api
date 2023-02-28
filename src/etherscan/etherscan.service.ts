import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';

@Injectable()
export class EtherscanService {
  constructor(private httpClient: HttpService) {}

  public async getWalletBalance(address: string) {
    const response = await this.httpClient
      .get(ETHERSCAN_API_URL, {
        params: {
          module: 'account',
          action: 'balance',
          address,
          tag: 'latest',
          apikey: process.env.ETHERSCAN_API_KEY,
        },
      })
      .toPromise();

    // Convert from wei to ether
    return Number(response.data.result) / 1e18;
  }

  public async getIsWalletOld(address: string) {
    const response = await this.httpClient
      .get(ETHERSCAN_API_URL, {
        params: {
          module: 'account',
          action: 'txlist',
          address,
          startblock: 0,
          endblock: 99999999999999,
          sort: 'asc',
          apikey: process.env.ETHERSCAN_API_KEY,
        },
      })
      .toPromise();

    if (response.data.result.length === 0) return false;

    const transactionTimestamp = response.data.result[0].timeStamp;
    const currentTimestamp = Date.now();
    const differenceInMilliseconds = currentTimestamp - transactionTimestamp;
    const differenceInYears =
      differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365);
    return differenceInYears >= 1;
  }
}
