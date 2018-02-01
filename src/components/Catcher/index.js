import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './styles';

export default class Catcher extends Component {
    static propTypes = {
        children: PropTypes.object.isRequired
    };

    state = {
        error: false
    };

    componentDidCatch (error, stack){
        this.setState({
            error: true
        });
    }

    render () {
        const { error }    = this.state;
        const { children } = this.props;

        if (error) {
            return (
                <section className = { Styles.catcher }>
                    <span>Too long task.</span>
                    <p>Try to do smth, don't write poems bigger than 30 symbols.</p>
                </section>
            )
        }

        return children;

    }
}
