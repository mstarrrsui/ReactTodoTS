import React from 'react';
import PropTypes from 'prop-types'
import TodoItem from './TodoItem';


export default function TodoItems({ items, onClearItem }) {
    return (
        <div className="container todoitems">
        { items.map( item => 
            <TodoItem item={item} key={item.id} onClick={onClearItem} />
        )}
        </div>
            
    )
}

TodoItems.propTypes = {
    items: PropTypes.array.isRequired
}

