import { 
  CheckIcon,
  X,
  ArrowRight
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { formatDate, formatCurrency, formatTime } from "@/components/functions/Format";
import { formatTotal } from "@/components/functions/WorkerFunctions";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const WorkerTable = ({ worker }) => {

  const getColor = (message) => {
    if (message.includes('On Time')){
      return 'bg-gray-400'
    } else if (message.includes('Late')){
      return 'bg-red-400'
    } else {
      return 'bg-green-400'
    }
  }

    return (

        <>

<Table>
  <TableCaption>A list of {worker?.name} {worker?.last_name}'s work.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Date</TableHead>
      <TableHead>Game</TableHead>
      <TableHead>Position</TableHead>
      <TableHead>Hours</TableHead>
      <TableHead>Attendance</TableHead>
      <TableHead>Half Time</TableHead>
      <TableHead className="text-right">Margin</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
        {worker?.carts
        .sort((a, b ) => new Date(a.date) - new Date(b.date))
        .map((cart) => (
    <TableRow>
      <TableCell className="font-medium">{formatDate(cart?.date)}</TableCell>
      <TableCell onClick={() => window.location.href = `/games/${cart.game_id}`} className='flex items-center cursor-pointer'>{cart.game?.name.split('v ')[1]} 
      <Tooltip>
  <TooltipTrigger>
    <ArrowRight className="w-4 h-4 ml-2 cursor-pointer" />
  </TooltipTrigger>
  <TooltipContent>
    <p>View Game</p>
  </TooltipContent>
</Tooltip>
        </TableCell>
      <TableCell>{cart?.cart_number}</TableCell>
    
  <TableCell>{cart.cart_workers.find(w => w.worker_id === worker.id).hours}</TableCell>
  
  <TableCell>{cart.cart_workers.find(w => w.worker_id === worker.id).time_message}</TableCell>
 
      <TableCell>
        {cart.cart_workers.find(w => w.worker_id === worker.id)?.half_time 
                        ? <CheckIcon sx={{color:'green'}}/> 
                        : <X sx={{color:'red'}}/>
                      }</TableCell>
      <TableCell className="text-right">
      <Tooltip>
  <TooltipTrigger>
  {formatTotal(cart.total_value, cart.worker_total)}
  </TooltipTrigger>
  <TooltipContent>
  <p>
  Expected Returns: {formatCurrency(cart.total_value)}
  <hr className="my-1" />
  Worker Returns: {formatCurrency(cart.worker_total)}
</p>
  </TooltipContent>
</Tooltip>
        </TableCell>
    </TableRow>
    ))}
  </TableBody>
</Table>
        
        </>
    )
}

export default WorkerTable