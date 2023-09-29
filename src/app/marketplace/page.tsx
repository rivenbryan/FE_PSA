import react, { useState } from "react";
import { tempProducts } from "~/tempData";
import { MarketPlaceProps } from "@/components/marketplace";
import { Marketplace } from "@/components/marketplace";

export default async function StoresCategoryPage() {
  let items: MarketPlaceProps[] = [];

  try {
    // pull from database
    //items = (await )
  } catch (err) {
    console.error(err);
  }
  return (
    <div className="mx-auto">
      <div className="bg-[url('../../public/psaBanner_containers.jpg')] bg-right-top text-custom-1 text-center py-4 sm:py-10 sm:py-20 h-[450px] sm:h-[520px]">
        <h1 className="text-black uppercase text-3xl sm:text-6xl">
          Marketplace
        </h1>
        <p className="text-black text-sm sm:text-base mx-auto px-8 sm:max-w-[50%] my-10">
          Find your desired container sharing partners here. Filter by
          locations, category and time then chat the leasing party!
        </p>
      </div>

      <Marketplace items={tempProducts} />
    </div>
  );
}
