import React, { useState, useEffect } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from "chart.js";
import { toast } from "sonner"; // To show error messages

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement
);

const ViewGraphs = () => {
  const [expenses, setExpenses] = useState([]);
  const [weeklySaving, setWeeklySaving] = useState("");
  const [weeklySavingsData, setWeeklySavingsData] = useState([]);
  const [totalSavings, setTotalSavings] = useState(0);
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const storedSavings =
      JSON.parse(localStorage.getItem("weeklySavings")) || [];

    const totalSavingsAmount = storedSavings.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );
    setExpenses(storedExpenses);
    setWeeklySavingsData(storedSavings);
    setTotalSavings(totalSavingsAmount);
    setWeeks(storedSavings.map((_, index) => `Week ${index + 1}`));
  }, []);

  // Handle weekly saving input
  const handleInputChange = (e) => setWeeklySaving(e.target.value);

  // Handle save weekly saving
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

  // Prepare Pie Chart (Expenses per category)
  const categories = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categories),
        backgroundColor: ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99"], // Custom colors for categories
        hoverOffset: 4,
      },
    ],
  };

  // Prepare Bar Chart (Expenses per category comparison)
  const barData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categories),
        backgroundColor: "#42a5f5",
      },
    ],
  };

  // Line Chart Data (Weekly or Monthly Tracking of Expenses or Savings)
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
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Expenses & Savings Tracker
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Weekly Savings Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold">
              Total Savings: ${totalSavings}
            </h3>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Savings Over Time</h3>
            {weeklySavingsData.length === 0 ? (
              <p className="text-center text-gray-500">No data available</p>
            ) : (
              <Line data={lineData} options={{ responsive: true }} />
            )}
          </div>
        </div>

        {/* Expenses by Category Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Expenses by Category
          </h2>

          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Expense Distribution</h3>
            {expenses.length === 0 ? (
              <p className="text-center text-gray-500">No data available</p>
            ) : (
              <div className="h-[200px] lg:h-[500px]" >
                <Pie data={pieData} options={{ responsive: true }} />
              </div>
            )}
          </div>
        </div>

        {/* Expense Comparison Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Expenses Comparison
          </h2>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Expense Comparison</h3>
            {expenses.length === 0 ? (
              <p className="text-center text-gray-500">No data available</p>
            ) : (
              <Bar data={barData} options={{ responsive: true }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGraphs;
