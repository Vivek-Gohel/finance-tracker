const express = require('express')
const router = express.Router()
const Transaction = require('../models/Transaction')

// get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find()
    res.json(transactions)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// add a transaction
router.post('/', async (req, res) => {
  const transaction = new Transaction({
    name: req.body.name,
    amount: req.body.amount,
    type: req.body.type,
    category: req.body.category,
    currency: req.body.currency
  })
  try {
    const newTransaction = await transaction.save()
    res.status(201).json(newTransaction)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// delete a transaction
router.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id)
    res.json({ message: 'Transaction deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router