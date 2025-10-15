"use client"

import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { formatCurrency } from "../../functions/Format"

const GameBarChart = ({ game }) => {
  const expected = game?.carts?.reduce((acc, cart) => acc + (cart.total_value || 0), 0) || 0
  const returned = game?.carts?.reduce((acc, cart) => acc + (cart.worker_total || 0), 0) || 0

  const chartData = [
    { label: "Expected", value: expected },
    { label: "Returned", value: returned },
  ]

  const greyShades = ["#333333", "#777777"]

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { label, value } = payload[0].payload
      return (
        <div className="rounded-lg bg-white shadow-md border border-gray-200 p-3 text-sm">
          <p className="font-semibold">{label}</p>
          <p className="text-gray-600">
             {formatCurrency(value)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="pt-4 border border-gray-200 rounded-lg">
      <CardHeader className="items-center pb-0">
        <CardTitle>Game Performance</CardTitle>
        <CardDescription>Comparison of expected vs returned value</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{ game_performance: { label: "Performance", color: "#333" } }}
          className="mx-auto max-h-[300px] w-full"
        >
          {chartData.length > 0 ? (
            <BarChart
            width={400}
            height={250}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis tickFormatter={(value) => `£${value.toLocaleString()}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={entry.label} fill={greyShades[index % greyShades.length]} />
              ))}
            </Bar>
          </BarChart>          
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}
        </ChartContainer>
      </CardContent>
    </div>
  )
}

export default GameBarChart
