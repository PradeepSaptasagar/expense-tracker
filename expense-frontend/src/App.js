import { useState, useEffect } from "react";
import "./App.css";

const API = "http://127.0.0.1:8000/api/expenses/";

const CATEGORIES = ["food", "transport", "shopping", "bills", "health", "other"];

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [form, setForm] = useState({
    title: "", amount: "", category: "food", date: "", note: ""
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps  
  useEffect(() => {
    fetchExpenses();
  }, [filterCategory, dateFrom, dateTo]);

  const fetchExpenses = async () => {
    let url = API + "?";
    if (filterCategory) url += `category=${filterCategory}&`;
    if (dateFrom) url += `date_from=${dateFrom}&`;
    if (dateTo) url += `date_to=${dateTo}&`;
    const res = await fetch(url);
    const data = await res.json();
    setExpenses(data);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.amount || !form.date) {
      alert("Title, amount and date are required.");
      return;
    }
    const method = editingExpense ? "PUT" : "POST";
    const url = editingExpense ? `${API}${editingExpense.id}/` : API;
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ title: "", amount: "", category: "food", date: "", note: "" });
    setEditingExpense(null);
    setShowForm(false);
    fetchExpenses();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    await fetch(`${API}${id}/`, { method: "DELETE" });
    fetchExpenses();
  };

  const handleEdit = (expense) => {
    setForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      note: expense.note || "",
    });
    setEditingExpense(expense);
    setShowForm(true);
  };

  const total = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

  return (
    <div className="container">
      <div className="header">
        <h1>Expense Tracker</h1>
        <button className="btn-add" onClick={() => { setShowForm(!showForm); setEditingExpense(null); setForm({ title: "", amount: "", category: "food", date: "", note: "" }); }}>
          {showForm ? "Cancel" : "+ Add Expense"}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>{editingExpense ? "Edit Expense" : "New Expense"}</h2>
          <div className="form-grid">
            <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <input type="number" placeholder="Amount (₹)" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            <input placeholder="Note (optional)" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} className="full-width" />
          </div>
          <button className="btn-submit" onClick={handleSubmit}>
            {editingExpense ? "Update" : "Save Expense"}
          </button>
        </div>
      )}

      <div className="filters">
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
        </select>
        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} placeholder="From" />
        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} placeholder="To" />
        <button className="btn-clear" onClick={() => { setFilterCategory(""); setDateFrom(""); setDateTo(""); }}>Clear</button>
      </div>

      <div className="summary-bar">
        <span>{expenses.length} expense{expenses.length !== 1 ? "s" : ""}</span>
        <span>Total: <strong>₹{total.toFixed(2)}</strong></span>
      </div>

      <div className="expense-list">
        {expenses.length === 0 && <p className="empty">No expenses found.</p>}
        {expenses.map(e => (
          <div className="expense-card" key={e.id}>
            <div className="expense-left">
              <span className={`badge badge-${e.category}`}>{e.category}</span>
              <div>
                <p className="expense-title">{e.title}</p>
                <p className="expense-meta">{e.date}{e.note ? ` · ${e.note}` : ""}</p>
              </div>
            </div>
            <div className="expense-right">
              <p className="expense-amount">₹{parseFloat(e.amount).toFixed(2)}</p>
              <div className="expense-actions">
                <button className="btn-edit" onClick={() => handleEdit(e)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(e.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;