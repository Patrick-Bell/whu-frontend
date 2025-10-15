import { 
    ArrowRight,
    CheckIcon,
    Download,
    Edit,
    EyeIcon,
    MoreHorizontal,
    Trash
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
  import { formatDate, formatCurrency } from "@/components/functions/Format";
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import EditCartModal from "./EditCartModal";
import { useState } from "react";
import DeleteCartModal from "./DeleteCartModal";
  
  const GameTable = ({ game , setGame, setFilteredGame }) => {

    const [menuOpen, setMenuOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    if (!game?.carts?.length) return <p className="text-sm text-gray-500">There are currently no carts associated with this game. If you are using filters, please reset your filters.</p>

  
    return (
      <Table id='table'>
        <TableCaption>Summary of {game.name}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='font-bold'>Cart Number</TableHead>
            <TableHead className='font-bold'>Qty Start</TableHead>
            <TableHead className='font-bold'>Qty Finish</TableHead>
            <TableHead className='font-bold'>Returns</TableHead>
            <TableHead className='font-bold'>Sold</TableHead>
            <TableHead className='font-bold text-right'>Margin</TableHead>
            <TableHead className='font-bold'>Worker(s)</TableHead>
            {game.complete_status === false && (
              <TableHead className='font-bold'>Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {game.carts
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((cart) => {
              const margin = (cart.worker_total - cart.total_value);
              const color = margin === 0 ? 'text-gray-500' : (margin > 0 ? 'text-green-500' : 'text-red-500');
              return (
                <TableRow key={cart.id}>
                  <TableCell>{cart?.cart_number}</TableCell>
                  <TableCell>{cart?.quantities_start}</TableCell>
                  <TableCell>{cart?.final_quantity}</TableCell>
                  <TableCell>{cart?.final_returns}</TableCell>
                  <TableCell>{cart?.sold}</TableCell>
                  <TableCell className={`text-right ${color}`}>{formatCurrency(margin)}</TableCell>
                  <TableCell>
                    {cart?.cart_workers?.length > 0 ? (
                      cart?.cart_workers?.map((cw, index) => (
                        <span className={`hover:font-bold cursor-pointer ${cw.worker.watching ? 'text-red-500' : ''}`} onClick={() => window.location.href=`/workers/${cw?.worker_id}`} key={cw.id}>
                          {cw?.worker?.name} {cw?.worker?.last_name}
                          {index < cart?.cart_workers?.length - 1 && ", "}
                        </span>
                      ))
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  {game.complete_status === false && (
                    <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{cart.cart_number}</DropdownMenuLabel>

                        {/* Wrap the modal trigger in a DropdownMenuItem so clicking closes the menu */}
                        <DropdownMenuItem asChild>
                          <EditCartModal cart={cart} setGame={setGame} />
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem asChild>
                          <DeleteCartModal cart={cart} setGame={setGame} setFilteredGame={setFilteredGame} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  )}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    );
  };
  
  export default GameTable;


  