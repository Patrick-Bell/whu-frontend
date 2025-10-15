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
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const WorkerBarChart = ({ worker }) => {
  // Ensure carts exists
  const carts = worker?.carts || []

  // Aggregate cart positions
  const cartCounts = {}
  carts.forEach((cart) => {
    const cartNumber = cart.cart_number
    cartCounts[cartNumber] = (cartCounts[cartNumber] || 0) + 1
  })

  // Convert to chart-friendly array
  const chartData = Object.entries(cartCounts).map(([cart_number, count]) => ({
    cart_number,
    count,
  }))

  // Grey scale colors
  const greyShades = ["#111111", "#333333", "#555555", "#777777", "#999999", "#bbbbbb", "#dddddd"]

  return (
    <div className="pt-4 border border-gray-200 rounded-lg">
      <CardHeader className="items-center pb-0">
        <CardTitle>Worker Cart Positions</CardTitle>
        <CardDescription>Shows where the worker usually works</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer 
        config={{ cart_positions: { label: "Cart Positions", color: "#333" } }}
        className="mx-auto max-h-[300px] w-full">
          {chartData.length > 0 ? (
            <BarChart
              width={400}
              height={250}
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cart_number" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              <Legend />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={entry.cart_number} fill={greyShades[index % greyShades.length]} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <p className="text-center text-gray-500">No cart data available</p>
          )}
        </ChartContainer>
      </CardContent>
    </div>
  )
}

export default WorkerBarChart
