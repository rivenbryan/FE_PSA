import * as React from "react";

type Item = {
  _id: string;
  slug: string;
  media: {
    mainMedia: {
      image: {
        url: string;
        altText: string;
      };
    };
  };
  manageVariants: boolean;
  stock: {
    inStock: boolean;
  };
  name: string;
  price: {
    formatted: {
      price: string;
    };
  };
};
type MarketPlaceProps = {
  items: Item[];
};

const containerImage = "containerImage.png";

export function Marketplace({ items }: MarketPlaceProps) {
  return (
    <div className="mx-auto">
      <div className="bg-black text-custom-1 text-center py-4 sm:py-10 sm:py-20 h-[450px] sm:h-[520px]">
        <h1 className="text-white uppercase text-3xl sm:text-6xl">
          Marketplace
        </h1>
        <p className="text-white text-sm sm:text-base mx-auto px-8 sm:max-w-[50%] my-10">
          Find your desired container sharing partners here. Filter by
          locations, category and time then chat the leasing party!
        </p>
      </div>
      {items.length ? (
        <div className="full-w overflow-hidden mx-auto text-center mt-[-200px] sm:mt-[-130px] px-10">
          <ul className="grid sm:grid-cols-3 gap-8 grid-flow-row">
            {items.map((item) => (
              <li key={item._id} className="relative">
                <a href={`/container-listing/${item.slug}`}>
                  <div className="bg-purple-300 h-auto max-w-full">
                    <img
                      className="mx-auto w-72 h-64"
                      src={containerImage}
                      alt="Placeholder Image"
                    />
                  </div>
                  {!item.manageVariants && item.stock?.inStock ? (
                    <a
                      className="btn-main absolute -mt-10 left-0 cursor-pointer"
                      href={`/api/quick-buy/${item._id}?quantity=1`}
                    >
                      Buy Now
                    </a>
                  ) : (
                    <button
                      className="btn-main absolute -mt-10 left-0 cursor-pointer"
                      disabled
                    >
                      Sold
                    </button>
                  )}
                  <div className="p-2 text-left">
                    <span>{item.name}</span>
                    <br />
                    <span className="text-xs">
                      {item.price!.formatted!.price}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-borderbox-border max-w-4xl mx-auto">
          No products found.
        </div>
      )}
    </div>
  );
}
