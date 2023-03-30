import {useState} from 'react'

function TransactionList() {
  const [transactions, setTransactions] = useState([])

  function handleAddTransaction(transaction) {
    setTransactions([...transactions, transaction])
  }

  return (
    <div>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.amount} - {transaction.description}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() =>
          handleAddTransaction({
            id: Date.now(),
            amount: 100,
            description: 'New transaction',
          })
        }
      >
        Add transaction
      </button>
    </div>
  )
}

export default TransactionList
