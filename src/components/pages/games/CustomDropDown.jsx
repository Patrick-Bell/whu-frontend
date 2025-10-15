import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

const CustomDropdown = ({ error, fixtures, value, onSelect, createdGames = [] }) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-md border border-input ${error ? 'border-red-500' : 'bg-white'} px-3 py-2 text-sm shadow-sm hover:bg-gray-50 focus:outline-none`}
      >
        <span>{value || "Select Game"}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown List */}
      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="max-h-48 overflow-y-auto">
            {fixtures.length > 0 ? (
              fixtures.map((fixture) => {
                const isCreated = createdGames.includes(fixture.id) // ✅ disable check
                return (
                  <div
                    key={fixture.id}
                    onClick={() => {
                      if (!isCreated) {
                        onSelect(fixture)
                        setOpen(false)
                      }
                    }}
                    className={`cursor-pointer px-3 py-2 text-sm ${
                      isCreated
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {fixture.name}
                    {isCreated && (
                      <span className="ml-2 text-xs text-red-500">(Already Added)</span>
                    )}
                  </div>
                )
              })
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">No games found</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomDropdown
