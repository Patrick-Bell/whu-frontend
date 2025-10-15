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
  
  const ManagersTable = ({ manager }) => {
  
      return (
  
          <>
  
  <Table>
    <TableCaption>A list of {manager?.name} {manager?.last_name}'s work.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Date</TableHead>
        <TableHead>Game</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
          {manager?.games
          .sort((a, b ) => new Date(b.date) - new Date(a.date))
          .map((game) => (
      <TableRow>
        <TableCell className="font-medium">{formatDate(game?.date)}</TableCell>
        <TableCell>{game.name}</TableCell>
        <TableCell onClick={() => window.location.href = `/games/${game.id}`} className='flex items-center cursor-pointer'>{game.game?.name.split('v ')[1]} 
        <Tooltip>
    <TooltipTrigger>
      <ArrowRight className="w-4 h-4 ml-2 cursor-pointer" />
    </TooltipTrigger>
    <TooltipContent>
      <p>View Game</p>
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
  
  export default ManagersTable