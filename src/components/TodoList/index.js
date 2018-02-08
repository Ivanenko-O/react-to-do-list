// core
import React, { Component } from 'react';

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
        todos: JSON.parse(localStorage.getItem('todos')) || [],
        search: ''
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
    }

    _editTodo (id, title) {
        const todos = this.state.todos.map((todo) => {

            if (todo.id === id) {
                todo.title = title;
            }

            return todo;
        });
        this.setState({ todos });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    _filterList (search) {
        event.preventDefault();

        this.setState({
            search
        });
    }

    _getTodos () {
        const todos = JSON.parse(localStorage.getItem('todos'));

        this.setState({ todos });
    }

    _toggleTodo (id, completed) {

        const todos = this.state.todos.map((todo) => {

            if (todo.id === id) {
                todo.completed = !completed;
            }
            return todo;
        });

        localStorage.setItem('todos', JSON.stringify(todos));
        this.setState({ todos });
    }

    render () {
        const { todos: todoData, search } = this.state;
        const todos = todoData
            .filter((todo) => todo.title.includes(search))
            .map((todo) => (
                <TodoItems
                    key = { todo.id }
                    { ...todo }
                    createTodo = { this.createTodo }
                    deleteTodo = { this.deleteTodo }
                    editTodo = { this.editTodo }
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
