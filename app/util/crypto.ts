declare global { 
  interface Window {
     msCrypto: Crypto;
  }
}
const crypto: Crypto = window.crypto ||
  window.msCrypto || {
    getRandomValues: (array: Uint8Array): Uint8Array => {
      for (let i = 0, l = array.length; i < l; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    },
    subtle: null  //to make compatible with Crypto interface
  };

// dec2hex :: Integer -> String
function dec2hex(dec):string {
    var val = ('0' + dec.toString(16)).substr(-2);
    return val;
}

const CryptoUtils = {

    // generateId :: Integer -> String
    generateId(len): string {
        let arr: Uint8Array = new Uint8Array((len || 40) / 2)
        crypto.getRandomValues(arr)
        return Array.from(arr, dec2hex).join('')
    }


}
 export default CryptoUtils;
