import * as React from 'react';

// tslint:disable-next-line
import loading from '../images/Ripple-2s-94px.gif';

const Spinner: React.SFC = () => {
  const spinnerStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'rgba(0,0,0,.2)',
    zIndex: 999
  };

  const imgStyles: React.CSSProperties = {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)'
  };

  return (
    <div style={spinnerStyles}>
      <img style={imgStyles} alt="" src={loading} />
    </div>
  );
};

export default Spinner;
