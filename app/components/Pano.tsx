import React, { Component, createRef } from 'react';
import log from 'loglevel';
import { Location } from '../types/GoogleMaps';


const panoStyle: React.CSSProperties = {
    height: '40vh',
    width: '100%',
};

interface Props {
    googleApi: any;
    location: Location;
    map: any;
}

export default class Pano extends Component<Props> {
    private panoRef = createRef<HTMLDivElement>();

    componentDidUpdate() {
        if (this.props.map) {
            this.createPano();
        }
    }

    render() {
        return <div style={panoStyle} ref={this.panoRef} />;
    }

    private createPano() {
        log.debug('Pano - create Pano');
        const { location, map } = this.props;
        try {
            const panoDiv = this.panoRef.current;
            const panorama = new this.props.googleApi.StreetViewPanorama(panoDiv, {
                position: location.position,
                pov: {
                    heading: location.pov.heading,
                    pitch: location.pov.pitch,
                    zoom: 1,
                },
            });
            map.setStreetView(panorama);
        } catch (e) {
            log.error('Error occurred creating pano');
            log.error(e);
        }
    }
}
