import { Configuration } from '../../configurations/models/configuration.model';
import { IInfuraTransaction } from '../interfaces/infura-transaction.interface';
import { convertFromWeiHexToEth } from './helpers';

export function validateTransaction(
  transaction: IInfuraTransaction,
  configuration: Configuration,
) {
  if (
    configuration.fromAddress &&
    transaction.from !== configuration.fromAddress
  )
    return false;

  if (configuration.toAddress && transaction.to !== configuration.toAddress)
    return false;

  if (configuration.hash && transaction.hash !== configuration.hash)
    return false;

  if (
    configuration.value &&
    convertFromWeiHexToEth(transaction.value) < configuration.value
  )
    return false;

  return true;
}
