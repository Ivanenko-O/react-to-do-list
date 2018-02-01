// core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// instruments
import Styles from './styles';
import TodoCheckbox from '../TodoCheckbox';

export default class TodoForm extends Component {

    constructor () {
        super();
        this.handleSubmit = :: this._handleSubmit;
        this.createTodo = :: this._createTodo;
        this.handleChange = :: this._handleChange;
        this.handleKeyPress = :: this._handleKeyPress;
    }

    static propTypes = {
        createTodo: PropTypes.func.isRequired
    };

    state = {
        title:  ''
    };

    _handleSubmit (event) {
        event.preventDefault();
        this.createTodo();
    }

    _handleChange (event) {
        const title = event.target.value;

        (title.length < 30) ? this.setState({ title }) : title.slice(-1);
    }

    _createTodo () {
        const { title } = this.state;

        if (title) {
            this.props.createTodo(title);
            this.setState({ title: ''} );
        }
    }

    _handleKeyPress (event) {
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            event.preventDefault();
            this.createTodo();
        }
    }


    render () {
        const { title } = this.state;

        return (
            <section className = { Styles.todoForm }>
                <TodoCheckbox />
                <form onSubmit = { this.handleSubmit }>
                    <textarea placeholder = 'write here' value = { title } onChange = { this.handleChange } onKeyPress = { this.handleKeyPress } />
                    <input type = 'submit' value = 'Add task' />
                </form>
            </section>
        );
    }
}
