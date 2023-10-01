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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/registry/new-york/ui/command";
import { format } from "date-fns";
import { ScrollArea, ScrollBar } from "@/registry/new-york/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import axios from "axios";
import router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import React from "react";

const addListingFormSchema = z.object({
  leasingOwner: z.any(),
  account: z
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
});

type AccountFormValues = z.infer<typeof addListingFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  leasingOwner: "default",
  // "account": "Wan Hai Lines",
  // "cargoSize": "0.6",
  // "loadPort": "PSA",
  // "destPort": "Sorong",
  // "leaveDate": "2023-09-30T20:30:00+00:00",
  // "reachDate": "2023-10-22T21:00:00+00:00",
  // "containerType": "Reefer",
  // "typeDangGoods": "Class1 - Explosives",
  // "price": 200,
};

interface AddListingFormProps extends React.HTMLAttributes<HTMLDivElement> {
  portData: Port[];
  containerTypes: ContainerType[];
  goodsClassifications: GoodsClassification[];
  currUser?: any;
  dialogState: any;
}

export function AddListingForm({
  dialogState,
  currUser,
  portData,
  containerTypes,
  goodsClassifications,
  className,
}: AddListingFormProps) {
  // const router = useRouter();
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(addListingFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    data.leasingOwner = currUser.email;
    console.log(data);
    axios
      .post(
        "http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/listings",
        data
      )
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          // Handle the success response here
          console.log("POST request successful");

          // Optionally, you can display a success message using toast or other means.
          toast.success("Listing created successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
          dialogState(false);
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the POST request
        console.error("Error creating listing", error);

        // Display an error message using toast or other means.
        toast.error("An error occurred while creating the listing.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
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
                name="account"
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
