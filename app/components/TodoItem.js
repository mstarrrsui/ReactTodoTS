import React from 'react';
import PropTypes from 'prop-types'

export default function TodoItem({ item }) {

    let itemclasses = `mr-auto todoitemtext ${ item.completed ? 'todoitemtextdeleted' : ''}`;

    return (
        <div className="row todoitem" key={item.id}>
            <div className="col-md-8 offset-md-2 todoitembox">
                <div className={itemclasses}>{item.description}</div>
                <i className="fa fa-check-circle-o todoitemdeleteicon"></i>
            </div>
        </div>
            
    )
}

TodoItem.propTypes = {
    item: PropTypes.object.isRequired
}
