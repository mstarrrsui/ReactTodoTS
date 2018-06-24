import React from 'react';
import PropTypes from 'prop-types';


export default function TodoForm() {

    return (
        <div className="d-flex justify-content-center">
                <input type="email" className="form-control-lg col-md-6" id="inputEmail4" placeholder="Enter a task"/>
                <button type="button" className="btn btn-primary m-2">Add</button>               
        </div>
    );
  
}




