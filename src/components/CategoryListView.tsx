import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "./ui/command";
import { CategoryItems } from "@/type";
import { CommandItem } from "cmdk";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CategoryListView = ({categories}:CategoryItems) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-auto justify-between rounded-none rounded-tl-md rounded-bl-md text-black/80 capitalize border-r-2 hover:border-amazonOrangeDark hoverEffect`}
        >
          All
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command className="bg-amazonBlue backdrop-blur-md text-white">
          <CommandInput placeholder="Search Category" className="h-9" />
          <CommandList>
            <CommandEmpty>No Category found.</CommandEmpty>
            <CommandGroup className="text-white">
              {categories?.map((category:string,index) => (
                <CommandItem value={category} key={index} onSelect={(currentValue) => {
                  setValue(currentValue === value ? '':currentValue);
                  setOpen(false);
                }}>
                  <Link href={`/category/${category}`} className="flex justify-between items-center w-full px-2 py-1 capitalize font-medium hover:text-amazonBlue hover:bg-white">
                  {category}<Check className={cn(`ml-auto w-4 h-4`,value === category?"opacity-100":"opacity-0")}/></Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryListView;
