"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Pencil, ChevronDown, X } from "lucide-react"
import { toast } from "sonner"
import { fetchAllWorkers } from "../../routes/WorkerRoutes"
import { updateOneCart } from "../../routes/CartRoutes"

const EditCartModal = ({ cart, setGame  }) => {
    const [cartData, setCartData] = useState(null)

  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchWorkers()
  }, [])

  const fetchWorkers = async () => {
    try {
      const response = await fetchAllWorkers()
      setCartData({
        game_id: cart?.game_id,
        fixture_id: cart?.fixture_id,
        date: cart?.date,
        cart_number: cart?.cart_number || "",
        worker_data: cart?.cart_workers?.map(cw => ({
          worker_id: cw.worker_id,
          start_time: cw.start_time || "",
          finish_time: cw.finish_time || "",
          half_time: cw.half_time || false,
        })) || [],
        quantities_start: cart?.quantities_start || "",
        quantities_added: cart?.quantities_added || "",
        quantities_minus: cart?.quantities_minus || "",
        final_returns: cart?.final_returns || "",
        float: cart?.float || "",
        worker_total: cart?.worker_total || "",
      })
      setWorkers(
        response.map((w) => ({
          worker_id: w.id,
          name: w.name,
          last_name: w.last_name,
        }))
      )
    } catch (e) {
      console.error("Failed to fetch workers", e)
    }
  }

  const handleChange = (e) => {
    setCartData({ ...cartData, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e, cart, cartData) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await updateOneCart(cart?.id, cartData)
      setGame(prev => ({
        ...prev,
        carts: prev.carts.map(c => c.id === cart.id ? response : c)
      })
      )
      console.log(response)
      toast.success(`Cart ${cartData.cart_number} updated successfully!`)
      setOpen(false)
    } catch (error) {
      toast.error("Failed to update cart")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
            <Pencil className="w-4 h-4" /> Edit Cart
        </Button>
    </SheetTrigger>


      <SheetContent className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>Edit Cart</SheetTitle>
          <SheetDescription>
            Update details for <span className="font-semibold">Cart {cartData?.cart_number}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 flex-1 overflow-y-auto">
          <div className="space-y-6 p-4">
            {/* Cart Number */}
            <div className="grid gap-3">
              <Label htmlFor="cart_number">Cart Number</Label>
              <Input
                disabled
                id="cart_number"
                name="cart_number"
                value={cartData?.cart_number}
                onChange={handleChange}
                required
              />
            </div>

            {/* Worker Names Display */}
                <div className="grid gap-2">
                <Label>Workers</Label>
                {cartData?.worker_data.map((w) => {
                    const worker = workers.find((x) => x.worker_id === w.worker_id)
                    return (
                    <Input
                        key={w.worker_id}
                        value={worker ? `${worker.name} ${worker.last_name}` : "Unknown"}
                        disabled
                    />
                    )
                })}
                </div>

            {/* Quantities */}
            <div className="space-y-4">
              {[
                { label: "Quantities Start", name: "quantities_start" },
                { label: "Quantities Added", name: "quantities_added" },
                { label: "Quantities Minus", name: "quantities_minus" },
                { label: "Returns", name: "final_returns" },
                { label: "Float", name: "float" },
                { label: "Workers Value", name: "worker_total" },
              ].map(({ label, name }) => (
                <div key={name} className="grid gap-2">
                  <Label htmlFor={name}>{label}</Label>
                  <Input
                    id={name}
                    name={name}
                    type="number"
                    value={cartData?.[name] || 0}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

          <SheetFooter className="flex justify-between mt-auto">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </SheetClose>
            <Button onClick={(e) => handleSubmit(e, cart, cartData)} disabled={loading}>
              {loading ? "Saving..." : "Update Cart"}
            </Button>
          </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default EditCartModal
