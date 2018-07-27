import React from 'react';
import PropTypes from 'prop-types'
import styles from './TodoItem.css'

const TodoItem = ({ item, onClick }) => {

    const itemclasses = ['mr-auto',styles.todoitemtext];
    if (item.completed) itemclasses.push(styles.todoitemtextcompleted)

    const clearIconClasses = ['fa fa-check-circle-o', styles.todoitemcompleteicon];
    const undoIconClasses = ['fa fa-undo', styles.todoitemundoicon];


    return (
        <div className={['row', styles.todoitem].join(' ')} key={item.id}>
            <div className={['col-md-8','offset-md-2', styles.todoitembox].join(' ')}>
                <div className={itemclasses.join(" ")}>{item.description}</div>
                <i  className={item.completed ? undoIconClasses.join(" ") : clearIconClasses.join(" ")}
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

