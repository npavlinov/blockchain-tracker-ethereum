export function convertFromWeiHexToEth(wei: string) {
  return parseInt(wei, 16) / 10 ** 18;
}

export function validateDateHexHasPassed(timestamp: string, age: Date) {
  return parseInt(timestamp, 16) * 1000 >= Math.floor(age.getTime() / 1000);
}
