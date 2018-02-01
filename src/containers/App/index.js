// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import TodoList from '../../components/TodoList';

export default class App extends Component {

    render () {
        return (
            <section className = { Styles.app }>
                <TodoList />
            </section>
        );
    }
}
