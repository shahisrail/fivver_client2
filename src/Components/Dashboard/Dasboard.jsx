import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { toast } from "sonner"; // Toast for error handling

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [weeklySaving, setWeeklySaving] = useState("");
  const [totalSavings, setTotalSavings] = useState(0);
  const [weeklySavingsData, setWeeklySavingsData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    // Fetch user data from localStorage
    const userProfile = JSON.parse(localStorage.getItem("user")) || {};
    setUsername(userProfile.username || "");

    // Fetch expenses data from localStorage
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpensesData(storedExpenses);

    // Fetch weekly savings data from localStorage
    const storedWeeklySavings = JSON.parse(localStorage.getItem("weeklySavings")) || [];
    const total = storedWeeklySavings.reduce((acc, cur) => acc + cur.amount, 0);
    setWeeklySavingsData(storedWeeklySavings);
    setTotalSavings(total);
    setWeeks(storedWeeklySavings.map((_, index) => `Week ${index + 1}`));
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

  // Group expenses by category and calculate total for each category
  const groupedCategories = expensesData.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  const categories = Object.keys(groupedCategories);
  const categoryAmounts = Object.values(groupedCategories);

  // Expenses by category chart data
  const pieData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: categoryAmounts,
        backgroundColor: ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99"], // Custom colors
        hoverOffset: 4,
      },
    ],
  };

  // Line Chart data (weekly savings over time)
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
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Welcome Message */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Welcome back, {username}!
        </h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Expenses Card */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Total Expenses</h3>
            <p className="text-2xl text-gray-900 mt-2">
              ${expensesData.reduce((acc, expense) => acc + expense.amount, 0)}
            </p>
          </div>

          {/* Total Savings Card */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Total Savings</h3>
            <p className="text-2xl text-gray-900 mt-2">${totalSavings.toFixed(2)}</p>
          </div>

          {/* Expense Categories Card */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Expenses by Category</h3>
            {categories.map((category, index) => (
              <p key={index} className="text-lg text-gray-600 mt-1">
                {category}: ${categoryAmounts[index].toFixed(2)}
              </p>
            ))}
          </div>
        </div>

        {/* Charts in Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Expense Chart (Pie Chart) */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Expense Breakdown</h3>
            <div className="h-64">
              <Pie data={pieData} />
            </div>
          </div>

          {/* Savings Chart (Line Chart) */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Savings Over Time</h3>
            <div className="h-64">
              <Line data={lineData} />
            </div>
          </div>
        </div>

      
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
