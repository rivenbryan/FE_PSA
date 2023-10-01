import Image from "next/image";
import { cn } from "@/lib/utils";
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
import axios from "axios";
// import { useToast } from "@/components/ui/use-toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MyListingProps extends React.HTMLAttributes<HTMLDivElement> {
  myListing: Listing;
  aspectRatio: "portrait" | "square";
  width: number;
  height: number;
  deleteFlag: any;
}

export function MyListingComponent({
  deleteFlag,
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

  const handleDelete = () => {
    axios
      .delete(
        `http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/listings/${myListing.id}`
      )
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          console.log("DELETE request successful");

          toast.success("Delete Success", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
          deleteFlag((prev: boolean) => {
            return !prev;
          });
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the POST request
        console.error("Error deleting listing", error);

        // Display an error message using toast or other means.
        toast.error("Error Deleting Listing", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleSold = () => {
    console.log("selling");
    axios
      .patch(
        `http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/listings/sell/${myListing.id}`
      )
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          console.log("Sold request successful");

          toast.success("Marked as SOLD!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
          deleteFlag((prev: boolean) => {
            return !prev;
          });
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the POST request
        console.error("Error patching listing", error);

        // Display an error message using toast or other means.
        toast.error("Error occurred", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      });
  };

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
      </Dialog>{" "}
      <Button
        variant="default"
        className=" w-[100%] "
        onClick={(e) => {
          handleSold();
        }}
      >
        Sold
      </Button>
      <Button
        variant="destructive"
        className=" w-[100%] "
        onClick={(e) => {
          handleDelete();
        }}
      >
        Delete Listing
      </Button>
    </div>
  );
}
