"use client"

import { fetchAllGames } from "@/components/routes/GameRoutes"
import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUp, ArrowDown } from "lucide-react"
import { formatCurrency, formatDate } from "@/components/functions/Format"

const LastGameComparison = ({ game }) => {
  const [games, setGames] = useState([])
  const [lastGame, setLastGame] = useState(null)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await fetchAllGames()
        const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date))
        const currentIndex = sorted.findIndex((g) => g.id === game.id)
        if (currentIndex > 0) setLastGame(sorted[currentIndex - 1])
      } catch (err) {
        console.error("Error fetching games:", err)
      }
    }
    fetchGames()
  }, [game.id])

  if (!lastGame) return <p>No previous game found</p>

  const getChangeData = (thisValue, lastValue) => {
    if (typeof thisValue !== "number" || typeof lastValue !== "number" || lastValue === 0) {
      return { change: "N/A", color: "text-gray-500", arrow: null }
    }

    const change = ((thisValue - lastValue) / lastValue) * 100
    const formattedChange = `${change > 0 ? "+" : ""}${change.toFixed(1)}%`

    return {
      change: formattedChange,
      color: change >= 0 ? "text-green-600" : "text-red-600",
      arrow: change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />,
    }
  }

  const totalSold = (g) => g.carts.reduce((acc, cart) => acc + cart.sold, 0)
  const totalReturns = (g) => g.carts.reduce((acc, cart) => acc + cart.final_returns, 0)
  const totalValue = (g) => g.carts.reduce((acc, cart) => acc + cart.worker_total, 0)
  const totalWorkers = (g) => g.carts.flatMap((cart) => cart.cart_workers).length
  const sellPercent = (g) =>
    g.carts.reduce((acc, cart) => acc + cart.sold, 0) /
    g.carts.reduce((acc, cart) => acc + cart.quantities_start, 0) *
    100

  const data = [
    {
      label: "Date",
      thisGame: formatDate(game.date),
      lastGame: formatDate(lastGame.date),
    },
    {
      label: "Programmes Sold",
      thisGame: totalSold(game),
      lastGame: totalSold(lastGame),
      ...getChangeData(totalSold(game), totalSold(lastGame)),
    },
    {
      label: "Returns",
      thisGame: totalReturns(game),
      lastGame: totalReturns(lastGame),
      ...getChangeData(totalReturns(game), totalReturns(lastGame)),
    },
    {
      label: "Total Value",
      thisGame: formatCurrency(totalValue(game)),
      lastGame: formatCurrency(totalValue(lastGame)),
      ...getChangeData(totalValue(game), totalValue(lastGame)),
    },
    {
      label: "Number of Workers",
      thisGame: totalWorkers(game),
      lastGame: totalWorkers(lastGame),
      ...getChangeData(totalWorkers(game), totalWorkers(lastGame)),
    },
    {
      label: "Sell %",
      thisGame: `${sellPercent(game).toFixed(2)}%`,
      lastGame: `${sellPercent(lastGame).toFixed(2)}%`,
      ...getChangeData(sellPercent(game), sellPercent(lastGame)),
    },
  ]

  return (
    <>
     <p className="ml-2 font-bold text-md">Compared to last game</p>
    <Table>
      <TableCaption>Comparison to last game</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">#</TableHead>
          <TableHead className="font-bold">This Game</TableHead>
          <TableHead className="font-bold">Previous Game</TableHead>
          <TableHead className="font-bold">Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.label}</TableCell>
            <TableCell>{item.thisGame}</TableCell>
            <TableCell>{item.lastGame}</TableCell>
            <TableCell className={`text-sm flex items-center gap-1 ${item.color}`}>
              {item.arrow} {item.change}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  )
}

export default LastGameComparison
