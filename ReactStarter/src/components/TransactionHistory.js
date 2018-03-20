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
        this.formatCateogry = this.formatCateogry.bind(this);
        this.formatAmount = this.formatAmount.bind(this);
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

    formatCateogry(category) {
        return category.replace("_", " ");
    }

    formatAmount(amount) {
        return amount < 0 ? amount * -1 : amount;
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
                "Account Type": accountName,
                "Description": tx.description,
                "Category": tx.category,
                "Action": action,
                "Amount": tx.amount,
                "Total Amount": tx.runningBalance,
            }
        });

        return transactions;
    }

    render() {
        console.log("tx: ", this.state.transactions);
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