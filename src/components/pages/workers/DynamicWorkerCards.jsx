import { useState, useEffect } from "react";
import { formatCurrency } from "@/components/functions/Format";
import { Card, CardDescription, CardHeader, CardTitle, CardAction, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchAllWorkers } from "@/components/routes/WorkerRoutes";
import { TrendingUp, TrendingDown } from "lucide-react";




const DynamicWorkerPage = ({ worker }) => {

    const [averages, setAverages] = useState({})

    const fetchData = async () => {
        const response = await fetchAllWorkers()
        const averageRevenue = response?.reduce((acc, worker) => acc + worker.carts.reduce((acc, cart) => acc + cart.worker_total, 0), 0) / response.length || 0
        const averageSold = response?.reduce((acc, worker) => acc + worker.carts.reduce((acc, cart) => acc + cart.sold, 0), 0) / response.length || 0
        const averageShifts = response?.reduce((acc, worker) => acc + worker.carts.length, 0) / response.length || 0
        const averageMargin = response?.reduce((acc, worker) => acc + worker.carts.reduce((acc, cart) => acc + (cart.worker_total - cart.total_value), 0), 0) / response.length || 0
        console.log(averageMargin, 'average margin')
        console.log(sold, 'sold')
        setAverages({ averageRevenue, averageSold, averageShifts, averageMargin })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const revenue = worker?.carts?.reduce((acc, cart) => acc + cart.worker_total, 0) || 0
    const sold = worker?.carts?.reduce((acc, cart) => acc + cart.sold, 0) || 0
    const shifts = worker?.carts?.length || 0
    const margin = worker?.carts?.reduce((acc, cart) => acc + (cart.worker_total - cart.total_value), 0) || 0

    const data = [
        { 
            label: "Revenue", 
            value: formatCurrency(revenue), 
            trend: revenue > averages.averageRevenue ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />,
            description: "Compared to other workers",
            text: revenue > averages.averageRevenue ? "Above Average Revenue" : "Below Average Revenue"
        },
        { 
            label: "Sold", 
            value: sold, 
            trend: sold > averages.averageSold ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />,
            description: "Compared to other workers",
            text: sold > averages.averageSold ? "Above Average Sold" : "Below Average Sold"
        },
        { 
            label: "Shifts", 
            value: shifts, 
            trend: shifts > averages.averageShifts ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />,
            description: "Compared to other workers",
            text: shifts > averages.averageShifts ? "Above Average Shifts" : "Below Average Shifts"
        },
        { 
            label: "Margin", 
            value: formatCurrency(margin), 
            trend: margin > averages.averageMargin ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />,
            description: "Compared to other workers",
            text: margin > averages.averageMargin ? "Above Average Margin" : "Below Average Margin"
        },
    ];

    return (

        <>
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
        </>
    )
}

export default DynamicWorkerPage