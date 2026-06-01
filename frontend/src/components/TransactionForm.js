import React, { useState } from 'react'

const TransactionForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: '',
    amount: '',
    type: 'income',
    category: '',
    currency: 'USD'
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.amount || !form.category) return
    onAdd(form)
    setForm({ name: '', amount: '', type: 'income', category: '', currency: 'USD' })
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add Transaction</h2>
      <input
        type="text"
        name="name"
        placeholder="Transaction name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
      />
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        name="category"
        placeholder="Category (e.g. Food, Salary)"
        value={form.category}
        onChange={handleChange}
      />
      <select name="currency" value={form.currency} onChange={handleChange}>
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
      <button type="submit">Add</button>
    </form>
  )
}

export default TransactionForm