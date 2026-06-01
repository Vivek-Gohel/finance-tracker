import React, { useEffect, useState } from 'react'
import { getTransactions, addTransaction, deleteTransaction } from '../api'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const Dashboard = () => {
  const [transactions, setTransactions] = useState([])

  const fetchTransactions = async () => {
    const res = await getTransactions()
    setTransactions(res.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleAdd = async (form) => {
    await addTransaction(form)
    fetchTransactions()
  }

  const handleDelete = async (id) => {
    await deleteTransaction(id)
    fetchTransactions()
  }

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  const categories = [...new Set(transactions.map((t) => t.category))]
  const categoryTotals = categories.map((cat) =>
    transactions
      .filter((t) => t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0)
  )

  const chartData = {
    labels: categories,
    datasets: [
      {
        data: categoryTotals,
        backgroundColor: [
          '#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0', '#00BCD4'
        ]
      }
    ]
  }

  return (
    <div className="dashboard">
      <h1>💰 Finance Tracker</h1>
      <div className="summary">
        <div className="card green">
          <h3>Income</h3>
          <p>{totalIncome}</p>
        </div>
        <div className="card red">
          <h3>Expenses</h3>
          <p>{totalExpense}</p>
        </div>
        <div className="card blue">
          <h3>Balance</h3>
          <p>{balance}</p>
        </div>
      </div>
      {transactions.length > 0 && (
        <div className="chart">
          <h2>Spending by Category</h2>
          <Pie data={chartData} />
        </div>
      )}
      <TransactionForm onAdd={handleAdd} />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
    </div>
  )
}

export default Dashboard