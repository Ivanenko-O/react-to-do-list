// core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// instruments
import Styles from './styles';

export default class TodoSearch extends Component {
    static propTypes = {
        filterList: PropTypes.func.isRequired
    };
    constructor () {
        super();

        this.filterList = :: this._filterList;
    }

    _filterList (event) {
        // console.log(event.target.value);
        this.props.filterList(event.target.value);
    }


    render () {
        return (
            <section className = { Styles.todoSearch } onChange = { this.filterList } >
                <input placeholder = 'Search' type = 'search' />
                <i className = { Styles.search__icon } ></i>
            </section>
        );
    }
}
