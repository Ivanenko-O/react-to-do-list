// core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// instruments
import Styles from './styles';

export default class TodoItems extends Component {
    static propTypes = {
        completed:  PropTypes.bool.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        editTodo:   PropTypes.func.isRequired,
        id:         PropTypes.string.isRequired,
        title:      PropTypes.string.isRequired,
        toggleTodo: PropTypes.func.isRequired
    };
    constructor () {
        super();
        this.handleSubmit = :: this._handleSubmit;
        this.handleToggle = :: this._handleToggle;
        this.handleDelete = :: this._handleDelete;
        this.startEdit = ::this._startEdit;
    }
    state = {
        editing: false
    };

    _handleChange = ({ target }) => {
        const { value: title } = target;

        this.setState({ title });
    };

    _handleSubmit (event) {
        event.preventDefault();

        const { title } = this.state;
        const { id } = this.props;

        if (title) {
            this.props.editTodo(id, title);
        }

        this.setState({
            editing: false
        });
    }

    _handleToggle () {
        const { id, completed } = this.props;

        this.props.toggleTodo(id, completed);
    }

    _handleDelete () {
        const { id } = this.props;

        this.props.deleteTodo(id);
    }

    _startEdit () {

        this.setState({
            editing: true
        });
    }

    render () {
        const { title, completed, id } = this.props;

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

                {
                    this.state.editing ?
                        <form
                            onSubmit = { this.handleSubmit }>
                            <input
                                type = 'text'
                                value = { this.state.title || title }
                                onChange = { this._handleChange }
                                onKeyPress = { this.handleKeyPress }
                            />
                        </form>
                        : <p> { title } </p>
                }

                <div className = { Styles.icon }>
                    <i className = { Styles.icon__bookmark } />
                    <i className = { Styles.icon__edit } onClick = { this.startEdit } />
                    <i className = { Styles.icon__delete } onClick = { this.handleDelete } />
                </div>

            </section>
        );
    }
}
