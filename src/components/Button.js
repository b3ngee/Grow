import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { style, name, onClick } = this.props;
        return (
            <button className={style} onClick={onClick}>
                {name}
            </button>
        );
    }
}

export default Button;