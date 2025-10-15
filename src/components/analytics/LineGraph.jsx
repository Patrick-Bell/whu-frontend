"use client";

import React, { useMemo, useState } from "react";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartConfig = {
  total_value: { label: "Expected Value", color: "#000000" },
  worker_total: { label: "Worker Value", color: "#555555" },
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white border rounded text-sm">
        <div className="border-b border-gray-200 p-2">
      <p className="font-bold mb-1">{label}</p>
      </div>
      <div className="p-2">
      <p>
        <span className="text-xs">Expected:</span> <span className="font-bold text-sm">£{data.total_value.toLocaleString()}</span>
      </p>
      <p>
        <span className="text-xs">Worker:</span> <span className="font-bold text-sm">£{data.worker_total.toLocaleString()}</span>
      </p>
      <p>
        <span className="text-xs">Shifts:</span> <span className="font-bold text-sm">{data.shifts}</span>
      </p>
      </div>
    </div>
  );
};

const LineGraph = ({ games }) => {

  const [month, setMonth] = useState(-6)

  const data = useMemo(() => {
    const monthlyMap = {};
  
    games.forEach((game) => {
      const monthYear = new Date(game.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
  
      if (!monthlyMap[monthYear]) {
        monthlyMap[monthYear] = { total_value: 0, worker_total: 0, gamesCount: 0 };
      }
  
      const totalValue = game.carts.reduce((sum, cart) => sum + cart.total_value, 0);
      const workerTotal = game.carts.reduce((sum, cart) => sum + cart.worker_total, 0);
  
      monthlyMap[monthYear].total_value += totalValue;
      monthlyMap[monthYear].worker_total += workerTotal;
      monthlyMap[monthYear].gamesCount += 1; // increment per game, not per cart
    });
  
    return Object.keys(monthlyMap)
      .sort((a, b) => new Date(a) - new Date(b))
      .map((monthYear) => ({
        month: monthYear,
        total_value: monthlyMap[monthYear].total_value,
        worker_total: monthlyMap[monthYear].worker_total,
        shifts: monthlyMap[monthYear].gamesCount, // use gamesCount
      })).slice(month);
  }, [games, month]);
  

  return (
    <div id="graph" className="pt-0 border border-gray-200 rounded-lg">
      <CardHeader className="flex items-center justify-between border-b py-5 sm:flex-row">
        <div className="flex-1">
          <CardTitle>Monthly Worker & Expected Values</CardTitle>
          <CardDescription>Total values and shifts per month</CardDescription>
        </div>
        <select id="select" onClick={(e) => setMonth(e.target.value)}>
        <option disabled>Select period</option>
        <option value={-3}>Last 3 months</option>
        <option value={-4}>Last 4 months</option>
        <option value={-6}>Last 6 months</option>
        <option value={-12}>Last 12 months</option>
        </select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
            <defs>
              <linearGradient id="fillWorker" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#555555" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#555555" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="fillExpected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#000000" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#000000" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="#eee" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              minTickGap={10}
              stroke="#333"
            />
            <YAxis
            tickLine={false}
            axisLine={true}
            stroke="#333"
            domain={[-500, "auto"]}  // 👈 ensures chart extends down to -500
            label={{
              value: "Value (£)",
              angle: -90,
              position: "insideLeft",
              offset: -20,
            }}
          />

            <Tooltip content={<CustomTooltip />} />

            <Area
            dataKey="total_value"
            type="natural"
            fill="url(#fillExpected)"
            stroke="#000000"
            />
            <Area
            dataKey="worker_total"
            type="natural"
            fill="url(#fillWorker)"
            stroke="#555555"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
};

export default LineGraph;
