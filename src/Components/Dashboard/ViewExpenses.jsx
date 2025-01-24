import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expensesPerPage] = useState(10); // Number of items per page
  const [showModal, setShowModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  useEffect(() => {
    // Get the expenses from localStorage when the component mounts
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  }, []);

  // Handle delete
  const handleDelete = (id) => {
    // Filter out the expense with the matching ID
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);

    // Update the localStorage with the new list
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    // Update the state
    setExpenses(updatedExpenses);

    // Show success message
    toast.success("Expense deleted successfully!", {
      position: 'top-center',
      duration: 3000,
    });

    // Close the modal
    setShowModal(false);
  };

  // Handle delete button click
  const confirmDelete = (expense) => {
    setExpenseToDelete(expense);
    setShowModal(true);
  };

  // Handle cancel delete
  const cancelDelete = () => {
    setShowModal(false);
  };

  // Calculate the index of the last expense for the current page
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Disable "Next" button when the last page is reached
  const disableNext = currentPage * expensesPerPage >= expenses.length;

  return (
    <div className="lg:p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Expenses</h1>

      {expenses.length === 0 ? (
        <p className="text-center text-3xl text-red-600 font-bold">No expenses added yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentExpenses.map((expense, index) => (
                <tr
                  key={expense.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                >
                  <td className="px-4 py-2">{expense.date}</td>
                  <td className="px-4 py-2">{expense.category}</td>
                  <td className="px-4 py-2">${expense.amount}</td>
                  <td className="px-4 py-2">{expense.notes || "No notes"}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => confirmDelete(expense)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-5 mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={disableNext}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-semibold">Are you sure you want to delete this expense?</h3>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
                onClick={() => handleDelete(expenseToDelete.id)}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewExpenses;
