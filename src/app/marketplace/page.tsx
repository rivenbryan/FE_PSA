import { Metadata } from "next";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/registry/new-york/ui/button";
import { ScrollArea, ScrollBar } from "@/registry/new-york/ui/scroll-area";
import { Separator } from "@/registry/new-york/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import axios from "axios";
import {
  ListingComponent,
  Listing,
} from "@/components/marketplace/ListingComponent";
import { MyListingPage } from "@/components/marketplace/MyListingsComponent";
import { Sidebar } from "@/components/marketplace/sidebar";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog";
import { Label } from "@/registry/new-york/ui/label";
import { Input } from "@/registry/new-york/ui/input";
import { AddListingForm } from "@/components/marketplace/AddListingForm";

export const metadata: Metadata = {
  title: "MarketPlace",
  description: "All Partial Container Listings.",
};

export type Port = {
  UNLocode: string;
  name: string;
};

export type ContainerType = {
  type: string;
};

export type GoodsClassification = {
  type: string;
};

export type AllListings = Listing[];
export type AllPorts = Port[];
export type AllContainerTypes = ContainerType[];
export type AllGoodsClassification = GoodsClassification[];

export default async function MarketPlacePage() {
  let listingData: AllListings = [];
  let portData: AllPorts = [];
  let containerTypesData: AllContainerTypes = [];
  let goodsClassificationData: AllGoodsClassification = [];
  try {
    let res = await axios.get(
      `http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/listings`
    );
    listingData = res.data;

    res = await axios.get(
      `http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/ports`
    );
    portData = res.data;

    res = await axios.get(
      `http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/typecontainers`
    );
    containerTypesData = res.data;

    res = await axios.get(
      `http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/typeGoods`
    );
    goodsClassificationData = res.data;
  } catch (err) {
    console.error(err);
  }

  const today = new Date();
  const thresholdDate = new Date();
  thresholdDate.setDate(today.getDate() + 30);

  const listingDataLeavingSoon = listingData.filter((listing) => {
    const leaveDate = new Date(listing.leaveDate);
    return leaveDate < thresholdDate;
  });

  //   const router = useRouter();

  //   const { destPort } = router.query;

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <Image
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar
                goodsClassifications={goodsClassificationData}
                destPorts={portData}
                containerTypes={containerTypesData}
                className="hidden lg:block"
              />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="music" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="music" className="relative">
                          Explore All Listings
                        </TabsTrigger>
                        <TabsTrigger value="podcasts">My Listings</TabsTrigger>
                        <TabsTrigger value="live" disabled>
                          Future Expansions
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <Dialog>
                          <DialogTrigger>
                            <Button>
                              <PlusCircledIcon className="mr-2 h-4 w-4" />
                              Add Listing
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Listing</DialogTitle>
                              <DialogDescription>
                                Fill in the details to add.
                              </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="h-[600px]">
                              <AddListingForm
                                portData={portData}
                                containerTypes={containerTypesData}
                                goodsClassifications={goodsClassificationData}
                                className="px-4 flex-grow justify-center"
                              />
                              <ScrollBar />
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <TabsContent
                      value="music"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            All Partial Container Listings
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Buy a space in a container!
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea className="px-1 h-[600px]">
                          <div className="flex justify-between pb-4 flex-wrap mr-5">
                            {listingData.map((listing) => (
                              <ListingComponent
                                key={listing.id}
                                listing={listing}
                                className="w-[280px] pb-5"
                                aspectRatio="square"
                                width={350}
                                height={330}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="vertical" />
                        </ScrollArea>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Leaving Soon
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Containers leaving Singapore in less than 1 month.
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea className=" overflow-x-auto">
                          <div className="flex space-x-4 pb-4">
                            {listingDataLeavingSoon.map((listing) => (
                              <ListingComponent
                                key={listing.id}
                                listing={listing}
                                className="w-[220px]"
                                aspectRatio="square"
                                width={220}
                                height={220}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="podcasts"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Your Listings
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            All listings made by you.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <MyListingPage
                        portData={portData}
                        containerTypes={containerTypesData}
                        goodsClassifications={goodsClassificationData}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
