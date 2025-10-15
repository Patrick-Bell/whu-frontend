"use client"

import { addNewWorker, fetchAllWorkers } from "@/components/routes/WorkerRoutes"
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
import { AlertCircle, Plus } from "lucide-react"
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { toast } from "sonner"

const AddWorkerModal = ({ setWorkers }) => {
  const [formData, setFormData] = useState({ name: "", last_name: "" })
  const [open, setOpen] = useState(false) // control modal open state
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData?.name.trim()) newErrors.name = 'First name is required.';
    if (!formData?.last_name.trim()) newErrors.last_name = 'Last name is required.';

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })

  }

  const handleSubmit = async (e) => {
    e?.preventDefault()
    setLoading(true)
    if (!validateForm()) return
    try {
      const user = await addNewWorker(formData)
      toast.success("Worker added successfully", {
        description: `${formData.name} ${formData.last_name} has been added.`,
        action: {
          label: 'View',
          onClick: () => window.location.href = `/workers/${user.id}`,
        },
      })
      
      setFormData({ name: "", last_name: "" }) // reset form
      setOpen(false) // close the modal
      const response = await fetchAllWorkers()
      setWorkers(response)
    } catch (e) {
      console.log(e)
      toast.error("Failed to add worker")
    } finally {
      setLoading(false)
    }
  }
 

  useHotkeys("ctrl+o, meta+o", (e) => {
    e.preventDefault()
    setOpen(true)
  },
)
  
  
  

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Add Worker <Plus /></Button>
      </SheetTrigger>

      <SheetContent>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>Add Worker</SheetTitle>
            <SheetDescription>
              Create a new worker here. Click save when you are done.
            </SheetDescription>
          </SheetHeader>

          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-1">
              <Label htmlFor="name">First Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'border-red-500' : ''}
              />
            {errors?.name && (
              <p className="text-red-600 flex items-center gap-1 text-xs">
                <AlertCircle size={14} /> {errors.name}
              </p>
            )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={errors.last_name ? 'border-red-500' : ''}
              />
            {errors?.last_name && (
              <p className="text-red-600 flex items-center gap-1 text-xs">
                <AlertCircle size={14} /> {errors.last_name}
              </p>
            )}
            </div>
          </div>

          <SheetFooter className="flex justify-between px-4 py-4">
            <Button disabled={loading} type="submit">{loading ? 'Saving...' : 'Save Changes'}</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default AddWorkerModal
