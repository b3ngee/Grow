import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from './Table';
import Dropdown from './Dropdown';
import Button from './Button';
import SummaryReport from './SummaryReport';
import { ACTION, SORT_ORDER, COLUMNS } from '../constants';

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
            sortByDate: SORT_ORDER[0],
        }

        this.onClick = this.onClick.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.assignFilter = this.assignFilter.bind(this);
        this.sortTransactions = this.sortTransactions.bind(this);
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
            console.log(error.response.data.message);
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
            })[0].accountName.toLowerCase();

            const action = this.getActionType(tx.amount);
            
            return {
                "TxID": tx.transactionId,
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

    assignFilter(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    applyFilter(e) {
        e.preventDefault();
    
        const { filterAccount, filterCategory } = this.state;
        
        const filteredTx = this.state.allTransactions.filter(tx => { return filterAccount !== "" ? tx.AccountType === filterAccount : tx; })
            .filter(ftx => { return filterCategory !== "" ? ftx.Category === filterCategory : ftx; });
        
        this.setState({ transactions: filteredTx });
    }

    onClick(e) {
        e.preventDefault();
        this.setState({ transactions : this.state.allTransactions });
    }

    sortTransactions(e) {
        e.preventDefault();

        if (e.target.name === SORT_ORDER[0]) {
            const sortNewToOld = this.state.transactions.sort((a, b) => {
                return new Date(b.Date).getTime() - new Date(a.Date).getTime();
            });

            this.setState({ transactions: sortNewToOld, sortByDate: SORT_ORDER[1] });
        } else {
            const sortOldToNew = this.state.transactions.sort((a, b) => {
                return new Date(a.Date).getTime() - new Date(b.Date).getTime();
            });

            this.setState({ transactions: sortOldToNew, sortByDate: SORT_ORDER[0] });
        }
    }

    render() {
        const { accounts, categories, transactions, sortByDate } = this.state;

        const accountNames = this.state.accounts.map(a => {
            return a.accountName.toLowerCase();
        });

        return (
            <div>
                <SummaryReport
                    accounts={accounts}
                />
                <Dropdown
                    label="Filter by Account:"
                    name="filterAccount"
                    data={accountNames}
                    onSelect={this.assignFilter}
                />
                <Dropdown
                    label="Filter by Category:"
                    name="filterCategory"
                    data={categories}
                    onSelect={this.assignFilter}
                />
                <Button 
                    style="btn btn-success"
                    name={sortByDate}
                    onClick={this.sortTransactions}
                />
                <Button
                    style="btn btn-success"
                    name="Apply Filter(s)"
                    onClick={this.applyFilter}
                />
                <Button 
                    style="btn btn-default"
                    name="Reset Filters"
                    onClick={this.onClick}
                />
                <Table
                    label="Transaction History"
                    columns={COLUMNS}
                    rows={transactions}
                />
            </div>
        );
    }
}

export default TransactionHistory;