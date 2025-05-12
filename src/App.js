import { useEffect, useState } from "react";
import "./App.css";
import BalanceCard from "./components/BalanceCard";
import ExpenseCard from "./components/ExpenseCard";
import ExpensePieChart from "./components/ExpensePieChart";
import TransactionTable from "./components/TransactionTable";
import { SnackbarProvider, useSnackbar } from "notistack";
import ExpenseBarChart from "./components/ExpenseBarChart";

function AppWrapper() {
  return (
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  );
}

function App() {
  const { enqueueSnackbar } = useSnackbar();

  const [balance, setBalance] = useState(() => {
    const storedBal = localStorage.getItem("balance");
    return storedBal ? JSON.parse(storedBal) : 5000;
  });

  const [transactions, setTransactions] = useState(() => {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addExpense = (newExpense) => {
    if (newExpense.amount > balance) {
      enqueueSnackbar("Insufficient balance", { variant: "error" });
      return false;
    }

    setTransactions((prev) => [...prev, { ...newExpense, id: Date.now() }]);
    setBalance((prev) => prev - newExpense.amount);
    enqueueSnackbar("Expense added!", { variant: "success" });
    return true;
  };

  const deleteExpense = (id) => {
    const toDelete = transactions.find((t) => t.id === id);
    if (toDelete) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      setBalance((prev) => prev + toDelete.amount);
      enqueueSnackbar("Expense deleted and amount refunded", {
        variant: "info",
      });
    }
  };

  const updateExpense = (updatedExpense) => {
  const oldTxn = transactions.find(t => t.id === updatedExpense.id);
  if (!oldTxn) return;

  const amountDiff = updatedExpense.amount - oldTxn.amount;

  setBalance(prevBalance => prevBalance - amountDiff);

  setTransactions(prev =>
    prev.map(txn =>
      txn.id === updatedExpense.id ? updatedExpense : txn
    )
  );

  enqueueSnackbar("Expense updated", { variant: "success" });
};

  return (
    <>
    <div className="App">
      <h1>Expense Tracker</h1>
      <div className="overview-sect">
        <BalanceCard balance={balance} setBalance={setBalance} />
        <ExpenseCard addExpense={addExpense} transactions={transactions}/>
        <ExpensePieChart transactions={transactions} />
      </div>
      <div className="grid-layout">
        <div className="grid-left">
          <TransactionTable
            transactions={transactions}
            deleteExpense={deleteExpense}
            updateExpense={updateExpense}
          />
        </div>

        <div className="grid-right">
          <ExpenseBarChart transactions={transactions} />
        </div>
      </div>
    </div>
    <div>
      <footer className="app-footer">
        <p>
          © {new Date().getFullYear()} Expense Tracker. Built with ❤️ in React.
        </p>
      </footer>
    </div>
    </>
  );
}

export default AppWrapper;
