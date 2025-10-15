import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { formatTime } from "@/components/functions/Format";
import { Download } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import GameAttendancePDF from "@/components/pdf/GameAttendancePDF";



const AttendanceTable = ({ game }) => {
    // Flatten all cart workers
    const allWorkers = game.carts?.flatMap((cart) =>
      cart.cart_workers.map((cw) => ({
        ...cw,
        cart_number: cart.cart_number, // add cart number to each worker
      }))
    );

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
      {game?.carts.length > 0 ? (
        <>
         <div className="mt-4">
           <div className="flex items-center justify-between mb-4">
          <p className="font-bold">Attendance Summary</p>
           <div className="flex items-center space-x-2">
           <PDFDownloadLink document={<GameAttendancePDF gameData={game} />}>
              <button className="inline-flex items-center px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
              </PDFDownloadLink>
            </div>
          </div>
      </div>
        <Table>
          <TableCaption>Attendance for {game?.name}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Cart</TableHead>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Start Time</TableHead>
              <TableHead className="font-bold">Finish Time</TableHead>
              <TableHead className="font-bold">Hours</TableHead>
              <TableHead className="font-bold">Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allWorkers?.map((worker) => (
              <TableRow key={worker.id}>
                <TableCell>{worker.cart_number}</TableCell>
                <TableCell className={`hover:font-bold cursor-pointer ${worker?.worker?.watching ? 'text-red-500' : ''}`} onClick={() => window.location.href = `/workers/${worker?.worker_id}`}>{worker.worker.name} {worker.worker.last_name}</TableCell>
                <TableCell>{formatTime(worker?.start_time)}</TableCell>
                <TableCell>{formatTime(worker?.finish_time)}</TableCell>
                <TableCell>{worker.hours}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full ${getColor(worker?.time_message)} mr-2`}></div>
                  {worker.time_message}
                  </div>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </>
      ):(
        <p className="text-sm text-gray-500">There must be at least one cart added to this game to view attendance.</p>
      )}
        
      </>
    );
  };
  
  export default AttendanceTable;
  
