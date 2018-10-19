declare global {
  // tslint:disable-next-line
  interface Window {
    [method: string]: any;
    google: any;
  }
}

const CALLBACK_NAME = '__googleMapsApiOnLoadCallback';

const OPTIONS_KEYS = ['channel', 'client', 'key', 'language', 'region', 'v'];

let promise: Promise<any> = null;

export const loadGoogleMapsApi = (options: any): Promise<any> => {
  options = options || {};

  if (!promise) {
    promise = new Promise((resolve, reject) => {
      // Reject the promise after a timeout
      const timeoutId = setTimeout(() => {
        window[CALLBACK_NAME] = () => ({}); // Set the on load callback to a no-op
        reject(new Error('Could not load the Google Maps API'));
      }, options.timeout || 10000);

      // Hook up the on load callback
      window[CALLBACK_NAME] = () => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
        resolve(window.google.maps);
        delete window[CALLBACK_NAME];
      };

      // Prepare the `script` tag to be inserted into the page
      const scriptElement = document.createElement('script');
      scriptElement.defer = true;
      scriptElement.async = true;
      const params = ['callback=' + CALLBACK_NAME];
      OPTIONS_KEYS.forEach(key => {
        if (options[key]) {
          params.push(key + '=' + options[key]);
        }
      });
      if (options.libraries && options.libraries.length) {
        params.push('libraries=' + options.libraries.join(','));
      }
      scriptElement.src = 'https://maps.googleapis.com/maps/api/js?' + params.join('&');

      // Insert the `script` tag
      document.body.appendChild(scriptElement);
    });
  }

  return promise;
};
