// core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// instruments
import Styles from './styles';
import TodoForm from '../TodoForm';

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
    state = {
        editing: false
    };

    _handleEdit () {
        const { id, title } = this.props;

        this.props.editTodo(id, title);
    }

    _handleChange = ({ target }) => {
        const { value: title } = target;
        this.setState({ title });
    };

    _handleToggle () {
        const { id, completed } = this.props;

        this.props.toggleTodo(id, completed);
    }

    _handleDelete () {
        const { id } = this.props;

        this.props.deleteTodo(id);
    }

    renderDisplay (title, completed, id) {
        return (
            <section className = { Styles.todoItems }>
                <div className = { Styles.checkbox }>
                    <input
                        checked = { completed }
                        id = { id }
                        type = 'checkbox'
                        onChange = { this.handleToggle }
                    />
                    <label htmlFor = { id } />
                </div>

                <p>{title}</p>

                <div className = { Styles.icon }>
                    <i className = { Styles.icon__bookmark } />
                    <i className = { Styles.icon__edit } onClick = { () => this.setState( {editing: true })} />
                    <i className = { Styles.icon__delete } onClick = { this.handleDelete } />
                </div>
            </section>
        );
    }

    renderForm (title, completed, id) {
        return (
            <section className = { Styles.todoItems }>
                <div className = { Styles.checkbox }>
                    <input
                        checked = { completed }
                        id = { id }
                        type = 'checkbox'
                        onChange = { this.handleToggle }
                    />
                    <label htmlFor = { id } />
                </div>

                <form onSubmit = { this.handleSubmit }>
                    <input
                        type = 'text'
                        value = { title }
                        onChange = { this._handleChange }
                        onKeyPress = { this.handleKeyPress }
                    />


                    <div className = { Styles.icon }>
                        <i className = { Styles.icon__bookmark } />
                        <i className = { Styles.icon__edit } onClick = { this.handleSubmit } />
                        <i className = { Styles.icon__delete } onClick = { this.handleDelete } />
                    </div>
                </form>
            </section>
        );
    }


    render () {
        const { title, completed, id } = this.props;

        return this.state.editing ? this.renderForm(title, completed, id) : this.renderDisplay(title, completed, id);
    }
}
