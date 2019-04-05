import * as React from 'react';
import { Subtract } from 'utility-types';

import log from 'loglevel';
import { loadGoogleMapsApi } from '../../util/loadGoogleMapsApi';

export interface IGoogleMapsProps {
    googleApi: any;
    apiIsLoading: boolean;
}

export default function injectGoogleMapsAPI<P extends IGoogleMapsProps>(Wrapped: React.ComponentType<P>) {
  type State = Readonly<typeof initialState>;

  const initialState = {
      googleApi: null,
      isLoading: true,
  };

  return class extends React.Component<Subtract<P, IGoogleMapsProps>> {
      state: State = initialState;

      componentDidMount() {
          log.debug('GoogleMapsAPI HOC Mounted');
          loadGoogleMapsApi({ key: process.env.GOOGLE_MAPS_API_KEY }).then((api) => {
              log.debug('GoogleMapsAPI HOC: Maps API loaded');
              this.setState(() => ({
                  googleApi: api,
                  isLoading: false,
              }));
          });
      }

      render() {
          const props = {
              googleApi: this.state.googleApi,
              apiIsLoading: this.state.isLoading,
              ...this.props,
          };

          return <Wrapped {...props as P} />;
      }
  };
}
