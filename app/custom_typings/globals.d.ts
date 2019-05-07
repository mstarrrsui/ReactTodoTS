/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  google: any;
  msCrypto: any;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  [key: string]: any; // Add index signature
}
