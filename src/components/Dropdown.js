import React, { Component } from 'react';

class Dropdown extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { label, name, data, onSelect } = this.props;
        
        const options = data.map((d, index) => {
            return (
                <option key={index} value={d}>{d}</option>
            );
        });
        return (
            <div>
                <label>{label}</label>
                <select name={name} onChange={onSelect}>
                    <option value="">Select a filter...</option>
                    {options}
                </select>
            </div>
        );
    }
}

export default Dropdown;