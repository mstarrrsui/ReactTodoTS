import * as React from 'react';
// import { Subtract } from 'utility-types';

import log from 'loglevel';
import { loadGoogleMapsApi } from '../../util/loadGoogleMapsApi';

export interface GoogleMapsProps {
  googleApi: any;
  apiIsLoading: boolean;
}

const initialState = {
  googleApi: null,
  isLoading: true
};

type WithoutPrefilled<T extends GoogleMapsProps> = Pick<T, Exclude<keyof T, 'foo'>>;

export default function injectGoogleMapsAPI<P extends GoogleMapsProps>(
  Wrapped: React.ComponentType<P>
): any {
  type State = Readonly<typeof initialState>;

  return class Inner extends React.Component<WithoutPrefilled<P>> {
    public state: State = initialState;

    public componentDidMount(): void {
      log.debug('GoogleMapsAPI HOC Mounted');
      loadGoogleMapsApi({ key: process.env.GOOGLE_MAPS_API_KEY }).then(
        (api): void => {
          log.debug('GoogleMapsAPI HOC: Maps API loaded');
          this.setState(
            (): any => ({
              googleApi: api,
              isLoading: false
            })
          );
        }
      );
    }

    public render(): React.ReactNode {
      const { googleApi, isLoading } = this.state;

      const props = {
        googleApi,
        isLoading,
        ...this.props
      };

      return <Wrapped {...(props as unknown) as P} />;
    }
  };
}
