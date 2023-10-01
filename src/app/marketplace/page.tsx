"use client";

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
  ListingInterface,
} from "@/components/marketplace/ListingComponent";
import { MyListingPage } from "@/components/marketplace/MyListingsPage";
import { Sidebar } from "@/components/marketplace/sidebar";
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
import { supabase } from "@/lib/db";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

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

export interface PortInterface {
  UNLocode: string;
  name: string;
}
export interface ContainerTypeInterface {
  type: string;
}
export interface GoodsClassificationInterface {
  type: string;
}
export interface AllListingsInterface extends Array<ListingInterface> {}
export interface AllPortsInterface extends Array<PortInterface> {}
export interface AllContainerTypesInterface
  extends Array<ContainerTypeInterface> {}
export interface AllGoodsClassificationInterface
  extends Array<GoodsClassificationInterface> {}

export default function MarketPlacePage() {
  console.log("rendering");
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [diaOpen, setDiaOpen] = useState(false);
  const [destPortFilter, setDestPortFilter] = useState("");
  const [containerTypeFilter, setContainerTypeFilter] = useState("");
  const [goodsClassificationFilter, setGoodsClassificationFilter] = useState(
    []
  );
  const [currUser, setCurrUser] = useState([]);
  const [listingData, setListingData] = useState<AllListingsInterface>([]);
  const [portData, setPortData] = useState<AllPortsInterface>([]);
  const [containerTypesData, setContainerTypesData] =
    useState<AllContainerTypesInterface>([]);
  const [goodsClassificationData, setGoodsClassificationData] =
    useState<AllGoodsClassificationInterface>([]);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrUser(user);

      const listingRes = await axios.get(
        "http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/listings"
      );
      const tempListingdata: AllListings = listingRes.data;
      const availableListing: AllListings = tempListingdata.filter(
        (listing) => {
          return listing.sold === false;
        }
      );
      setListingData(availableListing);

      const portRes = await axios.get(
        "http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/ports"
      );
      setPortData(portRes.data);

      const containerTypesRes = await axios.get(
        "http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/typecontainers"
      );
      setContainerTypesData(containerTypesRes.data);

      const goodsClassificationRes = await axios.get(
        "http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/typeGoods"
      );
      setGoodsClassificationData(goodsClassificationRes.data);
    };
    fetchData().catch(console.error);
  }, [diaOpen, deleteFlag]);

  // let listingData: AllListings = [];
  // let portData: AllPorts = [];
  // let containerTypesData: AllContainerTypes = [];
  // let goodsClassificationData: AllGoodsClassification = [];
  // try {
  //   let res = await axios.get(
  //     `http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/listings`
  //   );
  //   listingData = res.data;

  //   res = await axios.get(
  //     `http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/ports`
  //   );
  //   portData = res.data;

  //   res = await axios.get(
  //     `http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/typecontainers`
  //   );
  //   containerTypesData = res.data;

  //   res = await axios.get(
  //     `http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/typeGoods`
  //   );
  //   goodsClassificationData = res.data;
  // } catch (err) {
  //   console.error(err);
  // }
  const updateDestPortFilter = (selectedPorts: string) => {
    setDestPortFilter(selectedPorts);
  };

  const updateContainerTypeFilter = (selectedContainerTypeFilter: string) => {
    setContainerTypeFilter(selectedContainerTypeFilter);
  };

  const listingDataDisplaying = listingData.filter((listing) => {
    if (destPortFilter !== "" && containerTypeFilter !== "") {
      return (
        listing.destPort.includes(destPortFilter) &&
        listing.containerType.includes(containerTypeFilter)
      );
    } else if (destPortFilter !== "") {
      return listing.destPort.includes(destPortFilter);
    } else if (containerTypeFilter !== "") {
      return listing.containerType.includes(containerTypeFilter);
    } else {
      return true;
    }
  });

  const today = new Date();
  const thresholdDate = new Date();
  thresholdDate.setDate(today.getDate() + 30);

  const listingDataLeavingSoon = listingData.filter((listing) => {
    const leaveDate = new Date(listing.leaveDate);
    return leaveDate < thresholdDate;
  });

  const myListingsData = listingData.filter((listing) => {
    if (currUser) {
      return listing.leasingOwner === currUser.email;
    } else {
      return null;
    }
  });

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
                destPortFilter={destPortFilter}
                setDestPortFilter={updateDestPortFilter}
                containerTypeFilter={containerTypeFilter}
                setContainerTypeFilter={updateContainerTypeFilter}
                setGoodsClassificationFilter={setGoodsClassificationFilter}
                className="hidden lg:block"
              />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="explore" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="explore" className="relative">
                          Explore All Listings
                        </TabsTrigger>
                        <TabsTrigger value="mylistings">
                          My Listings
                        </TabsTrigger>
                        <TabsTrigger value="future" disabled>
                          Future Expansions
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <Dialog open={diaOpen} onOpenChange={setDiaOpen}>
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
                                dialogState={setDiaOpen}
                                currUser={currUser}
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
                      value="explore"
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
                            {listingDataDisplaying.map((listing) => (
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
                      value="mylistings"
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
                        deleteFlag={setDeleteFlag}
                        dialogState={setDiaOpen}
                        currUser={currUser}
                        myListings={myListingsData}
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
        <ToastContainer />
      </div>
    </>
  );
}
