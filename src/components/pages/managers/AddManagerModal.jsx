"use client"

import { addNewManager, fetchAllManagers } from "@/components/routes/ManagerRoutes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
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
import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const AddManagerModal = ({ setManagers }) => {
  const [formData, setFormData] = useState({ name: "", last_name: "", email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [open, setOpen] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" }) // clear error when typing
  }

  const validateForm = () => {
    const { name, last_name, email, password } = formData
    let newErrors = {}

    if (!name.trim()) newErrors.name = "First name is required."
    if (!last_name.trim()) newErrors.last_name = "Last name is required."
    if (!email.trim()) newErrors.email = "Email is required."
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) newErrors.email = "Enter a valid email address."
    }
    if (!password.trim()) newErrors.password = "Password is required."
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const user = await addNewManager(formData)
      toast.success("Manager added successfully", {
        description: `${formData.name} ${formData.last_name} has been added.`,
        action: {
          label: 'View',
          onClick: () => window.location.href = `/managers/${user.id}`,
        },
      })

      setFormData({ name: "", last_name: "", email: "", password: "" })
      setErrors({})
      setOpen(false)
      const response = await fetchAllManagers()
      setManagers(response)
    } catch (e) {
      console.error(e)
      toast.error("Failed to add manager")
    }
  }

  const renderInput = (id, label, type = "text") => (
    <div className="grid gap-1">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        value={formData[id]}
        onChange={handleChange}
        className={errors[id] ? "border-red-500" : ""}
      />
      {errors[id] && (
        <p className="text-red-600 flex items-center gap-1 text-xs">
          <AlertCircle size={14} /> {errors[id]}
        </p>
      )}
    </div>
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Add Manager <Plus /></Button>
      </SheetTrigger>

      <SheetContent>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>Add Manager</SheetTitle>
            <SheetDescription>Create a new manager here. Click save when you are done.</SheetDescription>
          </SheetHeader>

          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            {renderInput("name", "First Name")}
            {renderInput("last_name", "Last Name")}
            {renderInput("email", "Email", "email")}
            {renderInput("password", "Password", "password")}
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

export default AddManagerModal
