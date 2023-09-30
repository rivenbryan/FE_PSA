import {
  ContainerType,
  GoodsClassification,
  Port,
} from "@/app/marketplace/page";
import { cn } from "@/lib/utils";
import { Listing } from "./ListingComponent";
import { EmptyMyListings } from "./EmptyMyListingsComponent";
import { MyListingComponent } from "./MyListingsComponent";
import { ScrollArea, ScrollBar } from "@/registry/new-york/ui/scroll-area";

interface MyListingProps extends React.HTMLAttributes<HTMLDivElement> {
  myListings: Listing[];
  portData: Port[];
  containerTypes: ContainerType[];
  goodsClassifications: GoodsClassification[];
}

export function MyListingPage({
  myListings,
  portData,
  containerTypes,
  goodsClassifications,
  className,
}: MyListingProps) {
  return (
    <div
      className={cn(
        "flex min-h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed",
        className
      )}
    >
      {myListings.length != 0 ? (
        <ScrollArea className="h-[550px] w-full">
          <div className="flex justify-between px-5 pb-4 flex-wrap mr-5 pt-5">
            {myListings.map((listing) => {
              return (
                <MyListingComponent
                  key={listing.id}
                  myListing={listing}
                  width={250}
                  height={250}
                  aspectRatio="square"
                  className="my-auto w-[250px] pb-5"
                />
              );
            })}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      ) : (
        <EmptyMyListings
          portData={portData}
          containerTypes={containerTypes}
          goodsClassifications={goodsClassifications}
        />
      )}
    </div>
  );
}
