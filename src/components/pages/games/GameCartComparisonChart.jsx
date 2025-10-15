"use client"

import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { formatCurrency } from "../../functions/Format"

const GameCartComparisonChart = ({ game }) => {
  if (!game?.carts) return <p>No data available</p>

  // Build chart data
  const chartData = game.carts.map((cart) => {
    const difference = cart.worker_total - cart.total_value
    return {
      cart: cart.cart_number,
      expected: cart.total_value,
      difference,
    }
  })

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg bg-white shadow-md border border-gray-200 p-3 text-sm">
          <p className="font-semibold">{data.cart}</p>
          <p className="text-gray-600">Expected: {formatCurrency(data.expected)}</p>
          <p className="text-gray-600">
            Actual: {formatCurrency(data.expected + data.difference)}
          </p>
          {data.difference !== 0 && (
            <p className={`font-semibold ${data.difference > 0 ? "text-green-600" : "text-red-600"}`}>
              {data.difference > 0 ? "Over:" : "Short:"} {formatCurrency(Math.abs(data.difference))}
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="pt-4 border border-gray-200 rounded-lg">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expected vs Actual per Cart</CardTitle>
        <CardDescription>Highlights shortages and overages clearly</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
      <ChartContainer
  config={{
    expected: { label: "Expected", color: "#d1d5db" },
    difference: { label: "Difference", color: "#16a34a" },
  }}
  className="mx-auto max-h-[350px] w-full"
>
          <BarChart
            width={600}
            height={300}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cart" />
            <YAxis tickFormatter={(value) => `£${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />

            {/* Expected bar */}
            <Bar dataKey="expected" fill="#d1d5db" radius={[8, 8, 0, 0]} />

            {/* Difference bar with dynamic colors */}
            <Bar dataKey="difference" radius={[8, 8, 0, 0]} stackId="a">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.difference >= 0 ? "#16a34a" : "#dc2626"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </div>
  )
}

export default GameCartComparisonChart
