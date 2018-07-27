import React from 'react';
import PropTypes from 'prop-types'

const TodoItem = ({ item, onClick }) => {

    const itemclasses = ['mr-auto','todoitemtext'];
    if (item.completed) itemclasses.push('todoitemtextcompleted')

    const clearIconClasses = [`fa fa-check-circle-o todoitemcompleteicon`];
    const undoIconClasses = [`fa fa-undo todoitemundoicon`];


    return (
        <div className="row todoitem" key={item.id}>
            <div className="col-md-8 offset-md-2 todoitembox">
                <div className={itemclasses.join(" ")}>{item.description}</div>
                <i  className={item.completed ? undoIconClasses : clearIconClasses}
                    onClick={ (e) => onClick(item,e) } ></i>
            </div>
        </div>

    )
}

TodoItem.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}

export default TodoItem;

