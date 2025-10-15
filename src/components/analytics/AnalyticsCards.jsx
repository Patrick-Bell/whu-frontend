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
import { formatCurrency, formatNumber } from "../functions/Format";
import { percentageDifference } from "../functions/MathsFunctions";

const AnalyticsCards = ({ games, workers }) => {

    const carts = games?.flatMap(game => game.carts) || [];
    const workerTotal = carts.reduce((sum, cart) => sum + (cart.worker_total || 0), 0);
    const programmesSold = carts?.reduce((sum, cart) => sum + cart.sold, 0)
    const totalWorkers = workers?.length
    const totalGames = games?.length

  return (
    <div id="cards" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs m-0 p-0">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(workerTotal)}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Programmes Sold</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatNumber(programmesSold)}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Workers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalWorkers}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Games</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalGames}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}

export default AnalyticsCards
