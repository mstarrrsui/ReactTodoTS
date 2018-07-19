import React from 'react';
import PropTypes from 'prop-types'

export default function TodoItem({ item, onClick }) {

    let itemclasses = `mr-auto todoitemtext ${ item.completed ? 'todoitemtextcompleted' : ''}`;
    
    let clearIconClasses = `fa fa-check-circle-o`;
    let undoIconClasses = `fa fa-undo`;
   
    let clearIconStyle = {
        color: "#13eb37" 
    }

    let undoIconStyle = {
        color: "blue" 
    }

    return (
        <div className="row todoitem" key={item.id}>
            <div className="col-md-8 offset-md-2 todoitembox">
                <div className={itemclasses}>{item.description}</div>
                <i className={item.completed ? undoIconClasses : clearIconClasses}
                 style={item.completed ? undoIconStyle : clearIconStyle} 
                 onClick={ (e) => onClick(item,e) } ></i>
            </div>
        </div>
            
    )
}

TodoItem.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}

