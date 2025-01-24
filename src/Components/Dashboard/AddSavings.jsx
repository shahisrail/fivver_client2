import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement } from "chart.js";
import { toast } from "sonner"; // Toast for error handling

// Register the required chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement
);

const SavingsSection = () => {
  const [weeklySaving, setWeeklySaving] = useState("");
  const [totalSavings, setTotalSavings] = useState(0);
  const [weeklySavingsData, setWeeklySavingsData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [weeks, setWeeks] = useState([]);

  // Fetch data from localStorage
  useEffect(() => {
    const storedSavings = JSON.parse(localStorage.getItem("weeklySavings")) || [];
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    
    const total = storedSavings.reduce((acc, cur) => acc + cur.amount, 0);
    setWeeklySavingsData(storedSavings);
    setTotalSavings(total);
    setWeeks(storedSavings.map((_, index) => `Week ${index + 1}`));
    setExpensesData(storedExpenses);

  }, []);

  // Handle weekly saving input
  const handleInputChange = (e) => {
    setWeeklySaving(e.target.value);
  };

  // Save weekly saving
  const saveWeeklySaving = () => {
    if (isNaN(weeklySaving) || weeklySaving.trim() === "") {
      toast.error("Please enter a valid number for weekly savings.");
      return;
    }

    const newWeeklySaving = {
      week: `Week ${weeklySavingsData.length + 1}`,
      amount: parseFloat(weeklySaving),
    };

    const updatedSavings = [...weeklySavingsData, newWeeklySaving];
    const updatedTotal = totalSavings + newWeeklySaving.amount;

    localStorage.setItem("weeklySavings", JSON.stringify(updatedSavings));

    setWeeklySavingsData(updatedSavings);
    setTotalSavings(updatedTotal);
    setWeeks(updatedSavings.map((_, index) => `Week ${index + 1}`));
    setWeeklySaving(""); // Reset input
  };

  // Expenses by category chart data
  const categories = expensesData.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categories),
        backgroundColor: ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99"], // Custom colors
        hoverOffset: 4,
      },
    ],
  };

  // Line Chart data (weekly savings or expenses over time)
  const lineData = {
    labels: weeks,
    datasets: [
      {
        label: "Weekly Savings",
        data: weeklySavingsData.map((saving) => saving.amount),
        borderColor: "#4bc0c0",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="lg:p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Savings & Expenses Tracker</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Track Your Weekly Savings</h2>

        <div className="flex mb-6">
          <input
            type="text"
            value={weeklySaving}
            onChange={handleInputChange}
            placeholder="Enter weekly saving"
            className="border px-4 py-2 rounded-md bg-white text-black w-full"
          />
          <button
            onClick={saveWeeklySaving}
            className="bg-blue-500 text-white px-6 py-2 ml-4 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">Total Savings: ${totalSavings}</h3>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Savings Over Time</h3>
          <Line data={lineData} options={{ responsive: true }} />
        </div>
      </div>

     
    </div>
  );
};

export default SavingsSection;
