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
        this.editTodo = ::this._editTodo;
        this.toggleTodo = ::this._toggleTodo;
        this.deleteTodo = ::this._deleteTodo;
        this.filterList = :: this._filterList;
    }

    state = {
        todos: [
            {
                id:        '1',
                title:     'Изучить JavaScript',
                completed: true
            }
        ]
    };


    _createTodo (title) {
        const todo = {
            id:        getUniqueID(),
            title,
            completed: false
        };

        const todos = [todo, ...this.state.todos];
        this.setState({ todos });
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

    _toggleTodo (id, completed) {
        const todos = this.state.todos.map( todo => {

            if (todo.id === id) {
                todo.completed = !completed;
            }
            return todo;
        });
        this.setState({ todos });

    }

    _deleteTodo (id) {
        this.setState(({ todos }) => ({
            todos: todos.filter((todo) => id !== todo.id)
        }));
    }

    _filterList (data) {
        // const fList = this.state.todos.filter(function(item){
        //     return item.title.toLowerCase().search(data.toLowerCase())!== -1;
        // });
        // обновление состояния
        this.setState(({ todos }) => ({
            todos: todos.filter((item) =>
                item.title.toLowerCase().search(data.toLowerCase()) !== -1)
        }));
    }

    render () {

        const { todos: todoData } = this.state;
        const todos = todoData.map((todo) => (
            <TodoItems key        = { todo.id }
                       { ...todo }
                       toggleTodo = { this.toggleTodo }
                       editTodo   = { this.editTodo }
                       deleteTodo = { this.deleteTodo }

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
