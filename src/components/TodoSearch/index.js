// core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// instruments
import Styles from './styles';

export default class TodoSearch extends Component {

    constructor () {
        super();
    }

    render () {
        return (
            <section className = { Styles.todoSearch }>
                <input placeholder = 'Search' type = 'search' />
                <i className = { Styles.search__icon } ></i>
            </section>
        );
    }
}
