import * as React from "react";



const Spinner: React.SFC = () =>  {

    var styles = {
        content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%)"
        } as React.CSSProperties
    }

  return (
    <div style={styles.content}>
        <img src='app/images/loading.gif'/>
    </div>
  );
}


export default Spinner;
