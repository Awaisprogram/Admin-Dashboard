"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const Search = [
  {
    value: "men",
    label: "Men",
  },
  {
    value: "Women",
    label: "Women",
  },
  {
    value: "Kids",
    label: "Kids",
  },
  {
    value: "Accesories",
    label: "Accesories",
  },
  {
    value: "Watches",
    label: "Watches",
  },
]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <div
      className={cn(
        "flex w-[450px] items-center rounded-lg border border-gray-300 bg-gray-200 py-2 text-sm",
        "focus-within:ring focus-within:ring-blue-500 focus-within:ring-opacity-50"
      )}
      role="combobox"
      aria-expanded={open}
      aria-controls="search-listbox" // ✅ Fix added
      tabIndex={0}
      onClick={() => setOpen((prev) => !prev)}
    >
      <span className="flex-grow text-gray-700">
        {value
          ? Search.find((Search) => Search.value === value)?.label
          : "Search Products..."}
      </span>
    </div>
  </PopoverTrigger>
  <PopoverContent className="w-[350px] p-0">
    <Command>
      <CommandInput placeholder="Type to search..." />
      <CommandList id="search-listbox"> {/* ✅ Fix added */}
        <CommandEmpty>No Product found.</CommandEmpty>
        <CommandGroup>
          {Search.map((Option) => (
            <CommandItem
              key={Option.value}
              value={Option.value}
              onSelect={(currentValue) => {
                setValue(currentValue === value ? "" : currentValue);
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === Option.value ? "opacity-100" : "opacity-0"
                )}
              />
              {Option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>

  )
}
