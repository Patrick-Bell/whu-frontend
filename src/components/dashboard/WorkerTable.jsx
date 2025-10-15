import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatCurrency } from "../functions/Format";

const WorkerTable = ({ workers }) => {

    return (

        <div className="border border-gray-200 p-4 mt-4 rounded-lg">
            <div className="flex mb-4 items-center justify-between">
              <div className="flex items-center">
                <Users size={20} />
                <p className="ml-2 font-bold text-md">Workers</p>
              </div>
              <div>
                <Button onClick={() => window.location.href = '/workers'}>View All</Button>
              </div>
            </div>
            <Table>
              <TableCaption>Current team</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='font-bold'>Name</TableHead>
                  <TableHead className='font-bold'>Shifts</TableHead>
                  <TableHead className='font-bold'>Margin</TableHead>
                  <TableHead className='font-bold text-right'>View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workers.slice(0, 3).map((worker) => {
                    const expectedValue = worker.carts.reduce((acc, cart) => acc + cart.total_value, 0)
                    const workerValue = worker.carts.reduce((acc, cart) => acc + cart.worker_total, 0)
                    const margin = (workerValue - expectedValue)
                    const color = margin === 0 ? 'text-gray-500' : (margin > 0 ? 'text-green-500' : 'text-red-500');
                    return (
                  <TableRow key={worker.id}>
                    <TableCell className="font-medium">{worker.name}</TableCell>
                    <TableCell>{worker?.carts?.length}</TableCell>
                    <TableCell className={color}>{formatCurrency(margin)}</TableCell>
                    <TableCell className='flex justify-end'><ArrowRight onClick={() => window.location.href = `/workers/${worker?.id}`} className="w-5 h-5 text-gray-400 hover:text-black transition-colors cursor-pointer" /></TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </div>
    )
}

export default WorkerTable;