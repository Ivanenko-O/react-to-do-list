// core
import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import TransitionGroup from 'react-transition-group/TransitionGroup';

// instruments
import Styles from './styles.scss';
import TodoItems from '../TodoItems';
import TodoSearch from '../../components/TodoSearch';
import TodoForm from '../TodoForm';
import { getUniqueID } from '../../helpers';

export default class TodoList extends Component {
    constructor () {
        super();

        this.createTodo = ::this._createTodo;
        this.doneALl = ::this._doneALl;
        this.deleteTodo = ::this._deleteTodo;
        this.editTodo = ::this._editTodo;
        this.filterList = :: this._filterList;
        this.getTodos = :: this._getTodos;
        this.toggleTodo = ::this._toggleTodo;
    }

    state = {
        completed: false,
        todos: JSON.parse(localStorage.getItem('todos')) || [],
        search: ''
    };

    componentDidMount () {
        this.getTodos();
    }

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

    _doneALl () {
        let { completed } = this.state;

        const todos = this.state.todos.map((todo) => {
            todo.completed = !completed;

            return todo;
        });

        this.setState({
            completed: !completed,
            todos
        });

        localStorage.setItem('todos', JSON.stringify(todos));
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

                <CSSTransition
                    classNames = { {
                        enter:        Styles.todoInStart,
                        enterActive:  Styles.todoInEnd,
                        exit:         Styles.todoOutStart,
                        exitActive:   Styles.todoOutEnd
                    } }
                    key = { todo.id }
                    timeout = { 500 } >
                    <TodoItems
                        key = { todo.id }
                        { ...todo }
                        createTodo = { this.createTodo }
                        deleteTodo = { this.deleteTodo }
                        editTodo = { this.editTodo }
                        toggleTodo = { this.toggleTodo }
                    />
                </CSSTransition>
            ));

        return (
            <section className = { Styles.todoList } >
                <h3>To Do List</h3>
                <TodoSearch filterList = { this.filterList } />
                <hr />
                <TransitionGroup>
                    { todos }
                </TransitionGroup>
                <hr />
                <TodoForm createTodo = { this.createTodo } doneALl = { this.doneALl } />
            </section>
        );
    }
}
