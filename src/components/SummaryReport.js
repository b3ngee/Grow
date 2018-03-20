import React, { Component } from 'react';

class SummaryReport extends Component {
    render() {
        const accountTotals = this.props.accounts.map(a => {
            return (
                <li key={a.accountId} className="list-group-item">
                    <p className="list-group-item-text">{a.accountName.toLowerCase()}</p>
                    <p className="list-group-item-text">Total Balance: ${a.balance}</p>
                </li>
            );
        });

        return (
            <div>
                <h4>Account Balance Summary</h4>
                {accountTotals}
            </div>
        );
    }
}

export default SummaryReport;