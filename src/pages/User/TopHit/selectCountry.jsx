import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { countryNames } from "@/helpers/mockData";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

function SelectCountry({ country, setCountry }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen} >
      <DropdownMenuTrigger>
        <div className="flex items-center justify-between px-3 py-1.5 border border-primary-foreground rounded-lg text-base">
          {country || "Select country"}
          <ChevronsUpDown className="size-4 opacity-50 ml-2" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Command className="rounded-sm border-none hover:bg-transparent">
          <CommandInput placeholder="Search country..." className="h-9" />
          <CommandList>
            {countryNames.map((country) => (
              <CommandItem key={country} value={country}
                onSelect={() => {
                  setCountry(country);
                  setDropdownOpen(false);
                }}
              >
                {country}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SelectCountry;