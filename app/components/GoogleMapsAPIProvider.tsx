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
  children?: InnerRenderFunction;
  render?: InnerRenderFunction;
}

type InnerRenderFunction = (args: IChildProps) => ReactNode;

export default class GoogleMapsAPIProvider extends Component<Props, State> {
  state: State = initialState;

  componentDidMount() {
    log.debug('GoogleMapsAPIProvider Mounted');
    loadGoogleMapsApi({ key: process.env.GOOGLE_MAPS_API_KEY }).then(api => {
      // this.createMap(api);
      log.debug('GoogleMapsAPIProvider: Maps API loaded');
      this.setState(() => ({
        googleApi: api,
        isLoading: false
      }));
    });
  }

  render() {
    const { children, render } = this.props;
    const renderProps = {
      apiIsLoading: this.state.isLoading,
      googleApi: this.state.googleApi
    };

    if (render) {
      return render(renderProps);
    }

    return children && isFunction(children) ? children(renderProps) : null;
  }
}
