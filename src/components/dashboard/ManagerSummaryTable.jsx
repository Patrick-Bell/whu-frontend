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

const ManagerSummaryTable = ({ managers }) => {

    return (

        <div className="border border-gray-200 p-4 mt-4 rounded-lg">
            <div className="flex mb-4 items-center justify-between">
              <div className="flex items-center">
                <Users size={20} />
                <p className="ml-2 font-bold text-md">Managers</p>
              </div>
              <div>
                <Button onClick={() => window.location.href = '/managers'}>View All</Button>
              </div>
            </div>
            <Table>
              <TableCaption>Current management team</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='font-bold'>Name</TableHead>
                  <TableHead className='font-bold'>Shifts</TableHead>
                  <TableHead className='font-bold text-right'>View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {managers.slice(0, 3).map((manager) => {
                    return (
                  <TableRow key={manager.id}>
                    <TableCell className="font-medium">{manager.name}</TableCell>
                    <TableCell>{manager?.games?.length}</TableCell>
                    <TableCell className='flex justify-end'><ArrowRight onClick={() => window.location.href = `/managers/${manager?.id}`} className="w-5 h-5 text-gray-400 hover:text-black transition-colors cursor-pointer" /></TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </div>
    )
}

export default ManagerSummaryTable;