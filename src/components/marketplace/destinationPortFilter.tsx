"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/registry/new-york/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover";
import { Port } from "@/app/marketplace/page";
import { ScrollArea, ScrollBar } from "@/registry/new-york/ui/scroll-area";

interface destPortFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  portData: Port[];
  setDestPortFilter: any;
  destPortFilter: any;
}

export function DestPortFilter({
  destPortFilter,
  className,
  portData,
  setDestPortFilter,
}: destPortFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(destPortFilter);

  React.useEffect(() => {
    setValue(destPortFilter);
  }, [destPortFilter]);

  const handlePortSelect = (portName: string) => {
    setValue(portName);
    setOpen(false);
    setDestPortFilter(portName);
  };
  return (
    <div className={cn(className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? portData.find((port) => port.name === value)?.name
              : "Select Dest. Port..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search dest. port..." />
            <CommandEmpty>No dest. port found.</CommandEmpty>
            <ScrollArea className="h-[300px]">
              <CommandGroup>
                {portData.map((port) => (
                  <CommandItem
                    key={port.name}
                    onSelect={() => handlePortSelect(port.name)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === port.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {port.name}
                  </CommandItem>
                ))}
              </CommandGroup>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
