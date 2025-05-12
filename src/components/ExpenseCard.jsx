import React, { useState } from 'react';
import "./ExpenseCard.css";

function ExpenseCard({ addExpense, transactions }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: ''
  });

  
  const totalExpense = transactions.reduce((acc, txn) => acc + txn.amount, 0);
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date
    };

    const success = addExpense(newExpense);
    if (success) {
      setFormData({ title: '', amount: '', category: '', date: '' });
      setShowModal(false);
    }
  };

  return (
    <div className='expense-disp'>
      <div>
        <p>Expense: <strong>₹{totalExpense}</strong></p>
      </div>
      <button className='expense-btn' onClick={() => setShowModal(true)}>+Add Expense</button>

      {showModal && (
        <div className="exp-modal-overlay">
          <div className="exp-modal-content">
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit} className='exp-form-sec'>
              <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
              <input name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="Price" required />
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="food">Food</option>
                <option value="entertainment">Entertainment</option>
                <option value="travel">Travel</option>
              </select>
              <input name="date" type="date" value={formData.date} onChange={handleChange} required max={today}/>
              <button type="submit" className='add-exp-btn'>Add Expense</button>
              <button type="button" onClick={() => setShowModal(false)} className='can-exp-btn'>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseCard;
