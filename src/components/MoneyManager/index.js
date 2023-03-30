import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    title: '',
    amount: '',
    transactionType: 'INCOME',
  }

  onInputChange = event => {
    const {id, value} = event.target
    this.setState({
      [id]: value,
    })
  }

  onTypeChange = event => {
    this.setState({
      transactionType: event.target.value,
    })
  }

  onAddTransaction = () => {
    const {title, amount, transactionType} = this.state
    if (title !== '' && amount !== '') {
      const newTransaction = {
        id: uuidv4(),
        title,
        amount: parseInt(amount),
        transactionType,
      }
      this.setState(prevState => ({
        transactionsList: [...prevState.transactionsList, newTransaction],
        title: '',
        amount: '',
      }))
    }
  }

  render() {
    const {transactionsList, title, amount, transactionType} = this.state
    const incomeTransactions = transactionsList.filter(
      transaction => transaction.transactionType === 'INCOME',
    )
    const expenseTransactions = transactionsList.filter(
      transaction => transaction.transactionType === 'EXPENSES',
    )
    const totalAmount = transactionsList.reduce(
      (total, transaction) =>
        transaction.transactionType === 'INCOME'
          ? total + transaction.amount
          : total - transaction.amount,
      0,
    )
    const incomeAmount = incomeTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0,
    )
    const expenseAmount = expenseTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0,
    )
    return (
      <div className="container">
        <div className="card">
          <h1 className="heading">Hi, Richard</h1>
          <p className="paragraph">
            Welcome back to your <span className="para">Money Manager</span>
          </p>
        </div>
        <div className="t-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              alt="balance"
              className="balance-image"
            />
            <div>
              <p className="balance-text">Your Balance</p>
              <p data-testid="balanceAmount" className="balance-amount">
                Rs {totalAmount}
              </p>
            </div>
          </div>
          <div className="income-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              alt="income"
              className="income-image"
            />
            <div>
              <p className="income-text">Your Income</p>
              <p data-testid="incomeAmount" className="income-amount">
                Rs {incomeAmount}
              </p>
            </div>
          </div>
          <div className="expenses-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              alt="expenses"
              className="expenses-image"
            />
            <div>
              <p className="expenses-text">Your Expenses</p>
              <p data-testid="expensesAmount" className="expenses-amount">
                Rs {expenseAmount}
              </p>
            </div>
          </div>
        </div>
        <div className="below-container">
          <div className="last-container">
            <h1 className="add-transaction-heading">Add Transaction</h1>
            <label htmlFor="title" className="label">
              TITLE
            </label>
            <input
              type="text"
              id="title"
              className="input"
              placeholder="Enter Title"
              value={title}
              onChange={this.onInputChange}
            />
            <label htmlFor="amount" className="label">
              AMOUNT
            </label>
            <input
              type="number"
              id="amount"
              className="input"
              placeholder="Enter Amount"
              value={amount}
              onChange={this.onInputChange}
            />
            <label htmlFor="transactionType" className="label">
              TRANSACTION TYPE
            </label>
            <select
              id="transactionType"
              className="select"
              value={transactionType}
              onChange={this.onTypeChange}
            >
              {transactionTypeOptions.map(option => (
                <option key={option.optionId} value={option.optionId}>
                  {option.displayText}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="button"
              onClick={this.onAddTransaction}
            >
              Add
            </button>
          </div>
          <div className="las-container">
            <h1 className="add-transaction-heading">History</h1>
            <div className="la-container">
              <p className="label">Title</p>
              <p className="label">Amount</p>
              <p className="label">Type</p>
              <div className="transactions-container">
                <ul className="transactions-list">
                  {transactionsList.map(transaction => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
