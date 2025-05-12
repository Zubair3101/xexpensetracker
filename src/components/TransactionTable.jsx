import React, { useState } from "react";
import "./TransactionTable.css";
import { FaUtensils, FaFilm, FaBus } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import "./ExpenseCard.css";

const iconMap = {
  food: <FaUtensils />,
  entertainment: <FaFilm />,
  travel: <FaBus />,
};

const ITEMS_PER_PAGE = 3;

function TransactionTable({ transactions, deleteExpense, updateExpense }) {
  const [page, setPage] = useState(1);
  const [editModal, setEditModal] = useState(null); // stores the item being edited

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = transactions.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const openEditModal = (txn) => {
    setFormData({ ...txn });
    setEditModal(true);
  };

  const closeEditModal = () => {
    setFormData({ id: null, title: "", amount: "", category: "", date: "" });
    setEditModal(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateExpense({ ...formData, amount: parseFloat(formData.amount) });
    closeEditModal();
  };

  return (
    <div className="transaction-sec">
      <h2>
        <em>Recent Transactions</em>
      </h2>
      <div className="transaction-card">
        {transactions.length === 0 ? (
          <p className="no-transactions">No Transactions!</p>
        ) : (
          currentItems.map((item) => (
            <div className="transaction-row" key={item.id}>
              <div className="left-content">
                <div className="icon">{iconMap[item.category]}</div>
                <div>
                  <p className="title">{item.title}</p>
                  <p className="date">{item.date}</p>
                </div>
              </div>
              <div className="right-content">
                <p className="amount">₹{item.amount}</p>
                <div className="actions">
                  <button
                    className="del-btn"
                    onClick={() => deleteExpense(item.id)}
                  >
                    <MdDelete />
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => openEditModal(item)}
                  >
                    <MdEdit />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {transactions.length > 0 && (
          <div className="pagination">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              ←
            </button>
            <span>{page}</span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              →
            </button>
          </div>
        )}

        {editModal && (
          <div className="exp-modal-overlay">
            <div className="exp-modal-content">
              <h2>Edit Expense</h2>
              <form onSubmit={handleEditSubmit} className="exp-form-sec">
                <input
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
                <input
                  name="price"
                  type="number"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  required
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select Category</option>
                  <option value="food">Food</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="travel">Travel</option>
                </select>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
                <div style={{ marginTop: "1rem" }}>
                  <button type="submit" className="update-btn">
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={closeEditModal}
                    style={{ marginLeft: "10px" }}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionTable;
