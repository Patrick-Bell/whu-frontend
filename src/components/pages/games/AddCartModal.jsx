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
import { Plus, ChevronDown, X, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { fetchAllWorkers } from "../../routes/WorkerRoutes"
import { addCartToGame } from "@/components/routes/GameRoutes"
import { CommandEmpty, CommandInput } from "cmdk"
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useHotkeys } from "react-hotkeys-hook"

const AddCartModal = ({ game, setGame }) => {
  const [cartData, setCartData] = useState({
    game_id: game?.id,
    fixture_id: game?.fixture_id,
    date: game?.date,
    cart_number: '',
    worker_data: [],
    quantities_start: '',
    quantities_added: '',
    quantities_minus: '',
    final_returns: '',
    float: '',
    worker_total: '',
  })

  
  const playTutorial = () => {
    setErrors({})
    const driverObj = driver({
      showProgress: true,
      allowClose: false,
      popoverClass: 'driverjs-theme',
      steps: [
        { element: '#cart-modal', popover: { title: 'Adding a cart', description: 'Please take 2 mins to have a quick tour. This tutorial will explain how to add a cart and what each part means.' } },
        { element: '#carts-add', popover: { title: 'Cart', description: 'Select a cart from the drop down. You will only see the first 5 carts. Please type in the input box to see more.' } },
        { element: '#carts-add-2', popover: { title: 'Workers', description: 'Select worker(s) from the drop down. You will only see the first 5 workers. Please type in the input box to see more. Then fill out their start and finish time so attendance and hour records can be automatically created.' } },
        { element: '#carts-add-3', popover: { title: 'Quantities Start', description: 'This is the starting number of programmes the cart starts on.' } },
        { element: '#carts-add-4', popover: { title: 'Quantities Added', description: 'This is to track any programme additions the cart gets during the event.' } },
        { element: '#carts-add-5', popover: { title: 'Quantities Minus', description: 'This is to track any programme subtractions the cart gets during the event. From the additions and subtractions, Final Quantity is automatically calculated.' } },
        { element: '#carts-add-6', popover: { title: 'Returns', description: 'This is the number of programmes the cart returns. From this, Sold and Expected Value is calculated (sold * 4)' } },
        { element: '#carts-add-7', popover: { title: 'Float', description: 'The initial money sum the cart starts with.' } },
        { element: '#carts-add-8', popover: { title: 'Worker Value', description: 'The money returns from the worker. Margin is calculated by getting this figure and comparing it to the Expected Value.' } },
        { element: '#cart-submit', popover: { title: 'Submit', description: 'The final step is to click submit, this will add the cart to the associate game and worker.' } },
      ],
    })
  
    driverObj.drive()
  }
  
  

  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [errors, setErrors] = useState({})

  const carts = [
    "Gazebo 1",
    "Gazebo 2",
    "1",
    "2",
    "3",
    "4",
    "5",
    "7",
    "10",
    "BR2",
    "11",
    "14",
    "15",
    "16",
    "17",
  ]

  const validateForm = () => {
    const newErrors = {}

    if (cartData.worker_data.length === 0) newErrors.worker_data = "At least one worker is required."

  
    if (!cartData.cart_number) newErrors.cart_number = "Cart selection is required."
    if (!cartData.quantities_start) newErrors.quantities_start = 'Cannot be left empty. If empty, please enter 0'

    const missingTimes = cartData.worker_data.some(
      (w) => !w.start_time || !w.finish_time
    )
  
    if (missingTimes) {
      newErrors.worker_data = "All workers must have start and finish times."
    }

    if (!cartData.quantities_added) newErrors.quantities_added = 'Cannot be left empty. If empty, please enter 0'
    if (!cartData.quantities_minus) newErrors.quantities_minus = 'Cannot be left empty. If empty, please enter 0'
    if (!cartData.final_returns) newErrors.final_returns = 'Cannot be left empty. If empty, please enter 0'
    if (!cartData.float) newErrors.float = 'Cannot be left empty. If empty, please enter 0'
    if (!cartData.worker_total) newErrors.worker_total = 'Cannot be left empty. If empty, please enter 0'
  
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  

  useEffect(() => {
    fetchWorkers()
  }, [])

  useEffect(() => {
    if (game) {
      setCartData((prev) => ({
        ...prev,
        game_id: game?.id,
        fixture_id: game?.fixture_id,
        date: game?.date,
      }))
    }
  }, [game, loading, modalOpen])

  const fetchWorkers = async () => {
    try {
      const response = await fetchAllWorkers()
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

  const handleAddWorker = (worker) => {
    if (cartData.worker_data.find((w) => w.worker_id === worker.worker_id))
      return
    setCartData((prev) => ({
      ...prev,
      worker_data: [
        ...prev.worker_data,
        {
          worker_id: worker.worker_id,
          start_time: "",
          finish_time: "",
          half_time: false,
        },
      ],
    }))
    setOpen(false)
  }

  const handleRemoveWorker = (id) => {
    setCartData((prev) => ({
      ...prev,
      worker_data: prev.worker_data.filter((w) => w.worker_id !== id),
    }))
  }

  const handleWorkerFieldChange = (id, field, value) => {
    setCartData((prev) => ({
      ...prev,
      worker_data: prev.worker_data.map((w) =>
        w.worker_id === id ? { ...w, [field]: value } : w
      ),
    }))
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please correct the errors before submitting.")
      return
    }

    setLoading(true)
    try {
      const response = await addCartToGame(cartData)
      toast.success(`Cart Number ${cartData.cart_number} added successfully!`)

      const newCart = {
        ...(response.cart || response),
        worker_data: cartData.worker_data,
      }
      setGame(prevGame => ({
        ...prevGame,
        carts: [...(prevGame.carts || []), newCart],
      }))

      window.location.reload()
      
      
      resetForm()
      setModalOpen(false)
    } catch (error) {
      toast.error("Failed to add cart")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setCartData({
      game_id: game?.id,
      fixture_id: game?.fixture_id,
      date: game?.date,
      cart_number: "",
      worker_data: [],
      quantities_start: 0,
      quantities_added: 0,
      quantities_minus: 0,
      final_returns: 0,
      float: 0,
      worker_total: 0,
    })
  }
  
  useHotkeys("ctrl+o, meta+o", (e) => {
    e.preventDefault()
    setModalOpen(true)
  },
)


useHotkeys("ctrl+h, meta+h", (e) => {
  e.preventDefault()
  setModalOpen(true)
  playTutorial()
},
)

  return (
    <Sheet open={modalOpen} onOpenChange={setModalOpen}>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2">
          Add Cart <Plus className="w-4 h-4" />
        </Button>
      </SheetTrigger>

      <SheetContent id='cart-modal' className="flex flex-col gap-1">
        <SheetHeader className='border-b'>
          <SheetTitle>Add New Cart</SheetTitle>
          <SheetDescription>
            Create a new cart for{" "}
            <span className="font-semibold">{game?.name}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 flex-1 overflow-y-auto p-4">
          {/* Cart Selector */}
          <div id="carts-add" className="space-y-2">
            <Label>Carts</Label>
            <Popover open={openCart} onOpenChange={setOpenCart}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={`w-full justify-between ${errors.cart_number ? 'border-red-500' : ''}`}
                >
                  {cartData.cart_number || "Select Cart"}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-0 w-[350px]">
                <Command>
                  <CommandInput className="p-2" placeholder="Search Cart..." />
                  <CommandEmpty className="p-2">No results found.</CommandEmpty>
                  <CommandGroup className={`max-h-60 overflow-y-auto`}>
                    {carts.map((cart) => (
                      <CommandItem
                        key={cart}
                        value={cart}
                        onSelect={(selectedValue) => {
                          handleChange({
                            target: { name: "cart_number", value: selectedValue },
                          })
                          setOpenCart(false)
                        }}
                      >
                        {cart}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {errors?.cart_number && (
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
              <p className="text-red-500 text-xs">{errors?.cart_number}</p>
              </div>
            )}
          </div>

          {/* Workers */}
          <div id="carts-add-2" className="space-y-3">
            <Label>Workers</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={`w-full justify-between ${errors?.worker_data ? 'border-red-500' : ''}`}
                >
                  Select worker
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[350px]">
                <Command>
                  <CommandInput
                    className="p-2"
                    placeholder="Search worker..."
                  />
                  <CommandEmpty className="p-2">No results found.</CommandEmpty>
                  <CommandGroup className="max-h-60 overflow-y-auto">
                    {workers.map((worker) => (
                      <CommandItem
                        key={worker.worker_id}
                        onSelect={() => handleAddWorker(worker)}
                      >
                        {worker.name} {worker.last_name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {errors?.worker_data && (
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
              <p className="text-red-500 text-xs">{errors?.worker_data}</p>
              </div>
            )}

            {/* Render selected workers */}
            <div className="space-y-4">
              {cartData.worker_data.map((w) => {
                const worker = workers.find(
                  (x) => x.worker_id === w.worker_id
                )
                return (
                  <div
                    key={w.worker_id}
                    className="border rounded-xl p-4 border-gray-200 bg-gray-50 space-y-4 relative"
                  >
                    {/* Worker Name + Remove Button */}
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">
                        {worker
                          ? `${worker.name} ${worker.last_name}`
                          : "Unknown"}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:bg-red-100"
                        onClick={() => handleRemoveWorker(w.worker_id)}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Worker Fields */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <Label>Start Time</Label>
                        <Input
                          type="time"
                          value={w.start_time}
                          onChange={(e) =>
                            handleWorkerFieldChange(
                              w.worker_id,
                              "start_time",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="space-y-1">
                        <Label>Finish Time</Label>
                        <Input
                          type="time"
                          value={w.finish_time}
                          onChange={(e) =>
                            handleWorkerFieldChange(
                              w.worker_id,
                              "finish_time",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="flex items-center space-x-2 mt-6">
                        <Checkbox
                          checked={w.half_time}
                          onCheckedChange={(checked) =>
                            handleWorkerFieldChange(
                              w.worker_id,
                              "half_time",
                              checked
                            )
                          }
                        />
                        <Label className="text-sm font-medium">
                          Half Time
                        </Label>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quantities */}
          <div className="space-y-6">
  {/* Quantities Start (single row) */}
  <div id="carts-add-3" className="space-y-2">
    <Label htmlFor="quantities_start">Quantities Start</Label>
    <Input
      id="quantities_start"
      name="quantities_start"
      type="number"
      value={cartData.quantities_start}
      onChange={handleChange}
      required
      className={errors.quantities_start ? "border-red-500" : ""}
    />
    {errors?.quantities_start && (
    <div className="flex items-center">
      <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
    <p className="text-red-500 text-xs">{errors?.quantities_start}</p>
    </div>
  )}
  </div>
  

  {/* Quantities Added + Minus (side by side) */}
  <div className="grid grid-cols-2 gap-4">
    <div id="carts-add-4" className="space-y-2">
      <Label htmlFor="quantities_added">Quantities Added</Label>
      <Input
        id="quantities_added"
        name="quantities_added"
        type="number"
        value={cartData.quantities_added}
        onChange={handleChange}
        required
        className={errors.quantities_start ? "border-red-500" : ""}
      />
      {errors?.quantities_added && (
    <div className="flex items-start">
      <AlertCircle className="h-4 w-4 mr-1 text-red-500 flex-shrink-0" />
    <p className="text-red-500 text-xs">{errors?.quantities_added}</p>
    </div>
  )}
    </div>

    <div id="carts-add-5" className="space-y-2">
      <Label htmlFor="quantities_minus">Quantities Minus</Label>
      <Input
        id="quantities_minus"
        name="quantities_minus"
        type="number"
        value={cartData.quantities_minus}
        onChange={handleChange}
        required
        className={errors.quantities_start ? "border-red-500" : ""}
      />
      {errors?.quantities_minus && (
    <div className="flex items-start">
      <AlertCircle className="h-4 w-4 mr-1 text-red-500 flex-shrink-0" />
    <p className="text-red-500 text-xs">{errors?.quantities_minus}</p>
    </div>
  )}
    </div>
  </div>

  {/* Returns (single row) */}
  <div id="carts-add-6" className="space-y-2">
    <Label htmlFor="final_returns">Returns</Label>
    <Input
      id="final_returns"
      name="final_returns"
      type="number"
      value={cartData.final_returns}
      onChange={handleChange}
      required
      className={errors.quantities_start ? "border-red-500" : ""}
    />
    {errors?.final_returns && (
    <div className="flex items-center">
      <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
    <p className="text-red-500 text-xs">{errors?.final_returns}</p>
    </div>
  )}
  </div>

  {/* Float + Worker Value (side by side) */}
  <div className="grid grid-cols-1 gap-4">
    <div id="carts-add-7" className="space-y-2">
      <Label htmlFor="float">Float</Label>
      <Input
        id="float"
        name="float"
        type="number"
        value={cartData.float}
        onChange={handleChange}
        required
        className={errors.quantities_start ? "border-red-500" : ""}
      />
      {errors?.float && (
    <div className="flex items-center">
      <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
    <p className="text-red-500 text-xs">{errors?.float}</p>
    </div>
  )}
    </div>

    <div id="carts-add-8" className="space-y-2">
      <Label htmlFor="worker_total">Workers Value</Label>
      <Input
        id="worker_total"
        name="worker_total"
        type="number"
        value={cartData.worker_total}
        onChange={handleChange}
        required
        className={errors.quantities_start ? "border-red-500" : ""}
      />
      {errors?.worker_total && (
    <div className="flex items-center">
      <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
    <p className="text-red-500 text-xs">{errors?.worker_total}</p>
    </div>
  )}
    </div>
  </div>
</div>

        </div>

        <SheetFooter className="flex justify-between mt-auto px-4 py-3 border-t">
        <Button onClick={() => playTutorial()} type="button" variant="outline">
              Learn more
            </Button>
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </SheetClose>
          <Button id='cart-submit' onClick={() => handleSubmit()} disabled={loading}>
            {loading ? "Saving..." : "Add Cart"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default AddCartModal
