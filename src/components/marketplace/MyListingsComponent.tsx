import Image from "next/image";
import { ChatBubbleIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/new-york/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog";
import { ScrollArea, ScrollBar } from "@/registry/new-york/ui/scroll-area";
import { Listing } from "./ListingComponent";
import { Button } from "@/registry/new-york/ui/button";

interface MyListingProps extends React.HTMLAttributes<HTMLDivElement> {
  myListing: Listing;
  aspectRatio: "portrait" | "square";
  width: number;
  height: number;
}

export function MyListingComponent({
  myListing,
  aspectRatio,
  width,
  height,
  className,
  ...props
}: MyListingProps) {
  let leaveDate = new Date(myListing.leaveDate);
  let reachDate = new Date(myListing.reachDate);
  let createDate = new Date(myListing.created_at);

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <Dialog>
        <DialogTrigger>
          <div className="rounded-md transition-all hover:shadow-lg hover:scale-[101%]">
            <div className="overflow-hidden rounded-md">
              <Image
                src={`/listingImages/${myListing.id}.jpg`}
                alt={`${myListing.account} - ${myListing.destPort}`}
                width={width}
                height={height}
                className={cn(
                  "h-auto w-auto object-cover transition-all hover:scale-105",
                  aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )}
              />
            </div>

            <div className="space-y-1 text-sm text-left pt-2 p-1">
              <h3 className="font-medium leading-none">
                {myListing.account} - {myListing.destPort}
              </h3>
              <p className="text-xs text-muted-foreground">
                Departure Date: {leaveDate.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                Arrival Date: {reachDate.toString()}
              </p>
              <p className="text-xs text-muted-foreground">
                Listed on: {createDate.toLocaleString()}
              </p>
              <p className=" text-xl  font-bold text-right">
                ${myListing.price}
                <span className=" text-sm text-muted-foreground font-bold text-right">
                  / {myListing.cargoSize} TEU
                </span>
              </p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className=" min-w-[85%]">
          <DialogHeader>
            <DialogTitle>Listing Dialog</DialogTitle>
            <DialogDescription>Listing details</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[600px]">
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <Button className=" bg-red-700 w-[100%] hover:bg-red-400">
        Delete Listing
      </Button>
    </div>
  );
}
