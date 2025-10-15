"use client"

import { useState, useEffect } from 'react'
import { FilterIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

const FilterCarts = ({ game, setGame, carts }) => {
  const [filters, setFilters] = useState({
    margin: "",
    sold: "",
  })
  const [baseCarts, setBaseCarts] = useState([])


  useEffect(() => {
    if (carts?.length) {
      setBaseCarts(carts)
    }
  }, [])
 

  // Optional: auto-apply filters when filters change
  useEffect(() => {
    handleFilter()
  }, [filters])

  const handleSelect = (category, value) => {
    setFilters((prev) => ({ ...prev, [category]: value }))
  }

  const handleFilter = () => {
    if (!carts?.length) return

    let filtered = [...carts]

    filtered = filtered.map((cart) => {
      const workerValue = cart.worker_total || 0
      const expected = cart.total_value || 0
      const margin = workerValue - expected

      const sold = cart.sold || 0
      const totalProgrammes = cart.final_quantity || 1
      const soldPercentage = (sold / totalProgrammes) * 100

      return { ...cart, margin, soldPercentage }
    })

    // Margin filter
    if (filters.margin === "positive") {
      filtered = filtered.filter((c) => c.margin > 0)
    } else if (filters.margin === "negative") {
      filtered = filtered.filter((c) => c.margin < 0)
    }

    // Sold filter
    if (filters.sold === "over") {
      filtered = filtered.filter((c) => Number(c.soldPercentage) > 50)
    } else if (filters.sold === "under") {
      filtered = filtered.filter((c) => Number(c.soldPercentage) <= 50)
    }

    console.log(filtered, 'filtered')
    console.log(baseCarts, 'base carts')

    setGame((prev) => ({
      ...prev,
      carts: filtered,
    }))
  }

  const handleReset = () => {
    setFilters({ margin: "", sold: "" })
    setGame((prev) => ({
      ...prev,
      carts: baseCarts, // restore original
    }))
  }

  return (
    <Drawer className='overflow-scroll'>
      <DrawerTrigger asChild>
        <Button variant="outline" className="items-center hidden lg:flex">
          <FilterIcon className="mr-1 h-4 w-4" />
          Filter
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-5xl px-6 pb-6">
          <DrawerHeader>
            <DrawerTitle>Filter Carts</DrawerTitle>
            <DrawerDescription>
              Select filters to narrow down the carts.
            </DrawerDescription>
          </DrawerHeader>

          <Separator className="mb-5" />

          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Margin filter */}
            <FieldGroup className="border border-border rounded-lg p-4">
              <FieldSet>
                <FieldLabel>Margin</FieldLabel>
                <FieldDescription>
                  Select to view positive or negative carts.
                </FieldDescription>
                <RadioGroup
                  value={filters.margin}
                  onValueChange={(v) => handleSelect("margin", v)}
                >
                  <FieldLabel                   
                  className={'hover:bg-gray-50 cursor-pointer'}
                  htmlFor="positive">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>Positive</FieldTitle>
                        <FieldDescription>
                          Filter carts that have returned +.
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="positive" id="positive" />
                    </Field>
                  </FieldLabel>

                  <FieldLabel 
                  className={'hover:bg-gray-50 cursor-pointer'}
                  htmlFor="negative">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>Negative</FieldTitle>
                        <FieldDescription>
                          Filter carts that have returned -.
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="negative" id="negative" />
                    </Field>
                  </FieldLabel>
                </RadioGroup>
              </FieldSet>
            </FieldGroup>

            {/* Sold filter */}
            <FieldGroup className="border border-border rounded-lg p-4">
              <FieldSet>
                <FieldLabel>Sold</FieldLabel>
                <FieldDescription>
                  Select carts that sold greater or lower than 50%.
                </FieldDescription>
                <RadioGroup
                  value={filters.sold}
                  onValueChange={(v) => handleSelect("sold", v)}
                >
                  <FieldLabel 
                  className={'hover:bg-gray-50 cursor-pointer'}
                  htmlFor="over">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>Over 50%</FieldTitle>
                        <FieldDescription>
                          Filter carts that sold over 50%.
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="over" id="over" />
                    </Field>
                  </FieldLabel>

                  <FieldLabel 
                  className={'hover:bg-gray-50 cursor-pointer'}
                  htmlFor="under">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>Below 50%</FieldTitle>
                        <FieldDescription>
                          Filter carts that sold below 50%.
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="under" id="under" />
                    </Field>
                  </FieldLabel>
                </RadioGroup>
              </FieldSet>
            </FieldGroup>
          </div>

          <Separator className="my-6" />

          <DrawerFooter className="flex justify-end gap-2">
            <DrawerClose asChild>
              <Button onClick={handleFilter}>Apply Filters</Button>
            </DrawerClose>

            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>

            <DrawerClose asChild>
              <Button onClick={() => handleReset()} variant="outline">
                Reset
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default FilterCarts
