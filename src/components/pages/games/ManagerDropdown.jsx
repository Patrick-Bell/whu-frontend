"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

const ManagerDropdown = ({ managers, value, onSelect }) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown if clicked outside
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
        className="flex w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <span>{value?.name || "Select Manager"}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown List */}
      {open && (
        <div className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {managers.length > 0 ? (
            managers.map((manager) => (
              <div
                key={manager.id}
                onClick={() => {
                  onSelect(manager)
                  setOpen(false)
                }}
                className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
              >
                {manager.name}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">No managers found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default ManagerDropdown
