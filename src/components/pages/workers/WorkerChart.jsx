"use client"

import React, { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"



const chartConfig = {
  total_value: { label: "Expected Value", color: "#000000" }, // black
  worker_total: { label: "Worker Value", color: "#555555" }, // dark gray for contrast
}

const WorkerChart = ({ worker }) => {

    const data = worker?.carts?.map((cart) => (
        {
        date: cart?.date,
        total_value: cart?.total_value,
        worker_total: cart?.worker_total,
        position: cart?.position
        }
    ))

  return (
    <div className="pt-0 border border-gray-200 rounded-lg">
      <CardHeader className="flex items-center justify-between border-b py-5 sm:flex-row">
        <div className="flex-1">
          <CardTitle>Worker Cart Values</CardTitle>
          <CardDescription>Worker vs Expected value over time</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={data}>
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
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={10}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
              stroke="#333"
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="worker_total"
              type="natural"
              fill="url(#fillWorker)"
              stroke="#555555"
              stackId="a"
            />
            <Area
              dataKey="total_value"
              type="natural"
              fill="url(#fillExpected)"
              stroke="#000000"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </div>
  )
}

export default WorkerChart