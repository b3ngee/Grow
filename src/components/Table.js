import React, { Component } from 'react';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = this.props.columns.map((c, index) => {
            return <th key={index}>{c}</th>
        });
        
        const dataRows = this.props.rows.map((r, index) => {
            return (
                <tr key={index}>
                    <td>{r.Date}</td>
                    <td>{r.AccountType}</td>
                    <td>{r.Description}</td>
                    <td>{r.Category}</td>
                    <td>{r.Action}</td>
                    <td>{r.Amount}</td>
                    <td>{r.TotalAmount}</td>
                </tr>
            );
        });

        return (
            <div>
                <h4>{this.props.label}</h4>
                <table className="table">
                    <tbody>
                        <tr>{columns}</tr>
                        {dataRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;