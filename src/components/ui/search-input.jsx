import { useIsMobile } from "@/hooks/use-mobile";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./command";

function SearchInput(props) {
  const {placeholder, isOpen, setIsOpen} = props;
  //For Mobile
  const isMobile = useIsMobile();

  const handleOpenChange = (open) => {
    setIsOpen(open);
  };
  // End for Mobile
  return isMobile ? (
    <>
      <CommandDialog open={isOpen} onOpenChange={handleOpenChange}>
        <CommandInput placeholder={placeholder}/> 
        {/* <CommandList>
          <CommandEmpty>No result found.</CommandEmpty>
          <CommandGroup heading="Song">
            <CommandItem>
              <span>abc</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator/>

          <CommandGroup heading="Artist">

          </CommandGroup>
          <CommandSeparator/>

          <CommandGroup heading="Genre">

          </CommandGroup>
        </CommandList> */}
      </CommandDialog>
    </>
  ) : (
    <>
      <Command>
        <CommandInput placeholder={placeholder} /> 
        {/* <CommandList>
          <CommandEmpty>No result found.</CommandEmpty>
          <CommandGroup heading="Song">
            <CommandItem>
              <span>abc</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator/>

          <CommandGroup heading="Artist">

          </CommandGroup>
          <CommandSeparator/>

          <CommandGroup heading="Genre">

          </CommandGroup>
        </CommandList> */}
      </Command>
    </>
  );
}

export default SearchInput