import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/new-york/ui/button";
import { Listing } from "./ListingComponent";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

interface ListingDetailsProp extends React.HTMLAttributes<HTMLDivElement> {
  listing: Listing;
}

export default function ListingDetailComponent({
  listing,
}: ListingDetailsProp) {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-[600px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-[600px] flex-col p-2 bg-muted text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative rounded-b-lg h-[50%] overflow-hidden object-center">
            <Image
              src={`/listingImages/${listing.id}.jpg`}
              alt={`${listing.account} - ${listing.destPort}`}
              width={700}
              height={300}
              className="object-bottom transition-all hover:scale-105"
            />
          </div>
          <div className="p-10">
            <div className="relative pb-2 mt-auto z-20 flex items-center text-xl font-bold">
              Listing Details
            </div>
            <div className="relative z-20 mt-auto pl-4">
              <blockquote className="space-y-2">
                <p className="text-sm">
                  <p>
                    Account :{" "}
                    <span className="font-bold">{listing.account}</span>
                  </p>
                  <p>
                    Container Type:{" "}
                    <span className="font-bold">{listing.containerType}</span>
                  </p>
                  <p>
                    Goods Classification:{" "}
                    <span className="font-bold">{listing.typeDangGoods}</span>
                  </p>
                  <p>
                    Loading Port:{" "}
                    <span className="font-bold">{listing.loadPort}</span>
                  </p>
                  <p>
                    {" "}
                    Destination Port:{" "}
                    <span className="font-bold">{listing.destPort}</span>
                  </p>
                  <p>
                    Date of Departure:{" "}
                    <span className="font-bold">
                      {listing.leaveDate.toString()}
                    </span>
                  </p>
                  <p>
                    Date of Arrival:{" "}
                    <span className="font-bold">
                      {listing.reachDate.toLocaleString()}
                    </span>
                  </p>
                </p>
                <p className=" font-bold text-lg">
                  ${listing.price} for {listing.cargoSize} TEU
                </p>
                <footer className="text-xs -ml-4">
                  <p>Listed by: {listing.leasingOwner}</p>
                  <p>Listed on: {listing.created_at.toString()}</p>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Chat Component
              </h1>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              placeholder
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
