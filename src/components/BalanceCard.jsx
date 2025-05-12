import React, { useState } from 'react';
import "./BalanceCard.css";

function BalanceCard({balance, setBalance}) {

  let [showModal, setShowModal] = useState(false);
  let [addAmt, setAddAmt] = useState("");

  let handleOpen = () => setShowModal(true);
  let handleClose = () => setShowModal(false);

  let handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(addAmt);
    if(!isNaN(amount) && amount > 0) {
      setBalance(prev => prev + amount);
      setAddAmt("");
      handleClose(false);
    }
    handleClose(false);
  }

  return (
    <div className="wallet-disp">
        <div>
            <p>Wallet Balance: <strong>{balance}</strong></p>
        </div>
        <button className='wallet-btn' onClick={handleOpen}>+Add Income</button>

        {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Balance</h2>
            <form onSubmit={handleSubmit} className='form-sec'>
              <input type="number" placeholder="Income Amount" required onChange={(e) => setAddAmt(e.target.value)}/>
              <button className="add-btn" type="submit">Add Balance</button>
              <button className="can-btn" type="button" onClick={handleClose}>
                  Cancel
                </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default BalanceCard