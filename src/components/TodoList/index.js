// core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// instruments
import Styles from './styles';
import TodoItems from '../TodoItems';
import TodoSearch from '../../components/TodoSearch';
import TodoForm from '../TodoForm';
import { getUniqueID } from '../../helpers';

export default class TodoList extends Component {
    constructor () {
        super();

        this.createTodo = ::this._createTodo;
        this.deleteTodo = ::this._deleteTodo;
        this.editTodo = ::this._editTodo;
        this.filterList = :: this._filterList;
        this.getTodos = :: this._getTodos;
        this.toggleTodo = ::this._toggleTodo;
    }

    state = {
        todos: JSON.parse(localStorage.getItem('todos')) || []
    };

    _createTodo (title) {
        const todo = {
            id:        getUniqueID(),
            title,
            completed: false
        };

        const todos = [todo, ...this.state.todos];
        localStorage.setItem('todos', JSON.stringify(todos));
        this.setState({ todos });
    }

    _deleteTodo (id) {
        const { todos: todosData } = this.state;
        const todos = todosData.filter((todo) => id !== todo.id);

        this.setState({
            todos: todos
        });
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log(this.state);
    }

    _editTodo (id, title) {
        const todos = this.state.todos.map( todo => {

            if (todo.id === id) {
                todo.title = title;
            }
            return todo;
        });
        this.setState({ todos });
    }

    _filterList (data) {
        event.preventDefault();
        if( data ) {
            this.setState(({todos}) => ({
                todos: todos.filter((todo) =>
                    todo.title.toLowerCase().search(data.toLowerCase()) !== -1)
            }));
        } else {
            this.getTodos();
        }
    }

    _getTodos () {
        console.log('s');
        const todos = JSON.parse(localStorage.getItem('todos'));
        this.setState({ todos });
    }

    _toggleTodo (id, completed) {
        const todos = this.state.todos.map( todo => {

            if (todo.id === id) {
                todo.completed = !completed;
            }
            return todo;
        });
        this.setState({ todos });

    }

    render () {
        const { todos: todoData } = this.state;
        const todos = todoData.map((todo) => (
            <TodoItems
                key = { todo.id }
                { ...todo }
                deleteTodo = { this.deleteTodo }
                editTodo = { this.editTodo }
                // getTodos = { this.getTodos }
                toggleTodo = { this.toggleTodo }
            />
        ));

        return (
            <section className = { Styles.todoList } >
                <h3>To Do List</h3>
                <TodoSearch filterList = { this.filterList } />
                <hr />
                { todos }
                <hr />
                <TodoForm createTodo = { this.createTodo } />
            </section>
        );
    }
}
