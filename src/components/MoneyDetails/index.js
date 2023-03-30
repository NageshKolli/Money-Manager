import React from 'react'

function MoneyDetails(props) {
  const {transactionsList} = props

  const transactionListItems = transactionsList.map((transaction, index) => {
    return (
      <li key={index}>
        {transaction.description} - {transaction.amount}
      </li>
    )
  })

  return (
    <div>
      <h2>Transaction Details</h2>
      <ul>{transactionListItems}</ul>
    </div>
  )
}

export default MoneyDetails
