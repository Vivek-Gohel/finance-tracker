import React from 'react'

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="list">
      <h2>Transactions</h2>
      {transactions.length === 0 && <p>No transactions yet</p>}
      {transactions.map((t) => (
        <div key={t._id} className={`transaction ${t.type}`}>
          <div>
            <strong>{t.name}</strong>
            <span className="category"> — {t.category}</span>
          </div>
          <div className="right">
            <span>{t.currency} {t.amount}</span>
            <button onClick={() => onDelete(t._id)}>✕</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TransactionList