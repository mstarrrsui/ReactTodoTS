import React from 'react';
import PropTypes from 'prop-types';



const Spinner = () =>  {

    var styles = {
        content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%)"
        }
    }

  return (
    <div style={styles.content}>
        <img src='app/images/loading.gif'/>
    </div>
  );
}


export default Spinner;
