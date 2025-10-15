"use client"

import React, { useMemo, useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table"
import { ArrowUpDown, BadgeCheckIcon, Check, ChevronDown, ChevronRight, ChevronUp, Download, Edit, ExternalLink, Eye, EyeClosed, EyeIcon, EyeOff, Info, LoaderIcon, MoreHorizontal, Plus, Trash, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import AddWorkerModal from "./AddWorkerModal"
import { addToWatchList, deleteOneWorker, removeFromWatchList } from "../../routes/WorkerRoutes"
import { toast } from "sonner"
import EditWorkerModal from "./EditWorkerModal"

const DataTableDemo = ({ workers, setWorkers }) => {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [loading, setLoading] = useState(false)

  const tableData = useMemo(() => {
    return workers.map(worker => {
      const totalSold = worker.carts?.reduce((sum, cart) => sum + (cart.total_value || 0), 0) || 0
      const workerValue = worker.carts?.reduce((sum, cart) => sum + (cart.worker_total || 0), 0) || 0
      const difference = totalSold - workerValue
      const watching = worker.watching ? 'Yes' : 'No'
      const shiftsLength = worker?.carts ? worker?.carts.length : 0
      console.log(shiftsLength, 'shifts')

      return {
        ...worker,
        workerId: worker.id, // keep a separate field
        performance: difference > 0 ? "Above Average" : difference < 50 ? "Poor" : "Average",
        watching: watching,
        shifts: shiftsLength
      }
    })
  }, [workers])

  const handleDelete = async (id) => {
    try{
      const response = await deleteOneWorker(id)
      toast.success("Deleted", {
        description: `The worker has been deleted.`, 
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        }
      })
      const updatedWorkers = workers.filter(worker => worker.id !== id)
      setWorkers(updatedWorkers)
    }catch(e){
      console.log(e)
    }
  }

  const handleWatchClick = async (id, worker) => {
    try {
      const isWatching = worker.watching === "Yes";
  
      if (isWatching) {
        await removeFromWatchList(id);
        toast.success("Removed from Watchlist", {
          description: `${worker.name} is no longer being watched.`,
        });
      } else {
        await addToWatchList(id);
        toast.success("Added to Watchlist", {
          description: `${worker.name} is now being watched.`,
        });
      }
  
      setWorkers((prevWorkers) =>
        prevWorkers.map((w) =>
          w.id === id ? { ...w, watching: !isWatching ? true : false } : w
        )
      );
    } catch (error) {
      console.error("Error updating watchlist:", error);
      toast.error("Error updating watchlist", {
        description: "Please try again later.",
      });
    }
  };
  

  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const isWatched = row.original.watching === "Yes";
        return (
          <span
            className={`font-medium ${
              isWatched ? "text-red-500" : ""
            }`}
          >
            {row.getValue("name")}
          </span>
        );
      },
    },
    
      {
        accessorKey: "performance",
        header: "Performance",
        cell: ({ row }) => <div className="capitalize">
          {row.getValue("performance") === "Above Average" && <Badge variant='outline' className="flex items-center text-xs"><ChevronUp /> {row.getValue("performance")}</Badge>}
          {row.getValue("performance") === "Average" && <Badge variant='outline' className="flex items-center text-xs"><ChevronRight /> {row.getValue("performance")}</Badge>}
          {row.getValue("performance") === "Poor" && <Badge variant='outline' className="flex items-center text-xs"><ChevronDown /> {row.getValue("performance")}</Badge>}
      </div>,
      },
      {
        accessorKey: "watching",
        header: ({ column }) => (
          <Tooltip>
          <TooltipTrigger>
              <Button variant="ghost">Watching <Info /></Button>
          </TooltipTrigger>
          <TooltipContent>
              <p>Watch workers to have their names display in red on pages, reports and summaries.</p>
          </TooltipContent>
          </Tooltip>
        ),               
        cell: ({ row }) => {
          const watching = row.original.watching; // adjust if your data is nested
          return (
            <Badge
              variant="secondary"
              className={`flex items-center gap-1 ${
                watching === 'Yes' ? "bg-red-500 text-white dark:bg-red-600" : "bg-gray-400 text-white dark:bg-gray-500"
              }`}
            >
              {watching === 'Yes' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {watching === 'Yes' ? "Watching" : "Not Watching"}
            </Badge>
          );
        },
      }, 
      {
        accessorKey: "shifts", // typo
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Shifts <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => {
          const shifts = row.getValue("shifts") || [];
          return <div>{shifts > 0 ? shifts : '-'}</div>; // fallback display
        },
      },
      {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        console.log(row, 'row')
        return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{row.getValue('name')}</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => window.location.href=`/workers/${row.original.workerId}`}>
              <ExternalLink /> View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleWatchClick(row.original.workerId, row.original)}>
              {row.original.watching === 'Yes' ? <EyeOff /> : <EyeIcon />} {row.original.watching === 'Yes' ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDelete(row.original.workerId)} variant="destructive"><Trash /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filter names..."
          value={table.getColumn("name")?.getFilterValue() || ""}
          onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <AddWorkerModal setWorkers={setWorkers} />

      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DataTableDemo
