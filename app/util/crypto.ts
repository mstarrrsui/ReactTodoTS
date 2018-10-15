declare global {
  // tslint:disable-next-line
  interface Window {
     msCrypto: Crypto;
  }
}

const crypto: Crypto = window.crypto ||
  window.msCrypto || {
    getRandomValues: (array: any) => {
      for (let i = 0, l = array.length; i < l; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    },
    subtle: null  // to make compatible with Crypto interface
  };

// dec2hex :: Integer -> String
function dec2hex(dec: number): string {
    const val = ('0' + dec.toString(16)).substr(-2);
    return val;
}

// generateId :: Integer -> String
export function generateId(len: number): string {
    const arr: Uint8Array = new Uint8Array((len || 40) / 2);
    crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
}
