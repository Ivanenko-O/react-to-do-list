// core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// instruments
import Styles from './styles';


export default class TodoCheckbox extends Component {
    constructor () {
        super();
    }

    render () {


        return (
            <section className = { Styles.checkbox }>
                <input type = 'checkbox' id = 'doneAll' />
                <label htmlFor = 'doneAll'>Done all</label>
            </section>
        );
    }
}
