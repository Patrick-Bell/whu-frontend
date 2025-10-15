"use client"

import React, { useEffect, useMemo, useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table"
import { ArrowUpDown, BadgeCheckIcon, Check, ChevronDown, ChevronRight, ChevronUp, Download, Edit, Eye, EyeClosed, EyeIcon, Info, LoaderIcon, MoreHorizontal, Plus, Trash, X } from "lucide-react"

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
import { formatDate } from "@/components/functions/Format"
import AddGameModal from "./AddGameModal"

const GameDataTable = ({ games, setGames }) => {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})


  const tableData = useMemo(() => {
    return games.map(game => {
      const totalSold = game.carts?.reduce((sum, cart) => sum + (cart.total_value || 0), 0) || 0
      const workerValue = game.carts?.reduce((sum, cart) => sum + (cart.worker_total || 0), 0) || 0
      const allWorkers = game.carts
      ? game.carts.flatMap(cart => cart.workers || [])
      : []

    // Count unique workers by ID
    const numberOfWorkers = new Set(allWorkers.map(worker => worker.id)).size

    const completeStatus = game.complete_status ? "Complete" : "In Progress"

      return {
        ...game,
        gameId: game.id,
        totalSold,
        workerValue,
        numberOfWorkers,
        completeStatus
      }
    })
  }, [games])

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
        cell: ({ row }) => row.getValue("name"),
      },
      {
        accessorKey: "date",
        header: ({ column }) => (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Date <ArrowUpDown />
            </Button>
          ),
        cell: ({ row }) => formatDate(row.getValue("date")),
      },
      {
        accessorKey: "staff",
        header: "Staff",
        cell: ({ row }) => <Badge variant="outline">{row.original.numberOfWorkers}</Badge>,
    },   
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const isComplete = row.original.complete_status; // adjust if your data is nested
        return (
          <Badge
            variant="secondary"
            className={`flex items-center gap-1 ${
              isComplete ? "bg-green-500 text-white dark:bg-green-600" : "bg-yellow-500 text-white dark:bg-yellow-600"
            }`}
          >
            {isComplete ? <BadgeCheckIcon className="w-4 h-4" /> : <LoaderIcon className="w-4 h-4 animate-spin" />}
            {isComplete ? "Completed" : "Pending"}
          </Badge>
        );
      },
    },      
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{row.getValue('name')}</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => window.location.href=`/games/${row.original.gameId}`}>
              <EyeIcon /> View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled variant="destructive"><Trash /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
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
            <AddGameModal setGames={setGames} games={games} />
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

export default GameDataTable
