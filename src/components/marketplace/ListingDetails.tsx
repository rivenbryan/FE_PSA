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
        <div className="relative hidden h-full flex-col p-2 bg-muted text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative  rounded-b-lg h-1/2 overflow-hidden">
            <Image
              src={`/listingImages/${listing.id}.jpg`}
              alt={`${listing.account} - ${listing.destPort}`}
              width={600}
              height={300}
              className="object-center transition-all hover:scale-105 aspect-auto"
            />
          </div>
          <div className="p-10">
            <div className="relative mt-auto z-20 flex items-center text-lg font-medium">
              Listing Details
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;This library has saved me countless hours of work and
                  helped me deliver stunning designs to my clients faster than
                  ever before.&rdquo;
                </p>
                <footer className="text-sm">Sofia Davis</footer>
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
