import React, { Component } from 'react';
import axios from 'axios';
import Table from './Table';
import { ACTION, COLUMNS } from '../constants';

class TransactionHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            categories: [],
            transactions: [],
            transactionData: {},
        }

        this.parseTransactions = this.parseTransactions.bind(this);
        this.getActionType = this.getActionType.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        axios.get('http://demo7235469.mockable.io/transactions').then(response => {
            if (response.status === 200) {
                const data = response.data;
                const transactions = this.parseTransactions(data.accounts, data.transactionData.transactions);

                this.setState({ accounts: data.accounts, categories: data.categories, transactions: transactions, transactionData: data.transactionData });
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

            // const category = this.formatCateogry(tx.category);

            // const amount = this.formatAmount(tx.amount);

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

    render() {
        return (
            <div>
                <Table
                    columns={COLUMNS}
                    rows={this.state.transactions}
                />
            </div>
        );
    }
}

export default TransactionHistory;