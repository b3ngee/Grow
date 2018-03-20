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
            return (
                <tr>
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

        console.log("rows: ", this.props.rows);

        return (
            <div className="table">
                <table>
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