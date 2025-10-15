"use client";

import React, { useMemo } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatNumber } from "@/components/functions/Format";
import { percentageDifference } from "../../functions/MathsFunctions";

const WorkerCards = ({ workers }) => {
 
  // --- Example of date-based filtering ---
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const thisMonthWorkers = workers.filter(
    (w) => new Date(w.created_at) >= thirtyDaysAgo
  );

  // --- Metrics ---
  const totalWorkers = workers.length;
  const newWorkers = thisMonthWorkers.length;
  const watchingWorkers = workers.filter((w) => w.watching).length;

  const total = workers?.length


  const data = [
    {
      label: "Total Workers",
      value: formatNumber(totalWorkers),
      trend: `${(totalWorkers / total * 100).toFixed(2)} %`,      
    },
    {
      label: "New Workers",
      value: formatNumber(newWorkers),
      trend: `${((newWorkers / total) * 100).toFixed(2)} %`,
    },
    {
      label: "Workers Being Watched",
      value: formatNumber(watchingWorkers),
      trend: `${((watchingWorkers / total) * 100).toFixed(2)} %`,
    },
   
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs m-0 p-0">
     

    {data.map((item, index) => (
        <Card className="@container/card">
        <CardHeader>
          <CardDescription>{item.label}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {item.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {item.icon}
              {item.trend}
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    ))}
     

    </div>
  );
};

export default WorkerCards;
