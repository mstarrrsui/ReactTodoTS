import React from 'react';
import PropTypes from 'prop-types'

export default function TodoItems({ items }) {
    return (
        <div className="container todoitems">
            <div className="row todoitem">
                    <div className="col-md-8 offset-md-2 todoitembox">
                        <div className="mr-auto todoitemtext">Variable width content</div>
                        <i className="fa fa-check-circle-o todoitemdeleteicon"></i>
                    </div>
            </div>
        </div>
    )
}

TodoItems.propTypes = {
    items: PropTypes.array.isRequired
}

