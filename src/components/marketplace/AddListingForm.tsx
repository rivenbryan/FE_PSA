"use client";

import { Button } from "@/registry/new-york/ui/button";
import { DialogFooter } from "@/registry/new-york/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/registry/new-york/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover";
import { cn } from "@/lib/utils";
import {
  ContainerType,
  GoodsClassification,
  Port,
} from "@/app/marketplace/page";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/registry/new-york/ui/command";
import { format } from "date-fns";
import { ScrollArea, ScrollBar } from "@/registry/new-york/ui/scroll-area";
import { Calendar } from "@/registry/new-york/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import Link from "next/link";

const addListingFormSchema = z.object({
  accountName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  cargoSize: z.string().includes(".", {
    message: "Cargo size leased must be smaller than 1 (<0.9)",
  }),
  loadPort: z.string(),
  destPort: z.string(),
  leaveDate: z.string(),
  reachDate: z.string(),
  containerType: z.string(),
  typeDangGoods: z.string(),
  price: z.string(),
  sold: z.boolean(),
});

type AccountFormValues = z.infer<typeof addListingFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  sold: false,
  // "id": 7,
  // "created_at": "2023-09-30T07:50:17.316263+00:00",
  // "leasingOwner": "xiezijian99@gmail.com",
  // "account": "Wan Hai Lines",
  // "cargoSize": "0.6",
  // "loadPort": "PSA",
  // "destPort": "Sorong",
  // "leaveDate": "2023-09-30T20:30:00+00:00",
  // "reachDate": "2023-10-22T21:00:00+00:00",
  // "containerType": "Reefer",
  // "typeDangGoods": "Class1 - Explosives",
  // "price": 200,
  // "sold": false
};

interface AddListingFormProps extends React.HTMLAttributes<HTMLDivElement> {
  portData: Port[];
  containerTypes: ContainerType[];
  goodsClassifications: GoodsClassification[];
}

export function AddListingForm({
  portData,
  containerTypes,
  goodsClassifications,
  className,
}: AddListingFormProps) {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(addListingFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              {/* Account Name */}
              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Container Account</FormLabel>
                    <FormControl>
                      <Input placeholder="Wan Hai Lines" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Cargo Size */}
              <FormField
                control={form.control}
                name="cargoSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Leasing Cargo Size</FormLabel>
                    <FormControl>
                      <Input placeholder="0.8" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Load Port */}
              <FormField
                control={form.control}
                name="loadPort"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Loading Port</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? portData.find(
                                  (port) => port.name === field.value
                                )?.name
                              : "Select Loading Port"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search ports..." />
                          <CommandEmpty>No Ports found.</CommandEmpty>
                          <ScrollArea className="h-[300px]">
                            <CommandGroup>
                              {portData.map((port) => (
                                <CommandItem
                                  value={port.name}
                                  key={port.name}
                                  onSelect={() => {
                                    form.setValue("loadPort", port.name);
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      port.name === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* DestPort */}
              <FormField
                control={form.control}
                name="destPort"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Destination Port</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? portData.find(
                                  (port) => port.name === field.value
                                )?.name
                              : "Select Dest. Port"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search ports..." />
                          <CommandEmpty>No Ports found.</CommandEmpty>
                          <ScrollArea className="h-[300px]">
                            <CommandGroup>
                              {portData.map((port) => (
                                <CommandItem
                                  value={port.name}
                                  key={port.name}
                                  onSelect={() => {
                                    form.setValue("destPort", port.name);
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      port.name === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* LeaveDate */}
              <FormField
                control={form.control}
                name="leaveDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Departure</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="2023-09-30T20:30:00+00:00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* ReachDate */}
              <FormField
                control={form.control}
                name="reachDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Arrival at destination</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="2023-09-30T20:30:00+00:00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* ContainerType */}
              <FormField
                control={form.control}
                name="containerType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Container</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a container type." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {containerTypes.map((containerType) => (
                          <SelectItem
                            value={containerType.type}
                            key={containerType.type}
                          >
                            {containerType.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* TypeDangGoods */}
              <FormField
                control={form.control}
                name="typeDangGoods"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Dangerous Goods Classification</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-auto justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? goodsClassifications.find(
                                  (classification) =>
                                    classification.type === field.value
                                )?.type
                              : "Select Classification"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Command>
                          <CommandInput placeholder="Search classification..." />
                          <CommandEmpty>No classification found.</CommandEmpty>
                          <ScrollArea className="h-[300px]">
                            <CommandGroup>
                              {goodsClassifications.map((classification) => (
                                <CommandItem
                                  value={classification.type}
                                  key={classification.type}
                                  onSelect={() => {
                                    form.setValue(
                                      "typeDangGoods",
                                      classification.type
                                    );
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      classification.type === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {classification.type}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                            <ScrollBar orientation="vertical" />
                          </ScrollArea>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price of lease (SGD)</FormLabel>
                    <FormControl>
                      <Input placeholder="750" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter className="pb-1">
            <Button type="submit">Submit Listing</Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
