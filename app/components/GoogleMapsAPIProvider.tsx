/* eslint-disable @typescript-eslint/no-explicit-any */

// old file not used anymore - keeping for reference

import { Component, ReactNode } from 'react';

import log from 'loglevel';
import { isFunction } from '../util/typeUtil';
import loadGoogleMapsApi from '../util/loadGoogleMapsApi';

interface State {
  googleApi: any;
  isLoading: boolean;
}

const initialState: State = {
  googleApi: null,
  isLoading: true
};

interface ChildProps {
  googleApi: any;
  isLoading: boolean;
}

interface Props {
  children?: InnerRenderFunction;
  render?: InnerRenderFunction;
}

type InnerRenderFunction = (args: ChildProps) => ReactNode;

export default class GoogleMapsAPIProvider extends Component<Props, State> {
  public state: State = initialState;

  public componentDidMount(): void {
    log.debug('GoogleMapsAPIProvider Mounted');
    loadGoogleMapsApi({ key: process.env.GOOGLE_MAPS_API_KEY! }).then((api: any) => {
      // this.createMap(api);
      log.debug('GoogleMapsAPIProvider: Maps API loaded');
      this.setState(
        (): any => ({
          googleApi: api,
          isLoading: false
        })
      );
    });
  }

  public render(): ReactNode {
    const { children, render } = this.props;
    const { isLoading, googleApi } = this.state;
    const renderProps = {
      isLoading,
      googleApi
    };

    if (render) {
      return render(renderProps);
    }

    return children && isFunction(children) ? children(renderProps) : null;
  }
}
