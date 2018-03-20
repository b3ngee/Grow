import React, { Component } from 'react';

class SummaryReport extends Component {
    render() {
        const { transactions, accounts } = this.props.location.state;
        
        const accountTotals = accounts.map(a => {
            return (
                <li key={a.accountId} className="list-group-item">
                    <h2 className="list-group-item-heading">{a.accountName}</h2>
                    <h4 className="list-group-item-text">Total Balance: ${a.balance}</h4>
                </li>
            );
        });

        return (
            <div>
                <h1>Account Balance Summary</h1>
                {accountTotals}
            </div>
        );
    }
}

export default SummaryReport;