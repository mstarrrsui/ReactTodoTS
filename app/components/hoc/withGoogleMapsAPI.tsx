import * as React from 'react';
import { loadGoogleMapsApi } from '../../util/loadGoogleMapsApi';

import log from 'loglevel';

export interface IGoogleMapsProps {
  googleApi: any;
  apiIsLoading: boolean;
}

export default function withGoogleMapsAPI<P extends object>(Wrapped: React.ComponentType<P>) {
  type State = Readonly<typeof initialState>;

  const initialState = {
    googleApi: null,
    isLoading: true
  };

  return class WithGoogleMapsAPI extends React.Component<P & IGoogleMapsProps> {
    public state: State = initialState;

    public componentDidMount() {
      log.debug('GoogleMapsAPI HOC Mounted');
      loadGoogleMapsApi({ key: process.env.GOOGLE_MAPS_API_KEY }).then(api => {
        log.debug('GoogleMapsAPI HOC: Maps API loaded');
        this.setState(() => ({
          googleApi: api,
          isLoading: false
        }));
      });
    }

    public render() {
      const props: IGoogleMapsProps = {
        googleApi: this.state.googleApi,
        apiIsLoading: this.state.isLoading,
        ...this.props
      };

      return <Wrapped {...props as P} />;
    }
  };
}
