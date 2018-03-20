import React, { Component } from 'react';
import axios from 'axios';
import Table from './Table';
import Dropdown from './Dropdown';
import Button from './Button';
import { ACTION, COLUMNS } from '../constants';

class TransactionHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            categories: [],
            transactions: [],
            allTransactions: [], // never changes
            transactionData: {},
            filterAccount: "",
            filterCategory: "",
        }

        this.parseTransactions = this.parseTransactions.bind(this);
        this.getActionType = this.getActionType.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        axios.get('http://demo7235469.mockable.io/transactions').then(response => {
            if (response.status === 200) {
                const data = response.data;
                const transactions = this.parseTransactions(data.accounts, data.transactionData.transactions);

                this.setState({ accounts: data.accounts, categories: data.categories, transactions: transactions, allTransactions: transactions, transactionData: data.transactionData });
            }
        }).catch(error => {
            // error handling
        })
    }

    getActionType(amount) {
        if (amount < 0) {
            return ACTION[0];
        } 
        
        return ACTION[1];
    }

    parseTransactions(accs, txs) {
        const transactions = txs.map(tx => {
            const accountName = accs.filter(a => {
                return a.accountId === tx.accountId;
            })[0].accountName;

            const action = this.getActionType(tx.amount);

            return {
                "Date": tx.transactionDate,
                "AccountType": accountName,
                "Description": tx.description,
                "Category": tx.category,
                "Action": action,
                "Amount": tx.amount,
                "TotalAmount": tx.runningBalance,
            }
        });

        return transactions;
    }

    onSelect(e) {
        e.preventDefault();

        const filter = e.target.name;
        const value = e.target.value;

        if (filter === "filterAccount") {
            const filteredByAccount = this.state.transactions.filter(tx => tx.AccountType === value);
            this.setState({ transactions: filteredByAccount });
        } else {
            const filteredByCategory = this.state.transactions.filter(tx => tx.Category === value);
            this.setState({ transactions: filteredByCategory });
        }
    }

    onClick(e) {
        e.preventDefault();
        this.setState({ transactions : this.state.allTransactions });
    }

    render() {
        const accountNames = this.state.accounts.map(a => {
            return a.accountName;
        });

        return (
            <div>
                <Dropdown
                    label="Filter by Account:"
                    name="filterAccount"
                    data={accountNames}
                    onSelect={this.onSelect}
                />
                <Dropdown
                    label="Filter by Category:"
                    name="filterCategory"
                    data={this.state.categories}
                    onSelect={this.onSelect}
                />
                <Button 
                    style="btn btn-default"
                    name="Reset Filters"
                    onClick={this.onClick}
                />
                <Table
                    columns={COLUMNS}
                    rows={this.state.transactions}
                />
            </div>
        );
    }
}

export default TransactionHistory;