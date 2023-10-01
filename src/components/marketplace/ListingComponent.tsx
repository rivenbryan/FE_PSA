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
import ListingDetailComponent from "./ListingDetails";

interface ListingProps extends React.HTMLAttributes<HTMLDivElement> {
  currentUser: any;
  listing: Listing;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export type Listing = {
  id: number;
  created_at: Date;
  leasingOwner: string;
  account: string;
  cargoSize: string;
  loadPort: string;
  destPort: string;
  leaveDate: Date;
  reachDate: Date;
  containerType: string;
  typeDangGoods: string;
  price: number;
  sold: boolean;
};

export interface ListingInterface {
  id: number;
  created_at: Date;
  leasingOwner: string;
  account: string;
  cargoSize: string;
  loadPort: string;
  destPort: string;
  leaveDate: Date;
  reachDate: Date;
  containerType: string;
  typeDangGoods: string;
  price: number;
  sold: boolean;
}

export function ListingComponent({
  currentUser,
  listing,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ListingProps) {
  let leaveDate = new Date(listing.leaveDate);
  let reachDate = new Date(listing.reachDate);
  let createDate = new Date(listing.created_at);

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="transition-all hover:shadow-md rounded-md hover:scale-[101%]">
        <Dialog>
          <DialogTrigger>
            <ContextMenu>
              <ContextMenuTrigger>
                <div className="overflow-hidden rounded-md">
                  <Image
                    src={`/listingImages/${listing.id}.jpg`}
                    alt={`${listing.account} - ${listing.destPort}`}
                    width={width}
                    height={height}
                    className={cn(
                      "h-auto w-auto object-cover transition-all hover:scale-105",
                      aspectRatio === "portrait"
                        ? "aspect-[3/4]"
                        : "aspect-square"
                    )}
                  />
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-40">
                <ContextMenuSub>
                  <ContextMenuSubTrigger>View More</ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-48">
                    <ContextMenuItem>
                      <ChatBubbleIcon className="mr-2 h-4 w-4" />
                      Chat with buyer
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <CrossCircledIcon className="mr-2 h-4 w-4" />
                      WIP
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem>WIP</ContextMenuItem>
                <ContextMenuItem>WIP</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            <div className="space-y-1 text-sm text-left pt-2 p-1">
              <h3 className="font-medium leading-none">
                {listing.account} - {listing.destPort}
              </h3>
              <p className="text-xs text-muted-foreground">
                Departure Date: {leaveDate.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                Arrival Date: {reachDate.toString()}
              </p>
              <p className="text-xs text-muted-foreground">
                Leased by: {listing.leasingOwner}
              </p>
              <p className="text-xs text-muted-foreground">
                Listed on: {createDate.toLocaleString()}
              </p>
              <p className=" text-xl  font-bold text-right">
                ${listing.price}
                <span className=" text-sm text-muted-foreground font-bold text-right">
                  / {listing.cargoSize} TEU
                </span>
              </p>
            </div>
          </DialogTrigger>
          <DialogContent className="min-w-[60%] max-w-[1100px]">
            <ScrollArea className="h-[600px]">
              <ListingDetailComponent currentUser={currentUser} listing={listing} />
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
