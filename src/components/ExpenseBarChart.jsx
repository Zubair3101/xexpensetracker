import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function ExpenseBarChart({ expenses }) {
  const categoryCounts = {
    food: 0,
    travel: 0,
    entertainment: 0,
  };

  expenses.forEach((txn) => {
    if (categoryCounts[txn.category] !== undefined) {
      categoryCounts[txn.category]++;
    }
  });

  const data = [
    { name: "Entertainment", count: categoryCounts.entertainment },
    { name: "Food", count: categoryCounts.food },
    { name: "Travel", count: categoryCounts.travel },
  ];

  const barColor = "#a78bfa"; 

  return (
    <div>
      <h2 style={{ margin: "20px 0px 10px 0px"}}>
        <em>Top Expenses</em>
      </h2>
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "16px",
          margin: "0px 0",
          boxSizing: "border-box",
        }}
      >
        <ResponsiveContainer width="100%" height={295}>
          <BarChart layout="vertical" data={data} barSize={25} margin={{ top: 5, right: 10, left: 50, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="count" fill={barColor} radius={[1, 10, 10, 1]}>
              {data.map((entry, index) => (
                <Cell key={index} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpenseBarChart;
