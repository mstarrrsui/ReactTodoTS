import React from 'react';
import PropTypes from 'prop-types'

export default function TodoItems({ items }) {
    return (
        <div className="container todoitems">
        { items.map( item => 
            <div className="row todoitem" key={item.id}>
                <div className="col-md-8 offset-md-2 todoitembox">
                    <div className="mr-auto todoitemtext">{item.description}</div>
                    <i className="fa fa-check-circle-o todoitemdeleteicon"></i>
                </div>
            </div>
        )}
        </div>
            
    )
}

TodoItems.propTypes = {
    items: PropTypes.array.isRequired
}

