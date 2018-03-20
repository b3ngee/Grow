import React, { Component } from 'react';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = this.props.columns.map(c => {
            return <th>{c}</th>
        });
        
        const dataRows = this.props.rows.map(r => {
            return <td>{r}</td>
        });

        return (
            <div className="table">
                <table>
                    <tbody>
                        <tr>{columns}</tr>
                        <tr>{dataRows}</tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;