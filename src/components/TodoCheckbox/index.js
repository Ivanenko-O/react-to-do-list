// core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// instruments
import Styles from './styles';


export default class TodoCheckbox extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <section className = { Styles.checkbox }>
                <input type = 'checkbox' id="c" />
                <label htmlFor = "c" >Done all</label>
            </section>
        );
    }
}
