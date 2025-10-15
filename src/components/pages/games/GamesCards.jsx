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
import { percentageDifference } from "../../functions/MathsFunctions"




const GamesCards = ({ games }) => {
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

  
      const thisMonthCarts = thisMonthGames?.flatMap(game => game.carts) || [];
      const lastMonthCarts = lastMonthGames?.flatMap(game => game.carts) || [];
      const thisMonthRevenue = thisMonthCarts?.reduce((acc, cart) => acc + cart.worker_total, 0)
      const lastMonthRevenue = lastMonthCarts?.reduce((acc, cart) => acc + cart.worker_total, 0)
      const revenueTrend = percentageDifference(lastMonthRevenue, thisMonthRevenue)

      const thisMonthSold = thisMonthCarts?.reduce((acc, cart) => acc + cart.sold, 0)
      const lastMonthSold = lastMonthCarts?.reduce((acc, cart) => acc + cart.sold, 0)
      const revenueSold = percentageDifference(lastMonthSold, thisMonthSold)

      // Total Games
      const gameNumberTrend = percentageDifference(27, games?.length)

      // This and Last Month Games
      const thisMonthGamesLength = thisMonthGames?.length
      const lastMonthGamesLength = lastMonthGames?.length
      const gamesTrend = percentageDifference(lastMonthGamesLength, thisMonthGamesLength)

      // Completed / Pending
      const completedGames = games?.filter(g => g.complete_status === true).length || 0;
      const pendingGames = games?.filter(g => g.complete_status !== true).length || 0;
      const completePercentage = (completedGames / (completedGames + pendingGames) * 100).toFixed(1)

      
      const data = [
          { 
              label: "Month Revenue", 
              value: formatCurrency(thisMonthRevenue), 
              lastGame: lastMonthRevenue,
              trend: revenueTrend + '%',
              trendType: revenueTrend >= 0 ? "up" : "down", 
              description: "Compared to last month",
              icon: revenueTrend >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />,
              text: revenueTrend >= 0 ? "Increase Revenue Generated" : "Decrease Revenue Generated"
          },
          { 
            label: "Total Games", 
            value: games.length, 
            lastGame: 27,
            trend: gameNumberTrend + '%',
            trendType: gameNumberTrend >= 0 ? "up" : "down", 
            description: "Compared to last season",
            icon: gameNumberTrend >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />,
            text: gameNumberTrend >= 0 ? "Increase Games" : "Decrease Games"
        },
        { 
            label: "Games This Month", 
            value: thisMonthGamesLength, 
            lastGame: lastMonthGamesLength,
            trend: gamesTrend + '%',
            description: "Compared to last month",
            icon: gamesTrend > 0
                ? <TrendingUp className="size-4" />
                : gamesTrend < 0
                ? <TrendingDown className="size-4" />
                : null,
            text: gamesTrend > 0
                ? "Increase Games"
                : gamesTrend < 0
                ? "Decrease Games"
                : "No Change"
        },
        { 
            label: "Completed v Pending", 
            value: completedGames, 
            lastGame: pendingGames,
            trend: completePercentage + '%',
            trendType: completePercentage >= 0 ? "up" : "down", 
            description: "Games Completed",
            //icon: completePercentage >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />,
            text: `${pendingGames} games pending`
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

export default GamesCards
