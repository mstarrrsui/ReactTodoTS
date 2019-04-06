import * as React from 'react';

// tslint:disable-next-line
import loading from '../images/loading.gif';

const Spinner: React.SFC = () => {
  const spinnerStyles: React.CSSProperties = {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)'
  };

  return (
    <div style={spinnerStyles}>
      <img src={loading} />
    </div>
  );
};

export default Spinner;
