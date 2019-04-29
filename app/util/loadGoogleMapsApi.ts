const CALLBACK_NAME = '__googleMapsApiOnLoadCallback';

const OPTIONS_KEYS = ['channel', 'client', 'key', 'language', 'region', 'v'];

interface OptionsDict {
  [s: string]: string | undefined;
}
interface OptionsDict {
  channel?: string;
  client?: string;
  key: string;
  language?: string;
  region?: string;
  v?: string;
}
interface OptionsProps {
  timeout?: number;
  libraries?: string[];
}

type APIOptions = OptionsDict & OptionsProps;

type MapCtor = {
  new (m: HTMLDivElement, opt: google.maps.MapOptions): google.maps.Map;
};

type PanoCtor = {
  new (
    m: HTMLDivElement,
    opt: google.maps.StreetViewPanoramaOptions
  ): google.maps.StreetViewPanorama;
};

interface MapsAPI {
  Map: MapCtor;
  StreetViewPanorama: PanoCtor;
}

let promise: Promise<MapsAPI>;

const loadGoogleMapsApi = (opt: APIOptions): Promise<MapsAPI> => {
  const options = opt || {};

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
      const params = [`callback=${CALLBACK_NAME}`];
      OPTIONS_KEYS.forEach(key => {
        if (options[key]) {
          params.push(`${key}=${options[key]}`);
        }
      });
      if (options.libraries && options.libraries.length) {
        params.push(`libraries=${options.libraries.join(',')}`);
      }
      scriptElement.src = `https://maps.googleapis.com/maps/api/js?${params.join('&')}`;

      // Insert the `script` tag
      document.body.appendChild(scriptElement);
    });
  }

  return promise;
};

export default loadGoogleMapsApi;
