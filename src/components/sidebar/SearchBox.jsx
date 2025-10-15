"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  User,
  Play,
  SearchCheckIcon,
  ArrowRight,
  BarChart3,
  CalendarDays,
  LayoutDashboard,
  Search,
  HelpCircle,
} from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { fetchAllWorkers } from "../routes/WorkerRoutes"
import { fetchAllGames } from "../routes/GameRoutes"
import { fetchAllManagers } from "../routes/ManagerRoutes"
import { formatDate } from "../functions/Format"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useHotkeys } from "react-hotkeys-hook"
import { useAuth } from "../context/AuthContext"


const SearchBox = () => {
  const [open, setOpen] = useState(false)
  const [workers, setWorkers] = useState([])
  const [games, setGames] = useState([])
  const [managers, setManagers] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return;
  
    const fetchData = async () => {
      setLoading(true)
      try {
        const [x, y, z] = await Promise.all([
          fetchAllWorkers(),
          fetchAllGames(),
          fetchAllManagers(),
        ])
        setWorkers(x)
        setGames(y)
        setManagers(z)
      } catch (e) {
        console.error("Failed to fetch search data:", e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user])
  

  const handleNavigate = (path) => {
    setOpen(false)
    navigate(path)
  }

  const otherNav = [
    { name: "Analytics", link: "/analytics", icon: BarChart3 },
    { name: "Fixtures", link: "/fixtures", icon: CalendarDays },
    { name: "Dashboard", link: "/dashboard", icon: LayoutDashboard },
    { name: 'My Account', link: '/account', icon: User },
    { name: 'Support', link: '/support', icon: HelpCircle }
  ]

  useHotkeys("ctrl+k, meta+k", (e) => {
      e.preventDefault()
      setOpen(true)
    },
    { enableOnTags: ["INPUT", "TEXTAREA"] } // optional: allow shortcuts in inputs if needed
  )

  return (
    <>
              <Tooltip>
                <TooltipTrigger asChild>
                <button 
                id="search-btn"
                  onClick={() => setOpen(true)}
                  className="mt-3 lg:mt-0 lg:w-auto inline-flex items-center px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
                <Search className="h-4 w-4" />
              </button>               
               </TooltipTrigger>
                <TooltipContent>
                  <p>Click to search across the web application</p>
                </TooltipContent>
              </Tooltip>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for Workers, Games, or Managers..." />
        <CommandList>
          {loading ? (
            <div className="p-4 text-sm text-muted-foreground">Loading...</div>
          ) : (
            <>
              <CommandEmpty>No results found.</CommandEmpty>

              {workers.length > 0 && (
                <>
                  <CommandGroup heading="Workers">
                    {workers.map((worker) => (
                      <CommandItem className={`${worker.watching ? 'text-red-500' : ''}`} key={worker.id} onSelect={() => handleNavigate(`/workers/${worker.id}`)}>
                        <User className="mr-2 h-4 w-4" />
                        <span>{worker.name} {worker.last_name}</span>
                        <CommandShortcut><ArrowRight /></CommandShortcut>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}

              {games.length > 0 && (
                <>
                  <CommandGroup heading="Games">
                    {games.map((game) => (
                      <CommandItem key={game.id} onSelect={() => handleNavigate(`/games/${game.id}`)}>
                        <Play className="mr-2 h-4 w-4" />
                        <span>{game.name} — {formatDate(game.date)}</span>
                        <CommandShortcut><ArrowRight /></CommandShortcut>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}

              {managers.length > 0 && (
                <>
                  <CommandGroup heading="Managers">
                    {managers.map((manager) => (
                      <CommandItem key={manager.id} onSelect={() => handleNavigate(`/managers/${manager.id}`)}>
                        <User className="mr-2 h-4 w-4" />
                        <span>{manager.name}</span>
                        <CommandShortcut><ArrowRight /></CommandShortcut>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}

              <CommandGroup heading="Other">
                {otherNav.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <CommandItem key={i} onSelect={() => handleNavigate(item.link)}>
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
                      <CommandShortcut><ArrowRight /></CommandShortcut>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default SearchBox
