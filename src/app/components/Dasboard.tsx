"use client";
import React from "react";
import { useTheme } from "next-themes"; // Import the theme hook
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import Orders from "./orders";
import Inventory from "./Inventory";
import RecentOrders from "./RecentOrders";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DashboardContent = () => {
  const { theme } = useTheme(); // Get the current theme

  
  

  // Dark mode colors
  const isDarkMode = theme === "dark";
  const salesBgColor = isDarkMode ? "rgba(255, 99, 132, 0.6)" : "rgba(79, 70, 229, 0.6)";
  const salesBorderColor = isDarkMode ? "rgba(255, 99, 132, 1)" : "rgba(79, 70, 229, 1)";

  const ordersBgColor = isDarkMode ? "rgba(75, 192, 192, 0.6)" : "rgba(13, 148, 136, 0.6)";
  const ordersBorderColor = isDarkMode ? "rgba(75, 192, 192, 1)" : "rgba(13, 148, 136, 1)";

  // Chart data for Sales Overview
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [12000, 19000, 3000, 5000, 2000, 3000],
        backgroundColor: salesBgColor,
        borderColor: salesBorderColor,
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  // Chart data for Order Trends
  const ordersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Orders",
        data: [50, 70, 100, 80, 90, 120],
        backgroundColor: ordersBgColor,
        borderColor: ordersBorderColor,
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  return (
    <div className="flex-1 pl-20 p-6 overflow-y-auto">
      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <Orders />
        <Inventory />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="border p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Sales Overview
          </h3>
          <div className="h-72">
            <Bar data={salesData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Orders Chart */}
        <div className="border p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Order Trends
          </h3>
          <div className="h-72">
            <Line data={ordersData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <RecentOrders />
    </div>
  );
};

export default DashboardContent;
