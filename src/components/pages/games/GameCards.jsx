import { useState, useEffect } from "react"
import { TrendingDown, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { fetchAllGames } from "@/components/routes/GameRoutes"
import { formatCurrency } from "@/components/functions/Format"




const GameCards = ({ game }) => {
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
      }, [game?.id])

      const thisRevenue = game?.carts.reduce((acc, cart) => acc + cart.worker_total, 0) || 0
      const lastRevenue = lastGame?.carts.reduce((acc, cart) => acc + cart.worker_total, 0) || 0
      const thisSold = game?.carts.reduce((acc, cart) => acc + cart.sold, 0) || 0
      const lastSold = lastGame?.carts.reduce((acc, cart) => acc + cart.sold, 0) || 0
      const thisStaff = game?.carts.flatMap((cart) => cart.cart_workers).length || 0
      const lastStaff = lastGame?.carts.flatMap((cart) => cart.cart_workers).length || 0
      const thisMargin = game?.carts.reduce((acc, cart) => acc + (cart.worker_total - cart.total_value), 0) || 0
      const lastMargin = lastGame?.carts.reduce((acc, cart) => acc + (cart.worker_total - cart.total_value), 0) || 0
      
      const revenueTrend = lastRevenue ? ((thisRevenue - lastRevenue) / lastRevenue) * 100 : 0
      const soldTrend = lastSold ? ((thisSold - lastSold) / lastSold) * 100 : 0
        const staffTrend = lastStaff ? ((thisStaff - lastStaff) / lastStaff) * 100 : 0
      
      const data = [
          { 
              label: "Month Revenue", 
              value: formatCurrency(thisRevenue), 
              lastGame: lastRevenue,
              trend: revenueTrend.toFixed(2) + '%',
              trendType: revenueTrend >= 0 ? "up" : "down", 
              description: "Compared to last game",
              icon: revenueTrend >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />,
              text: revenueTrend >= 0 ? "Increase Revenue Generated" : "Decrease Revenue Generated"
          },
          {
            label: 'Programmes Sold',
            value: thisSold,
            lastGame: lastSold,
            trend: soldTrend.toFixed(2) + '%',
            trendType: soldTrend >= 0 ? "up" : "down",
            description: "Compared to last game",
            icon: soldTrend >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />,
            text: soldTrend >= 0 ? "Increase Programmes Sold" : "Decrease Programmes Sold"
          },
          {
            label: 'Number of Staff',
            value: thisStaff,
            lastGame: lastStaff,
            trend: staffTrend.toFixed(2) + '%',
            trendType: staffTrend >= 0 ? "up" : "down",
            description: "Compared to last game",
            icon: staffTrend >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />,
            text: staffTrend >= 0 ? "Increase Staff Employed" : "Decrease Staff Employed"
          },
          {
            label: 'Margin',
            value: formatCurrency(thisMargin),
            lastGame: lastMargin,
            trend: ((thisMargin - lastMargin) / (lastMargin || 1) * 100).toFixed(2) + '%',
            trendType: thisMargin - lastMargin >= 0 ? "up" : "down",
            description: "Compared to last game",
            icon: thisMargin - lastMargin >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />,
            text: thisMargin - lastMargin >= 0 ? "Increase Profit Margin" : "Decrease Profit Margin"
          }
      ]
      



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs m-0 p-0">
     

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
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {item.description}{item.icon}
          </div>
          <div className="text-muted-foreground">
            {item.text}
          </div>
        </CardFooter>
      </Card>
    ))}
     

      
    </div>
  )
}

export default GameCards
