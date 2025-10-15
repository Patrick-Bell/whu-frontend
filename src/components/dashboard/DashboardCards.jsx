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
import { fetchAllGames, getCurrentMonthGames, getPreviousMonthGames } from "@/components/routes/GameRoutes"
import { formatCurrency, formatNumber } from "@/components/functions/Format"
import { percentageDifference } from "../functions/MathsFunctions"




const DashboardCards = () => {
    const [thisMonthGames, setThisMonthGames] = useState([])
    const [lastMonthGames, setLastMonthGames] = useState([])

    const fetchData = async () => {
        try{
            const resposneOne = await getCurrentMonthGames()
            const responseTwo = await getPreviousMonthGames()
            setThisMonthGames(resposneOne)
            setLastMonthGames(responseTwo)
            console.log(resposneOne, responseTwo)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const thisMonthWorkers = thisMonthGames?.flatMap(game => 
        game.carts?.flatMap(cart => cart.cart_workers) || []
      ) || [];
      const numberOfWorkers = thisMonthWorkers.length
      const thisMonthLateCount = thisMonthWorkers.filter(w => w.time_message.includes('Late')).length

      const lastMonthWorkers = lastMonthGames?.flatMap(game => 
        game.carts?.flatMap(cart => cart.cart_workers) || []
      ) || [];
      const numberOfLastWorkers = lastMonthWorkers.length
      const lastMonthLateCount = lastMonthWorkers.filter(w => w.time_message.includes('Late')).length

      const thisMonthLatenessPercentage = thisMonthLateCount / numberOfWorkers
      const lastMonthLatenessPercentage = lastMonthLateCount / numberOfLastWorkers
      const latenessTrend = percentageDifference(lastMonthLatenessPercentage, thisMonthLatenessPercentage)





      const thisMonthCarts = thisMonthGames?.flatMap(game => game.carts) || [];
      const lastMonthCarts = lastMonthGames?.flatMap(game => game.carts) || [];
      const thisMonthRevenue = thisMonthCarts?.reduce((acc, cart) => acc + cart.worker_total, 0)
      const lastMonthRevenue = lastMonthCarts?.reduce((acc, cart) => acc + cart.worker_total, 0)
      const revenueTrend = percentageDifference(lastMonthRevenue, thisMonthRevenue)

      const thisMonthSold = thisMonthCarts.reduce((acc, cart) => acc + cart.sold, 0)
      const lastMonthSold = lastMonthCarts.reduce((acc, cart) => acc + cart.sold, 0)
      const revenueSold = percentageDifference(lastMonthSold, thisMonthSold)

      const thisMonthGamesLength = thisMonthGames.length
      const lastMonthGamesLength = lastMonthGames.length
      const gamesTrend = percentageDifference(lastMonthGamesLength, thisMonthGamesLength)


      
      const data = [
          { 
              label: "Revenue", 
              value: formatCurrency(thisMonthRevenue), 
              lastGame: lastMonthRevenue,
              trend: revenueTrend + '%',
              trendType: revenueTrend >= 0 ? "up" : "down", 
              description: "Compared to last month",
              icon: revenueTrend >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />,
              text: revenueTrend >= 0 ? "Increase Revenue Generated" : "Decrease Revenue Generated"
          },
          { 
            label: "Programmes Sold", 
            value: formatNumber(thisMonthSold), 
            lastGame: lastMonthSold,
            trend: revenueSold + '%',
            trendType: revenueSold >= 0 ? "up" : "down", 
            description: "Compared to last month",
            icon: revenueSold >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />,
            text: revenueSold >= 0 ? "Increase Programmes Sold" : "Decrease Programmes Sold"
        },
        { 
            label: "Games", 
            value: formatNumber(thisMonthGamesLength), 
            lastGame: lastMonthGamesLength,
            trend: gamesTrend + '%',
            trendType: gamesTrend >= 0 ? "up" : "down", 
            description: "Compared to last month",
            icon: gamesTrend >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />,
            text: gamesTrend >= 0 ? "Increase Games" : "Decrease Games"
        },
        { 
            label: "Lateness", 
            value: (thisMonthLatenessPercentage * 100).toFixed(2) + '%', 
            lastGame: lastMonthLatenessPercentage,
            trend: latenessTrend + '%',
            trendType: latenessTrend >= 0 ? "up" : "down", 
            description: "Compared to last month",
            icon: latenessTrend >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />,
            text: latenessTrend >= 0 ? "Increase Lateness" : "Decrease Lateness"
        },
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

export default DashboardCards
