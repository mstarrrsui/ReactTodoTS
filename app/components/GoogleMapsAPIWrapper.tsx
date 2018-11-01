import { Component, ReactNode } from 'react';
import { loadGoogleMapsApi } from '../util/loadGoogleMapsApi';

import log from 'loglevel';
import { isFunction } from 'util';

interface State {
  googleApi: any;
  isLoading: boolean;
}

const initialState: State = {
  googleApi: null,
  isLoading: true
};

interface IChildProps {
  googleApi: any;
  apiIsLoading: boolean;
}

interface Props {
  children?: RenderCallback;
  render?: RenderCallback;
}

type RenderCallback = (args: IChildProps) => ReactNode;

export default class GoogleMapsAPI extends Component<Props, State> {
  public state: State = initialState;

  public componentDidMount() {
    log.debug('GoogleMapsAPIWrapper Mounted');
    loadGoogleMapsApi({ key: process.env.GOOGLE_MAPS_API_KEY }).then(api => {
      // this.createMap(api);
      log.debug('GoogleMapsAPIWrapper: Maps API loaded');
      this.setState(() => ({
        googleApi: api,
        isLoading: false
      }));
    });
  }

  public render() {
    const { children, render } = this.props;
    const renderProps = {
      apiIsLoading: this.state.isLoading,
      googleApi: this.state.googleApi
    };

    if (render) {
      return render(renderProps);
    }

    return isFunction(children) ? children(renderProps) : null;
  }
}
