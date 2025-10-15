"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Calendar1,
  CalendarCheck,
  CalendarMinus2,
  Info
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "../functions/Format";
import { fetchAllGames, getCurrentMonthGames } from "../routes/GameRoutes";
import LineGraph from "./LineGraph";
import WorkerCards from "../pages/workers/WorkerCards";
import { fetchAllWorkers } from "../routes/WorkerRoutes";
import Loader from "../loading/Loader";
import AnalyticsCards from "./AnalyticsCards";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useHotkeys } from "react-hotkeys-hook";

const AnalyticsPage = () => {
  const [games, setGames] = useState([]);
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentMonthStats, setCurrentMonthStats] = useState([])

  const fetchData = async () => {
    try{
      const date = new Date()
      const label = date.toLocaleDateString("default", { month: "long", year: "numeric" });
      const response = await fetchAllGames();
      const workers = await fetchAllWorkers()
      const currentGames = await getCurrentMonthGames()
      const carts = currentGames?.flatMap(game => game.carts) || [];

      const totalValue = carts.reduce((sum, cart) => sum + (cart.total_value || 0), 0);
      const workerTotal = carts.reduce((sum, cart) => sum + (cart.worker_total || 0), 0);
      setGames(response);
      setWorkers(workers)
      setCurrentMonthStats({
        ...currentGames,
        date: label,
        shifts: currentGames?.length,
        margin: workerTotal - totalValue
        
      })
    } catch(e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
    
  };

  useEffect(() => {
    fetchData();
  }, []);
  

  //const topPerformers = [...workerPerformance]?.sort((a, b) => b.margin - a.margin).slice(0, 5);
  //const lowPerformers = [...workerPerformance]?.sort((a, b) => a.margin - b.margin).slice(0, 5);

  // Monthly aggregation for analytics
  const monthlyData = useMemo(() => {
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
      monthlyMap[monthYear].gamesCount += 1; // number of games
    });

    const dataArray = Object.keys(monthlyMap)
      .sort((a, b) => new Date(a) - new Date(b))
      .map((monthYear) => ({
        month: monthYear,
        total_value: monthlyMap[monthYear].total_value,
        worker_total: monthlyMap[monthYear].worker_total,
        shifts: monthlyMap[monthYear].gamesCount,
        margin: monthlyMap[monthYear].total_value - monthlyMap[monthYear].worker_total,
      }));

    return dataArray;
  }, [games]);

  // Best and worst month
  const bestMonth = monthlyData.reduce((prev, curr) => (curr.margin > prev.margin ? curr : prev), { margin: -Infinity });
  const worstMonth = monthlyData.reduce((prev, curr) => (curr.margin < prev.margin ? curr : prev), { margin: Infinity });


  const playTutorial = () => {

    const driverObj = driver({
      showProgress: true,
      allowClose: false,
      popoverClass: 'driverjs-theme',
      steps: [
        { element: '#cards', popover: { title: 'Stat Cards', description: 'These cards provide an overview of the total revenue, programmes sold, workers, and games.' } },
        { element: '#best-margin', popover: { title: 'Best Margins', description: 'This table shows the top 5 performers of all time.' } },
        { element: '#margins', popover: { title: 'Margin Example', description: 'Green indicate that the worker has a positive margin. This is calculated by getting their returns and subtracting what they should have returned.' } },
        { element: '#worst-margins', popover: { title: 'Worst Margins', description: 'This table shows the worst 5 performers of all time. These workers should be <strong>watched</strong> as their margins are the lowest. You can do this by navigating to all workers and actioning this.' } },
        { element: '#month-stats', popover: { title: 'Month Stats', description: 'These cards provide more insight into the best and worst performing months and how they compare to the current month.' } },
        { element: '#table-breakdown', popover: { title: 'Monthly Breakdown', description: 'This table groups all games by the month they were played in and provides insight into overall stats for each month.' } },
        { element: '#graph', popover: { title: 'Graph', description: 'This graph shows the margins across a number of months. It compares the workers return value to expected return (calculated by programmes sold * 4).' } },
        { element: '#select', popover: { title: 'Trends', description: 'You can change the period to see how the trend changes over time.' } },
        { popover: { title: 'Tutorial Completed', description: 'Click "Done" to continue using the application.' } },



      ],
    });
  
    driverObj.drive();

  }

  useHotkeys("ctrl+h, meta+h", (e) => {
    e.preventDefault()
    playTutorial()
  },
)


  if (loading) {
    return <Loader />
  }

  return (
    <div>
            <div className="mb-3 flex justify-end">
            <Tooltip>
                <TooltipTrigger asChild>
                <button 
                  onClick={() => playTutorial()}
                  className="mt-3 lg:mt-0 lg:w-auto inline-flex items-center px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
                <Info className="h-4 w-4" />
              </button>               
               </TooltipTrigger>
                <TooltipContent>
                  <p>Click to understand this page more.</p>
                </TooltipContent>
              </Tooltip>
              </div> 

        <AnalyticsCards games={games} workers={workers}/>

      {/* Top / Low performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 mt-4">
        {/* Top Performers */}
        <div id="best-margin" className="border border-gray-200 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Trophy size={20} />
              <p className="ml-2 font-bold text-md">Best Performers by Margin</p>
            </div>
            <Button onClick={() => window.location.href = '/workers'} size="sm">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>Top 5 workers by profit margin</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead className="text-right">Margin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workers
                    .map((worker) => {
                    const sold = worker.carts.reduce((acc, cart) => acc + cart.worker_total, 0);
                    const expected = worker.carts.reduce((acc, cart) => acc + cart.total_value, 0);
                    const margin = sold - expected;
                    const hours = worker.carts.map((cart) => cart.cart_workers.find(w => w.worker_id === worker.id)?.hours || 0);   
                    const totalHours = hours.reduce((sum, h) => sum + h, 0);
                    const shifts = worker.carts.length
                    console.log(margin, 'margins')
                    return { ...worker, sold, expected, margin, totalHours, shifts }; // include margin for sorting
                    })
                    .sort((a, b) => b.margin - a.margin) // sort descending by margin
                    .slice(0, 5) // top 5
                    .map((worker, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className={`hover:font-medium cursor-pointer ${worker.watching ? 'text-red-500' : ''}`} onClick={() => window.location.href = `/workers/${worker?.id}`}>{worker.name}</TableCell>
                        <TableCell>{worker.totalHours} <span className="text-xs">({worker.shifts} shifts</span>)</TableCell>
                        <TableCell>{formatCurrency(worker.sold)}</TableCell>
                        <TableCell id='margins' className={`text-right font-semibold ${worker.margin >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {formatCurrency(worker.margin)}
                        </TableCell>
                    </TableRow>
                    ))
                }
                </TableBody>
            </Table>
          </div>
        </div>

        {/* Top Performers */}
        <div id="worst-margins" className="border border-gray-200 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Trophy size={20} />
              <p className="ml-2 font-bold text-md">Worst Performers by Margin</p>
            </div>
            <Button onClick={() => window.location.href = '/workers'} size="sm">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>Worst 5 workers by profit margin</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead className="text-right">Margin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workers
                    .map((worker) => {
                    const sold = worker.carts.reduce((acc, cart) => acc + cart.worker_total, 0);
                    const expected = worker.carts.reduce((acc, cart) => acc + cart.total_value, 0);
                    const margin = sold - expected;
                    const hours = worker.carts.map((cart) => cart.cart_workers.find(w => w.worker_id === worker.id)?.hours || 0);   
                    const totalHours = hours.reduce((sum, h) => sum + h, 0);
                    const shifts = worker.carts.length
                    return { ...worker, sold, expected, margin, totalHours, shifts }; // include margin for sorting
                    })
                    .sort((a, b) => a.margin - b.margin) // sort descending by margin
                    .slice(0, 5) // top 5
                    .map((worker, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className={`hover:font-medium cursor-pointer ${worker.watching ? 'text-red-500' : ''}`} onClick={() => window.location.href = `/workers/${worker?.id}`}>{worker.name}</TableCell>
                        <TableCell>{worker.totalHours} <span className="text-xs">({worker.shifts} shifts</span>)</TableCell>
                        <TableCell>{formatCurrency(worker.sold)}</TableCell>
                        <TableCell className={`text-right font-semibold ${worker.margin >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {formatCurrency(worker.margin)}
                        </TableCell>
                    </TableRow>
                    ))
                }
                </TableBody>
            </Table>
          </div>
        </div>


      </div>

      

      {/* Best / Worst Month Cards */}
      <div id="month-stats" className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="border border-gray-200 p-4 rounded-lg flex flex-col justify-between">
          <div className="flex items-center mb-2">
            <Calendar1 size={20} />
            <p className="ml-2 font-bold">Best Month</p>
          </div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell className='text-right'>{bestMonth.month || '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Margin</TableCell>
                <TableCell className='text-right'>{formatCurrency(bestMonth.margin || 0)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shifts</TableCell>
                <TableCell className='text-right'>{bestMonth.shifts || 0}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="border border-gray-200 p-4 rounded-lg flex flex-col justify-between">
          <div className="flex items-center mb-2">
            <CalendarMinus2 size={20} />
            <p className="ml-2 font-bold">Worst Month</p>
          </div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell className='text-right'>{worstMonth.month || '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Margin</TableCell>
                <TableCell className='text-right'>{formatCurrency(worstMonth.margin || 0)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shifts</TableCell>
                <TableCell className='text-right'>{worstMonth.shifts || 0}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="border border-gray-200 p-4 rounded-lg flex flex-col justify-between">
          <div className="flex items-center mb-2">
            <CalendarCheck size={20} />
            <p className="ml-2 font-bold">Current Month</p>
          </div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell className='text-right'>{currentMonthStats.date || '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Margin</TableCell>
                <TableCell className='text-right'>{formatCurrency(currentMonthStats.margin || 0)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shifts</TableCell>
                <TableCell className='text-right'>{currentMonthStats.shifts || 0}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

      </div>

      {/* Monthly Breakdown Table */}
      <div id="table-breakdown" className="border border-gray-200 p-4 rounded-lg mb-6">
        <p className="font-bold mb-2">Monthly Breakdown</p>
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Monthly summary of shifts and margins</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">Shifts</TableHead>
                <TableHead className="text-right">Total Expected</TableHead>
                <TableHead className="text-right">Total Worker</TableHead>
                <TableHead className="text-right">Margin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyData.map((month, idx) => (
                <TableRow key={idx}>
                  <TableCell>{month.month}</TableCell>
                  <TableCell className="text-right">{month.shifts}</TableCell>
                  <TableCell className="text-right">{formatCurrency(month.total_value)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(month.worker_total)}</TableCell>
                  <TableCell className={`text-right font-semibold ${month.margin >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {formatCurrency(month.margin)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Line Graph */}
      <div>
        <LineGraph games={games} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
