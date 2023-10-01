import { Button } from "@/registry/new-york/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog";
import { ScrollArea, ScrollBar } from "@/registry/new-york/ui/scroll-area";
import { AddListingForm } from "./AddListingForm";
import {
  ContainerType,
  GoodsClassification,
  Port,
} from "@/app/marketplace/page";

interface EmptyListingProps extends React.HTMLAttributes<HTMLDivElement> {
  currUser?: any;
  portData: Port[];
  containerTypes: ContainerType[];
  goodsClassifications: GoodsClassification[];
  dialogState: any;
}

export function EmptyMyListings({
  dialogState,
  currUser,
  portData,
  containerTypes,
  goodsClassifications,
}: EmptyListingProps) {
  return (
    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
      <svg
        fill="#000000"
        width="46px"
        height="46px"
        viewBox="0 0 36 36"
        version="1.1"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z"></path>
          <circle cx="25.16" cy="14.28" r="1.8"></circle>
          <circle cx="11.41" cy="14.28" r="1.8"></circle>
          <path d="M18.16,20a9,9,0,0,0-7.33,3.78,1,1,0,1,0,1.63,1.16,7,7,0,0,1,11.31-.13,1,1,0,0,0,1.6-1.2A9,9,0,0,0,18.16,20Z"></path>{" "}
          <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect>{" "}
        </g>
      </svg>

      <h3 className="mt-4 text-lg font-semibold">No listings added</h3>
      <p className="mb-4 mt-2 text-sm text-muted-foreground">
        You have not added any listings. Add one below.
      </p>
      <Dialog>
        <DialogTrigger>
          <Button size="sm" className="relative">
            Add Listing
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Listing</DialogTitle>
            <DialogDescription>Fill in the details to add.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[600px]">
            <AddListingForm
              dialogState={dialogState}
              currUser={currUser}
              portData={portData}
              containerTypes={containerTypes}
              goodsClassifications={goodsClassifications}
              className="px-4 flex-grow justify-center"
            />
            <ScrollBar />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
