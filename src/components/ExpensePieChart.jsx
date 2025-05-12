import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

function ExpensePieChart({ expenses }) {
  // Step 1: Sum up category-wise totals
  const totals = {
    food: 0,
    entertainment: 0,
    travel: 0
  };

  expenses.forEach(txn => {
    if (totals[txn.category] !== undefined) {
      totals[txn.category] += txn.amount;
    }
  });

  // Step 2: Convert to data array for Recharts
  const data = [
    { name: 'Food', value: totals.food },
    { name: 'Entertainment', value: totals.entertainment },
    { name: 'Travel', value: totals.travel }
  ];

  const COLORS = ['#A020F0', '#FF8C00', '#FFD700']; // Purple, Orange, Yellow

  // Step 3: Custom label renderer
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{ width: 400, color: 'white' }}>
      <PieChart width={350} height={300}>
        <Pie
          data={data}
          cx={200}
          cy={150}
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>

      {/* Legend below the chart */}
      <div style={{ marginTop: '-10px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {data.map((entry, index) => (
          <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center' }}>
            <div 
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: COLORS[index],
                marginRight: '5px'
              }}
            />
            <span style={{ color: 'white' }}>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpensePieChart;
