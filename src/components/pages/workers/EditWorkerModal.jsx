"use client"

import { editOneWorker, fetchAllWorkers } from "@/components/routes/WorkerRoutes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Edit } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const EditWorkerModal = ({ worker, setWorker }) => {
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
        joined: "",
      })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (worker) {
      setFormData({
        name: worker.name || "",
        last_name: worker.last_name || "",
        email: worker.email || "",
        phone_number: worker.phone_number || "",
        address: worker.address || "",
        joined: worker.joined || "",
      })
    }
  }, [worker])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await editOneWorker(worker?.id, formData)     
      toast.success("Worker updated successfully", {
        description: `${formData.name} ${formData.last_name} has been updated.`,
        action: {
          label: 'View',
          onClick: () => window.location.href = `/workers/${updatedWorker.id}`,
        },
      })
      const updatedWorker = { ...worker, ...response }
      setWorker(updatedWorker)

      setOpen(false) // close the modal
    } catch (e) {
      console.error(e)
      toast.error("Failed to update worker")
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button> <Edit /> Edit Worker</Button>
      </SheetTrigger>

      <SheetContent>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>Edit Worker</SheetTitle>
            <SheetDescription>
              Update worker information here. Click save when you are done.
            </SheetDescription>
          </SheetHeader>

          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="name">First Name</Label>
              <Input
                id="name"
                name="name"
                value={formData?.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone_number">Phone</Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>
          </div>

          <SheetFooter className="flex justify-between px-4 py-4">
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default EditWorkerModal
