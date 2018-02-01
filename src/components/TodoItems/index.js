// core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// instruments
import Styles from './styles';

export default class TodoItems extends Component {
    static propTypes = {
        completed: PropTypes.bool.isRequired,
        deleteTodo:PropTypes.func.isRequired,
        editTodo:  PropTypes.func.isRequired,
        id:        PropTypes.string.isRequired,
        title:     PropTypes.string.isRequired,
        toggleTodo:PropTypes.func.isRequired
    };

    constructor () {
        super();
        this.handleEdit = :: this._handleEdit;
        this.handleToggle = :: this._handleToggle;
        this.handleDelete = :: this._handleDelete;
    }

    _handleEdit () {
        const { id, title } = this.props;

        this.props.editTodo(id, title);
    }

    _handleToggle () {
        const { id, completed } = this.props;

        this.props.toggleTodo(id, completed);
    }

    _handleDelete () {
        const { id } = this.props;

        this.props.deleteTodo(id);
    }


    render () {
        const { title, completed, id } = this.props;

        return (
            <section className = { Styles.todoItems }>
                <div className = { Styles.checkbox }>
                    <input checked = { completed } id = { id }
                           type = 'checkbox'
                           onChange = { this.handleToggle } />
                    <label htmlFor = { id } ></label>
                </div>

                <p>{ title }</p>

                <div className = { Styles.icon }>
                    <i className = { Styles.icon__bookmark }></i>
                    <i className = { Styles.icon__edit } onClick   = { this.handleEdit }></i>
                    <i className = { Styles.icon__delete } onClick   = {this.handleDelete }></i>
                </div>
            </section>
        );
    }
}
