import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Importing toast for notifications

const AddExpense = () => {
  const navigate = useNavigate();

  // State for form fields
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Transportation");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to current date
  const [notes, setNotes] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation for amount
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    // Convert amount to a number before storing
    const numericAmount = parseFloat(amount);

    // Generate a unique ID using Date.now()
    const id = Date.now();

    // Prepare the expense data
    const newExpense = {
      id,
      amount: numericAmount, // Store as a number
      category,
      date,
      notes,
    };

    // Get existing expenses from localStorage
    const existingExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Add the new expense to the existing ones
    existingExpenses.push(newExpense);

    // Save the updated expenses back to localStorage
    localStorage.setItem("expenses", JSON.stringify(existingExpenses));

    // Show a success toast
    toast.success("Expense added successfully!", {
      position: "top-center", // Toast will show at the top center
      duration: 3000, // Toast will disappear after 3 seconds
    });

    // Reset the form
    setAmount("");
    setCategory("Transportation");
    setDate(new Date().toISOString().split("T")[0]);
    setNotes("");

    // Redirect to the dashboard or another page
    navigate("/dashboard/view-expenses");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-black to-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Expense</h2>
        <form onSubmit={handleSubmit}>
          {/* Amount Field */}
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-2 p-2 border bg-white text-black border-gray-300 rounded-md"
         
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-2 p-2 border bg-white text-black border-gray-300 rounded-md"
            >
              <option value="Transportation">Transportation</option>
              <option value="Grocery">Grocery</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
              {/* Add more categories as needed */}
            </select>
          </div>

          {/* Date Field */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full mt-2 p-2 border bg-white text-black border-gray-300 rounded-md"
            />
          </div>

          {/* Notes Field */}
          <div className="mb-4">
            <label htmlFor="notes" className="block bg-white text-black text-sm font-medium ">
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 bg-white text-black rounded-md"
              placeholder="Enter additional details (optional)"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
