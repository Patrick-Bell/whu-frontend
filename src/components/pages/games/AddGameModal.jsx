"use client"

import { addNewGame, fetchAllGames } from "@/components/routes/GameRoutes"
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
import { AlertCircle, ChevronDown, Plus } from "lucide-react"
import { act, useEffect, useState } from "react"
import { toast } from "sonner"
import { getFixtures } from "../../routes/FixtureRoutes"
import CustomDropdown from "./CustomDropDown"
import { fetchAllManagers } from "../../routes/ManagerRoutes"
import ManagerDropdown from "./ManagerDropdown"
import { useHotkeys } from "react-hotkeys-hook"

const AddGameModal = ({ setGames, games }) => {
  const [formData, setFormData] = useState({ name: "", manager_id: "", date: '' })
  const [open, setOpen] = useState(false) // control modal open state
  const [fixtures, setFixtures] = useState([])
  const [managers, setManagers] = useState([])
  const [errors, setErrors] = useState({})

  const fetchGames = async () => {
    const response = await getFixtures()
    const homeGames = response.filter(fixture => fixture.home_team === 'West Ham United')
    const managers = await fetchAllManagers()
    setManagers(managers)
    setFixtures(homeGames)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Game must be selected.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  useEffect(() => {
    fetchGames()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    try {
      const data = await addNewGame(formData)
      toast.success("Game added successfully", {
        description: `${formData.name} has been added.`,
        action: {
          label: 'View',
          onClick: () => window.location.href = `/games/${data?.id}`,
        },
      })
        const newGame = await fetchAllGames()
        setGames(newGame)
      setFormData({ name: "", manager_id: "", date: '' }) // reset form
      setOpen(false) // close the modal
    } catch (e) {
      console.log(e)
      toast.error("Failed to add game")
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
        <Button>Add Game <Plus /></Button>
      </SheetTrigger>

      <SheetContent>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>Add Game</SheetTitle>
            <SheetDescription>
              Create a new game here. Click save when you are done.
            </SheetDescription>
          </SheetHeader>

          <div className="grid flex-1 auto-rows-min gap-3 px-4">
            <div className="grid gap-2">


            <Label>Games</Label>
            <CustomDropdown
            fixtures={fixtures}
            error={errors.name}
            createdGames={games.map(game => game.fixture_id)}
            value={formData.name}
            onSelect={(fixture) => {
              setFormData({
                ...formData,
                name: fixture.name,
                date: fixture.date,
                manager_id: 4,
                fixture_id: fixture.id,
              })
              setErrors({ ...errors, name: "" })
            }}
            />
            {errors?.name && (
              <p className="text-red-600 flex items-center gap-1 text-xs">
                <AlertCircle size={14} /> {errors.name}
              </p>
            )}


              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                disabled
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="date">Date</Label>
              <Input
                disabled
                value={formData.date}
                id="date"
                name="date"
                onChange={handleChange}
                required
              />
            </div>

            <Label>Manager</Label>
            <ManagerDropdown
            managers={managers}
            value={managers.find(m => m.id === formData.manager_id)}
            onSelect={(manager) =>
                setFormData({
                ...formData,
                manager_id: manager.id,
                })
            }
/>




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

export default AddGameModal
