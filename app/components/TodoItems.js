import React from 'react';
import PropTypes from 'prop-types'
import TodoItem from './TodoItem';


export default function TodoItems({ items }) {
    return (
        <div className="container todoitems">
        { items.map( item => 
            <TodoItem item={item} key={item.id} />
        )}
        </div>
            
    )
}

TodoItems.propTypes = {
    items: PropTypes.array.isRequired
}

